import { string } from "zod";
import axiosInstance from "./url.service";

export const productService = {
  addProduct: async (data) => {
    try {
      //   const validatedData = addProductSchema.parse(data);
    

      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (value === undefined || value === null) return;

        if (value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, String(value));
        }
      });

      const response = await axiosInstance.post(
        "/api/product/add-product",
        formData,
      );

      return response.data;
    } catch (error) {
      console.error(
        "Add product service error:",
        error.response?.data || error.message,
      );
      throw error;
    }
  },

  //getAllProduct
  getAllProducts: async () => {
    try {
      const response = await axiosInstance.get(`/api/product/getAllProducts`);
      return response.data;
    } catch (error) {
      console.error("Get my cars error:", error);
      throw error;
    }
  },

  //getProductById
  getProductById: async (id) => {
    try {
      const response = await axiosInstance.get(
        `/api/product/getProductById/${id}`,
      );
      return response.data.data;
    } catch (error) {
      console.error("Get product error:", error);
      throw error;
    }
  },

  //updateProduct
  // updateProduct
  updateProduct: async (id, data) => {
    try {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (value === undefined || value === null) return;

        if (value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, String(value));
        }
      });

      const response = await axiosInstance.patch(
        `/api/product/updateProduct/${id}`,
        formData,
      );

      return response.data;
    } catch (error) {
      console.error(
        "Update product service error:",
        error.response?.data || error.message,
      );
      throw error;
    }
  },
};
