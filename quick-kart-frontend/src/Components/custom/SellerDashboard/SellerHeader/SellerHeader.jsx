import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";
const SellerHeader = () => {
    // const location = useLocation();
    // const pathName = location.pathname;
    // const [goMainPage,setGoMainPage]=useState(false)
    return (
        <header className="fixed top-0 left-0 w-full h-[64px] bg-white shadow-md z-50">
            <div className="flex items-center justify-between h-full px-6">
                
                <Link to="/" className="font-bold text-2xl">
                    <span className="text-orange-500">Q</span>uickCart
                </Link>

                <Link to="/" className="text-white bg-gray-700 hover:bg-gray-800 px-4 py-1 rounded-2xl transition">
                    Home
                </Link>
            </div>
          
        </header>
    )
}

export default SellerHeader
