import React, { useEffect, useState } from "react";
import { productService } from "../../services/product.service";
import { toast } from "sonner";
import { PageLoader } from "../loader/loader/PageLoader";
import EditProductDetailsForm from "./validation/EditProductDetailsForm";

const ProductList = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [openEditSheet, setOpenEditSheet] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchMyAllProducts();
  }, []);

  const fetchMyAllProducts = async () => {
    try {
      setLoading(true);
      const response = await productService.getAllProducts();

      const products = response?.data || [];

      setAllProducts(Array.isArray(products) ? products : []);
    } catch (error) {
      toast.error("Failed to fetch products");
      setAllProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEditButton = (t) => {
    setSelectedProduct(t);
    setOpenEditSheet(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 p-5 rounded-md">
        <PageLoader
          loading={true}
          error={null}
          loadingText="Loading your cars..."
        >
          <div />
        </PageLoader>
      </div>
    );
  }

  return (
    <div className="min-h-screen rounded-md bg-gray-100 p-6">
      <div className="bg-white border border-gray-300 rounded-md overflow-hidden">
        {/* Title */}
        <div className="px-4 py-4 border-b border-gray-300 bg-gray-100">
          <p className="text-2xl font-semibold text-gray-800">All Product</p>
        </div>

        {/* Header */}
        <div className="flex items-center px-4 py-3 font-semibold text-gray-700 bg-gray-50 border-b border-gray-300">
          <p className="flex-1">Product</p>
          <p className="flex-1">Brand Name</p>
          <p className="flex-1">Product Name</p>
          <p className="flex-1">Category</p>
          <p className="flex-1">Quantity</p>
          <p className="flex-1">Price</p>
          <p className="flex-1">Status</p>
          <p className="flex-1">Edit</p>
        </div>

        {/* Rows */}
        {allProducts.length > 0 ? (
          allProducts.map((t) => (
            <div
              key={t._id}
              className="flex items-center px-4 py-3 border-b border-gray-200 hover:bg-gray-50"
            >
              {/* Image */}
              <div className="flex items-center gap-3 flex-1">
                <img
                  src={t.image}
                  className="h-12 w-12 rounded-md bg-gray-200 object-cover"
                  alt={t.productName}
                />
              </div>

              {/* Data */}
              <p className="flex-1 text-gray-600">{t.brandName}</p>
              <p className="flex-1 text-gray-600">{t.productName}</p>
              <p className="flex-1 text-gray-600">{t.category}</p>
              <p className="flex-1 text-gray-600">{t.quantity}</p>
              <p className="flex-1 font-medium text-gray-800">₹{t.price}</p>
              <p className="flex-1 text-gray-600">{t.status}</p>

              {/* Edit */}
              <div className="flex-1">
                <button
                  onClick={() => handleEditButton(t)}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium transition"
                >
                  Edit
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center py-6 text-gray-500">No Products Found</p>
        )}
      </div>

      {openEditSheet && (
        <div
          className={`fixed top-0 right-0 h-screen w-96 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out
  ${openEditSheet ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="flex gap-10 items-center px-6 bg-slate-100">
            <p
              onClick={() => setOpenEditSheet(false)}
              className="text-red-500 cursor-pointer text-2xl font-bold"
            >
              ✕
            </p>
            <p>Edit your product</p>
          </div>

          <EditProductDetailsForm
            productId={selectedProduct?._id}
            onSuccess={() => {
              setOpenEditSheet(false);
              fetchMyAllProducts();
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ProductList;
