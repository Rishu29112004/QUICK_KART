import React from "react";
import { Routes, Route, useLocation, Form } from "react-router-dom";

import Header from "./Components/custom/header/Header";
import Footer from "./Components/custom/footer/Footer";
import SellerHeader from "./Components/custom/SellerDashboard/SellerHeader/SellerHeader";

import Shop from "./Components/screen/shop/Shop";
import About from "./Components/screen/about/About";
import ContactUs from "./Components/screen/ContactUs/ContactUs";

import SellerMainPage from "./Components/custom/SellerDashboard/SellerMainPage";
import CartPage from "./Components/custom/header/components/CartPage";
import ProductDetailsPage from "./Components/custom/productDetailsPage/ProductDetailsPage";

import ScrollToTop from "./Components/custom/scrollToTop/ScrollToTop";
import Orders from "./Components/custom/header/components/Orders";
import Profile from "./Components/screen/profile/Profile";
import FormExample from "./Components/screen/profile/FormExample";
import Home from "./Components/screen/Home/Home";



const App = () => {
  const location = useLocation();
  const pathName = location.pathname;

  return (
    <div className="min-h-screen">
      <ScrollToTop />

      {pathName === "/admin" ? <SellerHeader /> : <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/productDetails/:id" element={<ProductDetailsPage />} />

        <Route path="/admin/*" element={<SellerMainPage />} />

          <Route path="/form" element={<FormExample/>} />
      </Routes>

      {pathName === "/admin" ? null : <Footer />}
    </div>
  );
};

export default App;
