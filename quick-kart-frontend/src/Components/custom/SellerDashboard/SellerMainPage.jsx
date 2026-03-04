import React, { useState } from "react";
import { SquarePlus, Logs, Archive } from "lucide-react";
import AddProducts from "./AddProducts";
import Orders from "./Orders";
import ProductList from "./ProductList";


const SellerMainPage = () => {
  const optionData = [
    {
      id: 1,
      Symbol: <SquarePlus className="w-5 h-5" />,
      text: "Add Products",
      page: <AddProducts />,
    },
    {
      id: 2,
      Symbol: <Logs className="w-5 h-5" />,
      text: "Products List",
      page: <ProductList />,
    },
    {
      id: 3,
      Symbol: <Archive className="w-5 h-5" />,
      text: "Orders",
      page: <Orders />,
    },
  ];

  const [sellerOption, setSellerOption] = useState(optionData[0]);

  return (
    <div className="min-h-screen mt-[64px] flex bg-gray-50">
      {/* Sidebar */}
      <div className="w-[18%] bg-white border-r border-gray-200 shadow-sm flex flex-col">
        <h2 className="text-lg font-semibold text-gray-800 px-5 py-5 border-b border-gray-200">
          Seller Dashboard
        </h2>

        <div className="flex flex-col gap-1 mt-2 px-2">
          {optionData.map((t) => (
            <div
              key={t.id}
              onClick={() => setSellerOption(t)}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-200
                ${
                  sellerOption.id === t.id
                    ? "bg-orange-500 text-white shadow-sm"
                    : "text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                }
              `}
            >
              {t.Symbol}
              <span className="font-medium text-sm">{t.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-50">
        <div className="bg-white shadow-sm min-h-[80vh] p-5 border border-gray-100">
          {sellerOption.page}
        </div>
      </div>
    </div>
  );
};

export default SellerMainPage;
