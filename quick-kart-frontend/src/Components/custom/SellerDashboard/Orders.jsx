import React from "react";


export const ordersLikeData = [
  {
    _id: "p101",
    brandName: "Apple",
    productName: "AirPods Pro 2nd Gen",
    category: "Earphone",
    price: 10000,        // Product Price per unit
    total_price: 50000,
    quantity: 5,
    payment: "Paid",
    image: [
      "https://raw.githubusercontent.com/avinashdm/gs-images/main/quickcart/k4dafzhwhgcn5tnoylrw.webp",
    ],
  },
  {
    _id: "p102",
    brandName: "Canon",
    productName: "EOS R5 Camera",
    category: "Camera",
    price: 175000,
    total_price: 350000,
    quantity: 2,
    payment: "Paid",
    image: [
      "https://raw.githubusercontent.com/avinashdm/gs-images/main/quickcart/r5h370zuujvrw461c6wy.webp",
    ],
  },
  {
    _id: "p103",
    brandName: "Sony",
    productName: "PlayStation 5 Console",
    category: "Accessories",
    price: 20000,
    total_price: 60000,
    quantity: 3,
    payment: "COD",
    image: [
      "https://raw.githubusercontent.com/avinashdm/gs-images/main/quickcart/dd3l13vfoartrgbvkkh5.webp",
    ],
  },
  {
    _id: "p104",
    brandName: "Samsung",
    productName: "Galaxy S23",
    category: "Smartphone",
    price: 80000,
    total_price: 80000,
    quantity: 1,
    payment: "Paid",
    image: [
      "https://raw.githubusercontent.com/avinashdm/gs-images/main/quickcart/xjd4eprpwqs7odbera1w.webp",
    ],
  },
  {
    _id: "p105",
    brandName: "ASUS",
    productName: "ROG Zephyrus G16 Laptop",
    category: "Laptop",
    price: 180000,
    total_price: 180000,
    quantity: 1,
    payment: "Paid",
    image: [
      "https://raw.githubusercontent.com/avinashdm/gs-images/main/quickcart/wig1urqgnkeyp4t2rtso.webp",
    ],
  },
  {
    _id: "p106",
    brandName: "Bose",
    productName: "QuietComfort 45 Headphones",
    category: "Headphone",
    price: 15000,
    total_price: 30000,
    quantity: 2,
    payment: "Paid",
    image: [
      "https://raw.githubusercontent.com/avinashdm/gs-images/main/quickcart/m16coelz8ivkk9f0nwrz.webp",
    ],
  },
];

const Orders = () => {
  return (
    <div className="min-h-screen rounded-md bg-gray-100 p-6">
      <div className="bg-white border  border-gray-300 rounded-md overflow-hidden">
        {/* Title */}
        <div className="px-4 py-4 border-b border-gray-300 bg-gray-100">
          <p className="text-2xl font-semibold text-gray-800">Orders</p>
        </div>

        {/* Header */}
        <div className="flex items-center px-4 py-3 font-semibold text-gray-700 bg-gray-50 border-b border-gray-300">
          <p className="flex-1 text-left">Product</p>
             <p className="flex-1 text-left">Product Name</p>
          <p className="flex-1 text-left">Brand Name</p>
          <p className="flex-1 text-left">Category</p>
             <p className="flex-1 text-right">Product Price</p>
          <p className="flex-1 text-center">Qty</p>
          <p className="flex-1 text-right">Total Price</p>
          <p className="flex-1 text-center">Payment</p>
        </div>

        {/* Rows */}
        {ordersLikeData.map((t) => (
          <div
            key={t._id}
            className="flex items-center px-4 py-3 border-b border-gray-200 hover:bg-gray-50"
          >
            {/* Product Image */}
            <div className="flex-1 flex justify-start">
              <img
                src={t.image[0]}
                alt={t.productName}
                className="h-12 w-12 rounded-md object-cover bg-gray-200"
              />
            </div>

            {/* Product Name */}
            <p className="flex-1 text-gray-800 font-medium  break-words pr-4 leading-relaxed">{t.productName}</p>

            {/* Brand Name */}
            <p className="flex-1 text-gray-600">{t.brandName}</p>

            {/* Category */}
            <p className="flex-1 text-gray-600">{t.category}</p>

<p className="flex-1 text-center text-gray-600">{t.price}</p>
            {/* Quantity */}
            <p className="flex-1 text-center text-gray-600">{t.quantity}</p>

            {/* Total Price */}
            <p className="flex-1 text-right font-medium text-gray-800">
              ₹{t.total_price}
            </p>

            {/* Payment */}
            <p
              className={`flex-1 text-center font-medium ${
                t.payment === "Paid" ? "text-green-600" : "text-orange-600"
              }`}
            >
              {t.payment}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
