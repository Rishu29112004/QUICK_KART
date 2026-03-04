import { createContext, useEffect, useState } from "react";
import { cartService } from "../services/cart.service";
import { useAuth } from "./authContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const [cartItem, setCartItem] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);

  // ============================
  // FETCH CART
  // ============================
  const fetchCart = async () => {
    try {
      setLoading(true);

      const response = await cartService.getCart();

      setCartItem(response?.cart?.products || []);

    } catch (error) {
      console.log("Cart fetch error", error);
    } finally {
      setLoading(false);
    }
  };

  const { isAuthenticated, isLoading } = useAuth();

  // Fetch cart only when authentication state is known and user is authenticated
  useEffect(() => {
    if (isLoading) return; // wait until auth check finishes
    if (!isAuthenticated) return; // don't fetch for anonymous users

    fetchCart();
  }, [isAuthenticated, isLoading]);

  // ============================
  // ADD TO CART (SMART VERSION 🔥)
  // ============================
  const addToCart = async (productId) => {
    try {
      if (updating) return;

      setUpdating(true);

      const existingProduct = cartItem.find(
        item => item.product._id === productId
      );

      if (existingProduct) {
        // If product already exists → increase quantity
        await cartService.updateQuantity(
          productId,
          existingProduct.quantity + 1
        );
      } else {
        // New product → add to cart
        await cartService.addToCart(productId, 1);
      }

      await fetchCart();

    } catch (error) {
      console.log("Add to cart error", error);
    } finally {
      setUpdating(false);
    }
  };

  // ============================
  // REMOVE FROM CART
  // ============================
  const removeFromCart = async (productId) => {
    try {
      if (updating) return;

      setUpdating(true);

      await cartService.removeFromCart(productId);

      await fetchCart();

    } catch (error) {
      console.log("Remove cart error", error);
    } finally {
      setUpdating(false);
    }
  };

  // ============================
  // INCREMENT
  // ============================
  const increment = async (productId, quantity) => {
    try {
      if (updating) return;

      setUpdating(true);

      await cartService.updateQuantity(
        productId,
        quantity + 1
      );

      await fetchCart();

    } catch (error) {
      console.log(error);
    } finally {
      setUpdating(false);
    }
  };

  // ============================
  // DECREMENT
  // ============================
  const decrement = async (productId, quantity) => {
    try {
      if (updating) return;
      if (quantity <= 1) return;

      setUpdating(true);

      await cartService.updateQuantity(
        productId,
        quantity - 1
      );

      await fetchCart();

    } catch (error) {
      console.log(error);
    } finally {
      setUpdating(false);
    }
  };

  // ============================
  // TOTAL PRICE
  // ============================
  const total = cartItem.reduce((sum, item) => {
    return sum +
      (item.product?.offerPrice || 0) * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cartItem,
        loading,
        updating,
        addToCart,
        removeFromCart,
        increment,
        decrement,
        total,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};