import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editProductSchema } from "./addProduct.schema";
import { productService } from "../../../services/product.service";
import { toast } from "sonner";

const EditProductDetailsForm = ({ productId, onSuccess }) => {
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(editProductSchema),
  });

  // 🔥 Fetch product by ID & prefill form
  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        const product = await productService.getProductById(productId);

        reset({
          image: undefined,
          brandName: product.brandName,
          productName: product.productName,
          category: product.category,
          price: product.price,
          offerPrice: product.offerPrice,
          quantity: product.quantity,
          description: product.description,
          status: product.status,
          warranty: product.warranty,
          returnPolicy: product.returnPolicy,
          replacementPolicy: product.replacementPolicy,
        });

        setPreview(product.image);
      } catch (error) {
        toast.error("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId, reset]);

  // 🖼 Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setValue("image", file, { shouldValidate: true });

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  // ✅ Submit update
  const onSubmit = async (data) => {
    try {
       const res=await productService.updateProduct(productId, data);
       console.log("check for the edit data at here ",res)
      toast.success("Product updated successfully");
      onSuccess?.(); // refresh list
    } catch (error) {
      toast.error("Failed to update product");
    }
  };


    useEffect(() => {
      if (Object.keys(errors).length > 0) {
        console.log("Form Errors:", errors);
      }
    }, [errors]);

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-gray-100 p-6 rounded-md space-y-6 "
    >
      {/* IMAGE */}
      <div>
        <label className="font-semibold text-gray-800">
          Product Image (Optional)
        </label>

        <div className="relative border-2 border-dashed border-gray-300 rounded-lg h-40  bg-white flex items-center justify-center mt-2">
          {preview ? (
            <img
              src={preview}
              alt="preview"
              className="absolute inset-0 w-full h-full object-cover rounded-lg"
            />
          ) : (
            <p className="text-gray-400">Click to upload image</p>
          )}

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>
      </div>

      {/* BRAND + PRODUCT */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <input
            {...register("brandName")}
            placeholder="Brand Name"
            className="w-full border rounded-lg px-4 py-2"
          />
          <p className="text-red-500 text-sm">
            {errors.brandName?.message}
          </p>
        </div>

        <div>
          <input
            {...register("productName")}
            placeholder="Product Name"
            className="w-full border rounded-lg px-4 py-2"
          />
          <p className="text-red-500 text-sm">
            {errors.productName?.message}
          </p>
        </div>
      </div>

      {/* CATEGORY */}
      <div>
        <input
          {...register("category")}
          placeholder="Category"
          className="w-full border rounded-lg px-4 py-2"
        />
        <p className="text-red-500 text-sm">
          {errors.category?.message}
        </p>
      </div>

      {/* PRICE */}
      <div className="grid md:grid-cols-3 gap-4">
        <input
          type="number"
          {...register("price", { valueAsNumber: true })}
          placeholder="Price"
          className="border rounded-lg px-4 py-2"
        />

        <input
          type="number"
          {...register("offerPrice", { valueAsNumber: true })}
          placeholder="Offer Price"
          className="border rounded-lg px-4 py-2"
        />

        <input
          type="number"
          {...register("quantity", { valueAsNumber: true })}
          placeholder="Quantity"
          className="border rounded-lg px-4 py-2"
        />
      </div>

      {/* SELECT OPTIONS */}
      <div className="grid md:grid-cols-2 gap-4">
        <select {...register("status")} className="border rounded-lg px-4 py-2">
          <option value="available">Available</option>
          <option value="available soon">Available Soon</option>
        </select>

        <select {...register("warranty")} className="border rounded-lg px-4 py-2">
          <option value="no warranty">No Warranty</option>
          <option value="1 month">1 Month</option>
          <option value="3 months">3 Months</option>
          <option value="6 months">6 Months</option>
          <option value="1 year">1 Year</option>
        </select>

        <select
          {...register("returnPolicy")}
          className="border rounded-lg px-4 py-2"
        >
          <option value="no return">No Return</option>
          <option value="7 days">7 Days</option>
          <option value="15 days">15 Days</option>
        </select>

        <select
          {...register("replacementPolicy")}
          className="border rounded-lg px-4 py-2"
        >
          <option value="no replacement">No Replacement</option>
          <option value="3 days">3 Days</option>
          <option value="7 days">7 Days</option>
          <option value="15 days">15 Days</option>
        </select>
      </div>

      {/* DESCRIPTION */}
      <div>
        <textarea
          {...register("description")}
          rows={4}
          placeholder="Description"
          className="w-full border rounded-lg px-4 py-2"
        />
        <p className="text-red-500 text-sm">
          {errors.description?.message}
        </p>
      </div>

      {/* BUTTON */}
      <button
        type="submit"
        className="bg-orange-500 cursor-pointer hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold w-full"
      >
        UPDATE PRODUCT
      </button>
    </form>
  );
};

export default EditProductDetailsForm;