import React, { useContext, useState } from "react";
import { CartContext } from "../../../context/CartContext";
import { orderService } from "../../../services/order.service";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import { ShoppingCart, CheckCircle, AlertCircle } from "lucide-react";

const CartPriceDetails = () => {
  const { total, cartItem } = useContext(CartContext);
  const { fetchCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handlePlaceOrder = async () => {
    if (cartItem.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    try {
      setIsLoading(true);
      const res = await orderService.placeOrder();

      if (res.success || res.status === "success") {
        toast.success("Order placed successfully! 🎉");
        await fetchCart();
        setTimeout(() => navigate("/orders"), 1000);
      } else {
        toast.error(res.message || "Failed to place order");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to place order");
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate values
  let discount = 0;
  let platformFee = 0;
  let finalAmount = 0;

  if (total > 0) {
    discount = total > 1000 ? Math.floor(total * 0.1) : 100;
    platformFee = Math.floor(total * 0.001);
    finalAmount = total - discount + platformFee;
  }

  return (
    <>
      <Toaster position="top-right" />
      <div className="sticky top-24 p-6 bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center gap-2 pb-4 border-b border-gray-200">
            <ShoppingCart className="text-orange-500" size={24} />
            <h2 className="text-xl font-bold text-gray-900">Price Details</h2>
          </div>

          {/* Price Breakdown */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold text-gray-900">₹{Math.floor(total)}</span>
            </div>

            {discount > 0 && (
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Discount</span>
                <span className="font-semibold text-green-600">-₹{discount}</span>
              </div>
            )}

            <div className="flex items-center justify-between">
              <span className="text-gray-600 text-sm">Platform Fee</span>
              <span className="font-semibold text-gray-900">₹{platformFee}</span>
            </div>

            {discount > 0 && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-2">
                <p className="text-green-700 text-sm font-medium flex items-center gap-2">
                  <CheckCircle size={16} />
                  You save ₹{discount} on this order
                </p>
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 my-3"></div>

          {/* Total */}
          <div className="bg-gradient-to-r from-orange-50 to-orange-25 rounded-xl p-4 border border-orange-200">
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-gray-900">Total Amount</span>
              <span className="text-2xl font-bold text-orange-600">₹{Math.floor(finalAmount)}</span>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={handlePlaceOrder}
            disabled={isLoading || cartItem.length === 0}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3 rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                Processing...
              </>
            ) : cartItem.length === 0 ? (
              <>
                <AlertCircle size={20} />
                Empty Cart
              </>
            ) : (
              <>
                <CheckCircle size={20} />
                Place Order Now
              </>
            )}
          </button>

          {/* Info Footer */}
          {cartItem.length > 0 && (
            <p className="text-xs text-gray-500 text-center pt-2">
              Free shipping on orders above ₹500
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default CartPriceDetails;
