import User from "../models/userModal.js";
import response from "../utils/responseHandler.js";
import { uploadFileToCloudinary } from "../config/cloudinary.js";

// UPDATE MY PROFILE
export const updateProfile = async (req, res) => {
  try {
    const userId = req.id;
    const { name, phone, bio } = req.body;
    const file = req.file;

    const updateData = {};

    if (name !== undefined) updateData.name = name;
    if (phone !== undefined) updateData.phone = phone;
    if (bio !== undefined) updateData.bio = bio;

    // Image Upload
    if (file) {
      try {
        const uploadedImage = await uploadFileToCloudinary(file);
        updateData.imageUrl = uploadedImage.secure_url;
      } catch (uploadError) {
        return response(res, 500, "Failed to upload image", {
          error: uploadError.message,
        });
      }
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    }).select("name email phone role bio imageUrl");

    if (!updatedUser) {
      return response(res, 404, "User not found");
    }

    return response(res, 200, "Profile updated successfully", updatedUser);
  } catch (error) {
    return response(res, 500, "Internal server error", {
      error: error.message,
    });
  }
};

// GET MY PROFILE
export const getMyProfile = async (req, res) => {
  try {
    const userId = req.id;

    const user = await User.findById(userId).select(
      "name email phone bio imageUrl role",
    );

    if (!user) {
      return response(res, 404, "User not found");
    }

    return response(res, 200, "Profile fetched successfully", user);
  } catch (error) {
    return response(res, 500, "Internal server error", {
      error: error.message,
    });
  }
};
