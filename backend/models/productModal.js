import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
      trim: true,
    },

    brandName: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    productName: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    returnPolicy: {
      type: String,
      lowercase: true,
      enum: ["3 days", "7 days", "15 days", "no replacement"],
      default: "no return",
    },

    replacementPolicy: {
      type: String,
      lowercase: true,
      enum: ["3 days", "7 days", "15 days", "no replacement"],
      default: "no replacement",
    },

    warranty: {
      type: String,
      lowercase: true,
      enum: ["1 month", "3 months", "6 months", "1 year", "no warranty"],
      default: "no warranty",
    },

    status: {
      type: String,
      lowercase: true,
      enum: ["available", "available soon"],
      default: "available",
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    offerPrice: {
      type: Number,
      required: true,
      validate: {
        validator: function (value) {
          if (this.price != null) {
            return value <= this.price;
          }
          return true;
        },
        message: "Offer price must be less than or equal to price",
      },
    },

    quantity: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Product", productSchema);
