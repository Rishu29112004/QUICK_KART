import Cart from "../models/cartModal.js";
import Product from "../models/productModal.js";

// ============================
// ADD TO CART
// ============================
export const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const quantity = Number(req.body.quantity) || 1;
    const userId = req.id;

    if (!productId || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Valid productId and quantity required",
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (product.quantity < quantity) {
      return res.status(400).json({
        success: false,
        message: "Insufficient stock",
      });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = await Cart.create({
        user: userId,
        products: [],
      });
    }

    const existingProduct = cart.products.find(
      (item) => item.product.toString() === productId
    );

    // ✅ SAFE QUANTITY MERGE LOGIC
    if (existingProduct) {
      existingProduct.quantity =
        existingProduct.quantity + quantity;
    } else {
      cart.products.push({
        product: productId,
        quantity,
      });
    }

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Product added to cart",
      cart,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ============================
// GET MY CART
// ============================
export const getMyCart = async (req, res) => {
  try {
    const userId = req.id;

    const cart = await Cart.findOne({ user: userId }).populate(
      "products.product"
    );

    if (!cart) {
      return res.status(200).json({
        success: true,
        cart: { products: [] },
      });
    }

    res.status(200).json({
      success: true,
      cart,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ============================
// REMOVE FROM CART
// ============================
export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.id;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    cart.products = cart.products.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Product removed from cart",
      cart,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ============================
// UPDATE QUANTITY
// ============================
export const updateCartQuantity = async (req, res) => {
  try {
    const { productId } = req.params;
    const quantity = Number(req.body.quantity) || 1;
    const userId = req.id;

    if (quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity cannot be less than 1",
      });
    }

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const product = await Product.findById(productId);

    if (!product || product.quantity < quantity) {
      return res.status(400).json({
        success: false,
        message: "Insufficient stock",
      });
    }

    const productItem = cart.products.find(
      (item) => item.product.toString() === productId
    );

    if (!productItem) {
      return res.status(404).json({
        success: false,
        message: "Product not in cart",
      });
    }

    productItem.quantity = quantity;

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Cart updated",
      cart,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};