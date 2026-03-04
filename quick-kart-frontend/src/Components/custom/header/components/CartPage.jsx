import React, { useContext } from "react";
import { Minus, Plus } from "lucide-react";
import { CartContext } from "../../../context/CartContext";
import CartPriceDetails from "./CartPriceDetails";
import { useAuth } from "../../../context/authContext";

const CartPage = () => {
  // Context se sab values lo
  const { cartItem, removeFromCart, increment, decrement } =
    useContext(CartContext);

  const { user } = useAuth();
  console.log(cartItem);
  console.log(user);
  return (
    <div className="min-h-screen py-8 px-4 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

      <div className="flex justify-between gap-4">
        <div className="grid border w-full gap-3 border-gray-300 bg-gray-100 p-3 rounded-md">
          {cartItem?.length === 0 && (
            <p className="text-center w-full text-gray-500">
              Your cart is empty
            </p>
          )}

          {cartItem?.map((item) => {
            const product = item.product;

            return (
              <div
                key={item._id}
                className="w-full bg-white rounded-xl shadow-sm hover:shadow-md transition p-6 border border-gray-200"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {/* 🔹 Image Section */}
                  <div className="w-full md:w-36 h-36 flex items-center justify-center bg-gray-100 rounded-lg flex-shrink-0">
                    <img
                      src={
                        Array.isArray(product?.image)
                          ? product.image[0]
                          : product?.image
                      }
                      alt={product?.productName}
                      className="max-h-full object-contain"
                    />
                  </div>

                  {/* 🔹 Product Info Section */}
                  <div className="flex-1 flex flex-col justify-between">
                    {/* Top Content */}
                    <div className="space-y-2">
                      <p className="text-lg text-gray-700 font-semibold">
                        Brand:{" "}
                        <span className="font-semibold text-gray-900">
                          {product?.brandName}
                        </span>
                      </p>

                      <h3 className="text-base text-gray-700">
                        Product:
                        <span className="font-medium text-gray-900">
                          {" "}
                          {product?.productName}
                        </span>
                      </h3>

                      <p className="text-sm text-gray-500">
                        Category: {product?.category}
                      </p>

                      <p className="text-sm text-gray-600 line-clamp-2">
                        {product?.description}
                      </p>

                      {/* Price + Subtotal Row */}
                      <div className="flex items-center justify-between pt-3 border-t">
                        {/* Price Section */}
                        <div className="flex items-center gap-4">
                          <span className="text-xl font-bold text-orange-500">
                            ${product?.offerPrice}
                          </span>

                          <span className="text-gray-400 line-through text-sm">
                            ${product?.price}
                          </span>

                          <span className="text-green-600 text-sm font-medium">
                            {product?.price && product?.offerPrice
                              ? Math.round(
                                  ((product.price - product.offerPrice) /
                                    product.price) *
                                    100,
                                )
                              : 0}
                            % OFF
                          </span>
                        </div>

                        {/* Subtotal */}
                        <div className="text-right">
                          <p className="text-xs text-gray-500">Subtotal</p>
                          <p className="text-lg font-semibold text-gray-800">
                            ${product?.offerPrice * item.quantity}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* 🔹 Bottom Controls */}
                    <div className="flex items-center justify-between mt-6">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() =>
                            decrement(item.product._id, item.quantity)
                          }
                          className="border rounded-md px-3 py-1 hover:bg-gray-100"
                        >
                          <Minus size={14} />
                        </button>

                        <span className="font-semibold text-lg text-orange-600">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            increment(item.product._id, item.quantity)
                          }
                          className="border rounded-md px-3 py-1 hover:bg-gray-100"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.product._id)}
                        className="text-sm bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                      >
                        Remove Item
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="pl-2 w-[45%]">
          <CartPriceDetails />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
