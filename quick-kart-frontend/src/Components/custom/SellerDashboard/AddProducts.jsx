import React, { useEffect, useState } from "react";
import { Upload } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addProductSchema } from "./validation/addProduct.schema";
import { productService } from "../../services/product.service";
import { toast, Toaster } from "sonner";

const AddProducts = () => {
  const [preview, setPreview] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      image: null,
      brandName: "",
      productName: "",
      category: "",
      returnPolicy: "no return",
      replacementPolicy: "no replacement",
      warranty: "no warranty",
      status: "available",
      price: 0,
      offerPrice: 0,
      quantity: 0,
      description: "",
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setValue("image", file, { shouldValidate: true }); // triggers validation
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const onSubmit = async (data) => {
    try {
      const res = await productService.addProduct(data);

      if (res.status === "success") {
        toast.success(res.message); // "Product added successfully"
        reset(); // react-hook-form reset
        setPreview(null);
      } else {
        toast.error(res.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      console.log("Form Errors:", errors);
    }
  }, [errors]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="min-h-screen rounded-md bg-gray-100"
    >
      <Toaster />
      <div className="px-6 py-8 max-w-4xl mx-auto flex flex-col gap-6">
        {/* Image Upload */}
        {/* Image Upload */}
        <div className="flex flex-col gap-2 w-full">
          <label className="font-semibold text-gray-800 text-lg">
            Product Image
          </label>

          <label className="relative cursor-pointer border-2 border-dashed border-gray-300 rounded-lg w-full h-34 flex flex-col items-center justify-center bg-white hover:border-orange-400 transition-colors">
            {preview ? (
              <img
                src={preview}
                alt="preview"
                className="absolute inset-0 w-full h-full object-cover rounded-lg"
              />
            ) : (
              <div className="flex flex-col items-center justify-center gap-2">
                <Upload className="text-orange-500 w-8 h-8" />
                <p className="text-gray-500 font-medium text-base">
                  Click to Upload Image
                </p>
                <p className="text-gray-400 text-sm">PNG, JPG, GIF up to 5MB</p>
              </div>
            )}

            <input
              type="file"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>

          {errors.image && (
            <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
          )}
        </div>

        {/* Brand + Product */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Brand Name</label>
            <input
              {...register("brandName")}
              placeholder="Enter brand name"
              className="border border-gray-300 bg-white rounded-lg px-4 py-2"
            />
            {errors.brandName && (
              <p className="text-red-500 text-sm">{errors.brandName.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Product Name</label>
            <input
              {...register("productName")}
              placeholder="Enter product name"
              className="border border-gray-300 bg-white rounded-lg px-4 py-2"
            />
            {errors.productName && (
              <p className="text-red-500 text-sm">
                {errors.productName.message}
              </p>
            )}
          </div>
        </div>

        {/* Category */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Category</label>
          <input
            {...register("category")}
            placeholder="Enter category"
            className="border border-gray-300 bg-white rounded-lg px-4 py-2"
          />
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category.message}</p>
          )}
        </div>

        {/* Price Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Product Price</label>
            <input
              {...register("price", { valueAsNumber: true })}
              type="number"
              placeholder="Product Price"
              className="border border-gray-300 bg-white rounded-lg px-4 py-2"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Offer Price</label>
            <input
              {...register("offerPrice", { valueAsNumber: true })}
              type="number"
              placeholder="Offer Price"
              className="border border-gray-300 bg-white rounded-lg px-4 py-2"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Quantity</label>
            <input
              {...register("quantity", { valueAsNumber: true })}
              type="number"
              placeholder="Quantity"
              className="border border-gray-300 bg-white rounded-lg px-4 py-2"
            />
          </div>
        </div>

        {/* Policy + Status + Warranty */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Status</label>
            <select
              {...register("status")}
              className="border border-gray-300 bg-white rounded-lg px-4 py-2"
            >
              <option value="available">Available</option>
              <option value="available soon">Available Soon</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Warranty</label>
            {/* "1 month", "3 months", "6 months", "1 year", "no warranty" */}
            <select
              {...register("warranty")}
              className="border border-gray-300 bg-white rounded-lg px-4 py-2"
            >
              <option value="no warranty">no warranty</option>
              <option value="1 month">1 Month</option>
              <option value="3 months">3 Months</option>
              <option value="6 months">6 Months</option>
              <option value="1 year">1 Year</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Return Policy</label>
            <select
              {...register("returnPolicy")}
              className="border border-gray-300 bg-white rounded-lg px-4 py-2"
            >
              <option value="no return">no replacement</option>
              <option value="3 days">3 Days</option>
              <option value="7 days">7 Days</option>
              <option value="15 days">15 Days</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Replacement Policy</label>
            <select
              {...register("replacementPolicy")}
              className="border border-gray-300 bg-white rounded-lg px-4 py-2"
            >
              <option value="no replacement">No Replacement</option>
              <option value="3 days">3 Days</option>
              <option value="7 days">7 Days</option>
              <option value="15 days">15 Days</option>
            </select>
          </div>
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Description</label>
          <textarea
            {...register("description")}
            rows={4}
            placeholder="Enter description"
            className="border border-gray-300 bg-white rounded-lg px-4 py-2"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg px-8 py-3"
        >
          ADD PRODUCT
        </button>
      </div>
    </form>
  );
};

export default AddProducts;
