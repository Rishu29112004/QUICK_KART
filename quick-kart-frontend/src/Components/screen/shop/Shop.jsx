import React, { useContext, useEffect, useRef, useState } from "react";
import { products } from "../../custom/data/data";
import { CartContext } from "../../context/CartContext";
import { productService } from "../../services/product.service";
import { toast } from "sonner";
import { PageLoader } from "../../custom/loader/loader/PageLoader";
import { Link } from "react-router-dom";

const Shop = () => {
  const { addToCart } = useContext(CartContext);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMyAllProducts();
  }, []);

  const fetchMyAllProducts = async () => {
    try {
      setLoading(true);
      const response = await productService.getAllProducts();

      console.log("FULL API RESPONSE:", response);

      const products = response?.data || [];

      setAllProducts(Array.isArray(products) ? products : []);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch products");
      setAllProducts([]);
    } finally {
      setLoading(false);
    }
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
    <div className="min-h-screen mt-[85px] max-w-7xl mx-auto px-4 py-6">
      {/* Heading */}
      <div className="mb-8">
        <p className="text-2xl font-semibold text-gray-800">All Products</p>
        <div className="w-16 h-1 bg-orange-500 mt-2 rounded-full"></div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {allProducts.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-xl border border-gray-200 hover:shadow-lg transition duration-300 overflow-hidden flex flex-col"
          >
            {/* Image */}
            <Link to={`/productDetails/${product._id}`} className="bg-gray-100 h-44 overflow-hidden">
              <img
                src={product.image}
                alt={product.productName}
                className="w-full h-full object-cover hover:scale-105 transition duration-300"
              />
            </Link>

            {/* Content */}
            <div className="p-4 flex flex-col flex-grow">
              {/* Brand + Name */}
              <div className="flex gap-3 items-center min-h-[28px]">
                <p className="text-md font-bold text-red-500 uppercase tracking-wide">
                  {product.brandName}
                </p>

                <p className="font-semibold text-gray-800 line-clamp-1">
                  {product.productName}
                </p>
              </div>

              {/* Description (Fixed Height + Clamp) */}
              <p className="text-sm text-gray-500 mt-1 font-bold line-clamp-2 min-h-[40px]">
                {product.description}
              </p>

              {/* Price + Button → Always Bottom */}
              <div className="flex items-center justify-between mt-auto pt-1">
                <div>
                  <p className="text-lg font-bold text-gray-900">
                    ₹{product.offerPrice}
                  </p>
                  <p className="text-sm text-gray-400 line-through">
                    ₹{product.price}
                  </p>
                </div>

                <button
                  onClick={() => addToCart(product._id)}
                  className="border cursor-pointer border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-8 py-2 rounded-md text-sm font-bold transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
