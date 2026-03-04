import React, { useEffect, useState } from "react";
import { orderService } from "../../../services/order.service";
import { Package, Calendar, MapPin, CheckCircle, Clock, AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { PageLoader } from "../../loader/loader/PageLoader";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await orderService.getMyOrders();
      setOrders(res.orders || []);
      setCurrentPage(1);
    } catch (error) {
      console.log(error);
      setError("Failed to load orders. Please try again later.");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = orders.slice(startIndex, startIndex + itemsPerPage);

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return <CheckCircle className="text-green-500" size={20} />;
      case "pending":
      case "processing":
        return <Clock className="text-orange-500" size={20} />;
      case "cancelled":
        return <AlertCircle className="text-red-500" size={20} />;
      default:
        return <Package className="text-blue-500" size={20} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "bg-green-50 text-green-700 border-green-200";
      case "pending":
      case "processing":
        return "bg-orange-50 text-orange-700 border-orange-200";
      case "cancelled":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-blue-50 text-blue-700 border-blue-200";
    }
  };



  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
        <PageLoader loading={true} error={null} loadingText="Loading your orders...">
          <div />
        </PageLoader>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <Package className="text-orange-500" size={36} />
            Your Orders
          </h1>
          <p className="text-gray-600">Track and manage all your orders in one place</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start gap-3">
            <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {orders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <Package className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-600 text-lg font-medium">No orders yet</p>
            <p className="text-gray-500 mt-2">Start shopping to see your orders here</p>
          </div>
        ) : (
          <>
            <div className="space-y-5">
              {paginatedOrders.map((order) => {
                // const imageSource = getImageSource(order.products);
                
                return (
                  <div
                    key={order._id}
                    className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200 overflow-hidden"
                  >
                    {/* Order Header */}
                    <div className="bg-gradient-to-r from-orange-50 to-orange-25 border-b border-gray-200 p-5 flex items-center justify-between flex-wrap gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Order ID</p>
                        <p className="text-lg font-semibold text-gray-900 font-mono">
                          #{order._id?.slice(-8).toUpperCase()}
                        </p>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm text-gray-600 flex items-center gap-1">
                            <Calendar size={14} />
                            {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                        </div>

                        <div className={`flex items-center gap-2 px-4 py-2 rounded-full border ${getStatusColor(order.status)}`}>
                          {getStatusIcon(order.status)}
                          <span className="font-semibold text-sm capitalize">{order.status}</span>
                        </div>
                      </div>
                    </div>

                    {/* Order Content */}
                    <div className="p-6">
                      {/* Products Grid */}
                      <div className="mb-6">
                        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                          <Package size={18} className="text-orange-500" />
                          Items ({order.products.length})
                        </h3>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                          {order.products.map((item) => {
                          
                            return (
                              <div
                                key={item._id}
                                className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition border border-gray-200"
                              >
                                <div className="bg-white rounded-md h-24 w-full flex items-center justify-center mb-3 border border-gray-100 overflow-hidden">
                                  {item.product?.image ? (
                                    <img
                                      src={item.product.image}
                                      className="h-full w-full object-contain p-2"
                                      alt={item.product?.productName}
                                      onError={(e) => {
                                        e.target.style.display = "none";
                                      }}
                                    />
                                  ) : (
                                    <div className="flex flex-col items-center justify-center text-gray-400">
                                      <Package size={24} />
                                      <p className="text-xs mt-1">No image</p>
                                    </div>
                                  )}
                                </div>

                                <p className="text-xs font-medium text-gray-700 line-clamp-2 mb-2">
                                  {item.product?.productName}
                                </p>

                                <div className="space-y-1">
                                  <p className="text-xs text-orange-600 font-semibold">₹{item.price}</p>
                                  <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Order Summary */}
                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                            <p className="text-2xl font-bold text-gray-900">₹{order.totalAmount}</p>
                          </div>

                          {order.shippingAddress && (
                            <div className="text-right">
                              <p className="text-sm text-gray-600 flex items-center gap-1 mb-1">
                                <MapPin size={14} />
                                Delivery Address
                              </p>
                              <p className="text-sm font-medium text-gray-900 max-w-xs">
                                {typeof order.shippingAddress === "string"
                                  ? order.shippingAddress
                                  : "Address on file"}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-3">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  <ChevronLeft size={18} />
                  Previous
                </button>

                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-2 rounded-lg font-medium transition ${
                        currentPage === page
                          ? "bg-orange-500 text-white"
                          : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  Next
                  <ChevronRight size={18} />
                </button>
              </div>
            )}

            {/* Pagination Info */}
            {totalPages > 1 && (
              <div className="text-center mt-4 text-gray-600 text-sm">
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, orders.length)} of {orders.length} orders
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Orders;