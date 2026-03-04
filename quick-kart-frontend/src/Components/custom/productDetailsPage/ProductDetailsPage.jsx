import React, { useEffect, useState ,useContext} from "react";
import { productService } from "../../services/product.service";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, CircleCheck } from "lucide-react";
import { toast, Toaster } from "sonner";
import { PageLoader } from "../loader/loader/PageLoader";
import { CartContext } from "../../context/CartContext";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  const { addToCart, cartitem, removeFromCart } = useContext(CartContext);

  const fetchProduct = async () => {
    try {
      setLoading(true);

      const response = await productService.getProductById(id);

      // agar tumhari API response.data me product deta hai to:
      const data = response?.data || response;

      setProduct(data);
    } catch (error) {
      console.error("Failed to fetch product:", error);
      toast.error("Failed to fetch product");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 p-5 rounded-md">
        <PageLoader
          loading={true}
          error={null}
          loadingText="Loading product details..."
        >
          <div />
        </PageLoader>
      </div>
    );
  }

  const handleAddToCard = () => {
    toast.success("Product added to cart");
  };

  if (!product) {
    return <p className="text-center mt-20">Loading...</p>;
  }

  return (
    <>
      <Toaster
        position="bottom-right"
        richColors
        duration={2000}
        reverseOrder={false}
      />
      <div className="min-h-screen mt-[85px] max-w-7xl mx-auto mb-10 p-6">
        {/* 🔹 Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-orange-500 font-medium mb-8"
        >
          <ArrowLeft size={20} />
          Back to all products
        </button>

        {/* 🔹 Main Section */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left - Image */}
          <div className="bg-gray-100 rounded-2xl p-8 flex justify-center items-center">
            <img
              src={product.image}
              alt={product.productName}
              className="max-h-[450px] object-contain"
            />
          </div>

          {/* Right - Info Card */}
          <div className="flex flex-col gap-5 bg-gray-100 rounded-2xl p-5">
            {/* 🔹 Title + Category + Status */}
            <div className="space-y-3">
              <h1 className="text-3xl font-bold capitalize leading-snug">
                {product.brandName}{" "}
                <span className="text-gray-800">{product.productName}</span>
              </h1>

              <div className="flex items-center justify-between">
                <span className="text-gray-500 capitalize text-sm">
                  Category:{" "}
                  <span className="font-medium text-gray-700">
                    {product.category}
                  </span>
                </span>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${
                    product.status === "available"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {product.status}
                </span>
              </div>
            </div>

            {/* 🔹 Price Section */}
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <div className="flex items-center gap-4">
                <p className="text-3xl font-bold text-orange-500">
                  ₹{product.offerPrice}
                </p>

                <p className="line-through text-gray-400 text-lg">
                  ₹{product.price}
                </p>

                {product.price > product.offerPrice && (
                  <span className="bg-green-100 text-green-600 text-xs font-semibold px-2 py-1 rounded-md">
                    {Math.round(
                      ((product.price - product.offerPrice) / product.price) *
                        100,
                    )}
                    % OFF
                  </span>
                )}
              </div>
            </div>

            {/* 🔹 Policies */}
            <div className="bg-white p-4 rounded-xl shadow-sm space-y-3">
              <p className="flex items-center gap-3 text-gray-700 text-sm">
                <CircleCheck size={18} className="text-green-500" />
                <span>
                  <span className="font-semibold">Warranty:</span>{" "}
                  {product.warranty}
                </span>
              </p>

              <p className="flex items-center gap-3 text-gray-700 text-sm">
                <CircleCheck size={18} className="text-green-500" />
                <span>
                  <span className="font-semibold">Return Policy:</span>{" "}
                  {product.returnPolicy}
                </span>
              </p>

              <p className="flex items-center gap-3 text-gray-700 text-sm">
                <CircleCheck size={18} className="text-green-500" />
                <span>
                  <span className="font-semibold">Replacement Policy:</span>{" "}
                  {product.replacementPolicy}
                </span>
              </p>
            </div>

            {/* 🔹 Add To Cart Button */}
            <button
              onClick={() => addToCart(product._id)}
              disabled={product.quantity === 0}
              className={`mt-2 transition-all duration-200 text-white py-3 rounded-xl font-semibold text-lg shadow-md ${
                product.quantity === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-orange-500 hover:bg-orange-600 active:scale-95"
              }`}
            >
              {product.quantity === 0 ? "Out of Stock" : "Add to Cart"}
            </button>
          </div>
        </div>

        {/* 🔹 Description Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Product Description</h2>
          <p className="text-gray-600 leading-relaxed">{product.description}</p>
        </div>
      </div>
    </>
  );
};

export default ProductDetailsPage;
