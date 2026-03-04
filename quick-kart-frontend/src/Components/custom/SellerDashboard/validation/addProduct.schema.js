import { z } from "zod";

const statusEnum = z.enum(["available", "available soon"]);

const returnEnum = z.enum(["7 days", "15 days", "no return"]);

const replacementEnum = z.enum([
  "3 days",
  "7 days",
  "15 days",
  "no replacement",
]);

const warrantyEnum = z.enum([
  "1 month",
  "3 months",
  "6 months",
  "1 year",
  "no warranty",
]);

const baseProductSchema = {
  brandName: z.string().min(2, "Brand name is required"),

  productName: z.string().min(2, "Product name is required"),

  category: z.string().min(2, "Category is required"),

  price: z.number().min(0, "Price must be >= 0"),

  offerPrice: z.number().min(0, "Offer price must be >= 0"),

  quantity: z.number().min(0, "Quantity cannot be negative"),

  description: z.string().min(10, "Description must be at least 10 characters"),

  status: statusEnum,

  warranty: warrantyEnum,

  returnPolicy: returnEnum,

  replacementPolicy: replacementEnum,
};


export const addProductSchema = z
  .object({
    image: z
      .any()
      .refine((file) => file instanceof File, "Product image is required"),

    ...baseProductSchema,
  })
  .refine((data) => data.offerPrice <= data.price, {
    message: "Offer price must be less than or equal to price",
    path: ["offerPrice"],
  });


export const editProductSchema = z
  .object({
    image: z.any().optional(),
    ...baseProductSchema,
  })
  .refine((data) => data.offerPrice <= data.price, {
    message: "Offer price must be less than or equal to price",
    path: ["offerPrice"],
  });
