import { uploadFileToCloudinary } from "../config/cloudinary.js";
import productModal from "../models/productModal.js";
import response from "../utils/responseHandler.js";

//Add Product

export const addProduct = async (req, res) => {
  try {
    const file = req.file;

    const productData = req.body;
    const userId = req.id;
    const userRole = req.role;

    if (userRole !== "ADMIN") {
      return response(res, 403, "Only admin can add products");
    }

    if (!file) {
      return response(res, 400, "Product image is required");
    }

    const uploadedImage = await uploadFileToCloudinary(file);

    const imageUrl = uploadedImage.secure_url;

    const newProduct = await productModal.create({
      ...productData,
      image: imageUrl,
      userId,
    });

    return response(res, 201, "Product added successfully", newProduct);
  } catch (error) {
    return response(res, 500, "Failed to add product", {
      error: error.message,
    });
  }
};

//get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await productModal.find().sort({ createdAt: -1 });

    return response(res, 200, "Products fetched successfully", products);
  } catch (error) {
    return response(res, 500, "Failed to fetch you products", {
      error: error.message,
    });
  }
};

// get single product by id

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await productModal.findById(id);

    if (!product) {
      return response(res, 404, "Product not found");
    }
    return response(res, 200, "Product fetched successfully", product);
  } catch (error) {
    return response(res, 500, "Failed to fetch product", {
      error: error.message,
    });
  }
};

// update product

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const file = req.file;

    const allowedUpdates = [
      "brandName",
      "productName",
      "category",
      "returnPolicy",
      "replacementPolicy",
      "warranty",
      "status",
      "price",
      "offerPrice",
      "quantity",
      "description",
    ];

    const updateData = {};

    Object.keys(updates).forEach((key) => {
      if (allowedUpdates.includes(key)) {
        updateData[key] = updates[key];
      }
    });

    // Image Upload
    if (file) {
      try {
        const uploadedImage = await uploadFileToCloudinary(file);
        updateData.image = uploadedImage.secure_url;
      } catch (uploadError) {
        return response(res, 500, "Failed to upload image", {
          error: uploadError.message,
        });
      }
    }

    // Update DB
    const updatedProduct = await productModal.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true,context: "query" },
    );

    if (!updatedProduct) {
      return response(res, 404, "Product not found");
    }

    return response(res, 200, "Product updated successfully", updatedProduct);
  } catch (error) {
    return response(res, 500, "Failed to update product", {
      error: error.message,
    });
  }
};

// delete product

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteProduct = await productModal.findOneAndDelete(id);

    if (!deleteProduct) {
      return response(res, 404, "Product not found");
    }

    return response(res, 200, "Product delete successfully");
  } catch (error) {
    return response(res, 500, "Failed to delete car", {
      error: error.message,
    });
  }
};
