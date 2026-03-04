import axiosInstance from "./url.service";

export const cartService = {

  // 🔹 Add To Cart
  addToCart: async (productId, quantity = 1) => {
    try {
      const response = await axiosInstance.post("/api/cart/add", {
        productId,
        quantity,
      });

      return response.data;
    } catch (error) {
      console.error(
        "Add to cart error:",
        error.response?.data || error.message
      );
      throw error;
    }
  },

  // 🔹 Get User Cart
  getCart: async () => {
    try {
      const response = await axiosInstance.get("/api/cart/my-cart")
      return response.data;
    } catch (error) {
      console.error("Get cart error:", error);
      throw error;
    }
  },

  // 🔹 Remove From Cart
  removeFromCart: async (productId) => {
    try {
      const response = await axiosInstance.delete(
        `/api/cart/remove/${productId}`
      );
      return response.data;
    } catch (error) {
      console.error("Remove cart error:", error);
      throw error;
    }
  },

  // 🔹 Update Quantity
updateQuantity: async (productId, quantity) => {
  try {
    const response = await axiosInstance.put(
      `/api/cart/update/${productId}`,
      { quantity }
    );

    return response.data;
  } catch (error) {
    console.error("Update quantity error:", error);
    throw error;
  }
},
};