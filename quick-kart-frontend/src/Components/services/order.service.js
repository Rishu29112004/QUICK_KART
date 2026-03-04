import axiosInstance from "./url.service";

export const orderService = {

  // 🔹 Place Order
  placeOrder: async () => {
    try {
      const response = await axiosInstance.post("/api/order/place");
      return response.data;
    } catch (error) {
      console.error(
        "Place order error:",
        error.response?.data || error.message
      );
      throw error;
    }
  },

  // 🔹 Get My Orders
  getMyOrders: async () => {
    try {
      const response = await axiosInstance.get("/api/order/my-orders");
      return response.data;
    } catch (error) {
      console.error("Get orders error:", error);
      throw error;
    }
  },
};