import React, { useContext, useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  UserRound,
  ShoppingCart,
  UserPen,
  LogOut,
  ShoppingCartIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import { CartContext } from "../../context/CartContext";
import { useAuth } from "../../context/authContext";
import { NavLink } from "react-router-dom";
import Orders from "../SellerDashboard/Orders";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [signup, setSignup] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { cartItem } = useContext(CartContext);
  const { user, logout, isAuthenticated } = useAuth();
  const isLoggedIn = isAuthenticated;
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!profileOpen) return;

    const handleClickOutside = (e) => {
      if (!dropdownRef.current) return;

      if (!dropdownRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [profileOpen]);

  console.log("user data aa ra", user);
  const handleLogin = () => {
    setSignup(false);
    setOpenLogin(true);
    setMenuOpen(false);
  };

  const handleSignup = () => {
    setOpenLogin(false);
    setSignup(true);
  };

  const handleLogout = async () => {
    await logout();
    setProfileOpen(false);
    setOpenLogin(true);
  };

  const navStyle = ({ isActive }) =>
    `font-medium pb-1 border-b-2 transition-all duration-300 ${
      isActive
        ? "text-orange-500 border-orange-500"
        : "border-transparent hover:text-orange-500"
    }`;

  const mobileNavStyle = ({ isActive }) =>
    `py-3 px-4 rounded-xl transition ${
      isActive
        ? "bg-orange-100 text-orange-600 font-semibold"
        : "hover:bg-orange-50 hover:text-orange-500"
    }`;
  return (
    <div className="bg-white fixed top-0 left-0 w-full z-50 shadow-md border-b border-gray-300 h-[64px] flex items-center">
      <div className="flex items-center justify-between px-4 md:px-10 max-w-7xl mx-auto w-full">
        {/* Logo */}
        <div>
          <NavLink to="/" className="font-bold text-2xl">
            <span className="text-orange-500">Q</span>uickCart
          </NavLink>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-5 items-center cursor-pointer">
          <NavLink to="/" className={navStyle}>
            Home
          </NavLink>
          <NavLink to="/shop" className={navStyle}>
            Shop
          </NavLink>
          <NavLink to="/about" className={navStyle}>
            About Us
          </NavLink>
          <NavLink to="/contact" className={navStyle}>
            Contact
          </NavLink>

          {user?.role === "ADMIN" && (
            <Link
              to="/admin"
              className="font-light border px-2 py-1 rounded-full text-sm border-gray-300 hover:bg-gray-100"
            >
              Seller Dashboard
            </Link>
          )}
        </div>

        {/* Desktop Account */}
        <div className="hidden md:flex gap-6 items-center relative">
          {/* Cart */}
          {user?.role === "USER" && (
            <div className="flex gap-8 items-center">
              <Link to="/cart" className="relative">
                <ShoppingCart className="w-7 h-7 text-gray-700" />

                {Array.isArray(cartItem) && cartItem.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center shadow-md">
                    {cartItem.reduce((total, item) => total + item.quantity, 0)}
                  </span>
                )}
              </Link>
            </div>
          )}

          {/* Login OR Profile */}
          {!isLoggedIn ? (
            <button
              onClick={() => setOpenLogin(true)}
              className="font-medium border px-3 py-1 rounded-xl text-white bg-orange-400"
            >
              Login
            </button>
          ) : (
            <div className="relative" ref={dropdownRef}>
              {/* Avatar Button */}
              <div
                onClick={() => setProfileOpen((prev) => !prev)}
                className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold cursor-pointer overflow-hidden"
              >
                {user?.imageUrl ? (
                  <img
                    src={user.imageUrl}
                    alt="avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  user?.name
                    ?.split(" ")
                    .map((w) => w[0])
                    .join("")
                    .toUpperCase()
                )}
              </div>

              {/* Dropdown */}
              {profileOpen && (
                <div className="absolute top-12 right-0 w-64 bg-white shadow-xl border rounded-xl p-4 z-50">
                  <div className="flex gap-3 items-center">
                    <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">
                      {user?.name?.[0]?.toUpperCase()}
                    </div>

                    <div>
                      <p className="font-semibold">{user?.name}</p>
                      <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>
                  </div>

                  <hr className="my-3" />

                  <Link
                    to="/profile"
                    className="flex items-center gap-2 w-full p-2 rounded-lg hover:bg-gray-100"
                  >
                    <UserPen size={16} /> Profile
                  </Link>

                  {user?.role === "USER" && (
                    <Link to="/orders">
                      <button className="flex items-center gap-2 w-full p-2 rounded-lg hover:bg-gray-100">
                        <ShoppingCartIcon size={16} /> Orders
                      </button>
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full p-2 rounded-lg text-red-500 hover:bg-red-50"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex md:hidden cursor-pointer z-50"
        >
          {menuOpen ? <X size={28} /> : <Menu size={24} />}
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-2xl z-40 transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* 🔶 Top Profile Section */}
          {isLoggedIn && (
            <div className="mt-16 px-6 pb-6 border-b">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-lg overflow-hidden">
                  {user?.imageUrl ? (
                    <img
                      src={user.imageUrl}
                      alt="avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    user?.name?.[0]?.toUpperCase()
                  )}
                </div>

                <div>
                  <p className="font-semibold text-gray-800">{user?.name}</p>
                  <p className="text-sm px-2 bg-gray-100 rounded-full text-gray-700">
                    {user?.email}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 🔶 Navigation Links */}
          {/* 🔶 Navigation Links */}
          <div className="flex flex-col gap-1 px-6 py-6 text-base font-medium flex-grow">
            <NavLink to="/" end className={mobileNavStyle}>
              Home
            </NavLink>

            <NavLink to="/shop" className={mobileNavStyle}>
              Shop
            </NavLink>

            {user?.role === "USER" && (
              <NavLink to="/orders" className={mobileNavStyle}>
                Orders
              </NavLink>
            )}

            <NavLink to="/about" className={mobileNavStyle}>
              About Us
            </NavLink>

            <NavLink to="/contact" className={mobileNavStyle}>
              Contact
            </NavLink>

            {user?.role === "ADMIN" && (
              <NavLink to="/admin" className={mobileNavStyle}>
                Seller Dashboard
              </NavLink>
            )}
          </div>

          {/* 🔶 Bottom Auth Section */}
          <div className="border-t p-6">
            {!isLoggedIn ? (
              <button
                onClick={() => setOpenLogin(true)}
                className="w-full py-3 rounded-xl bg-orange-500 text-white font-semibold shadow-md hover:bg-orange-600 transition"
              >
                Login
              </button>
            ) : (
              <button
                onClick={handleLogout}
                className="w-full py-3 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 bg-black/40 z-30"
        />
      )}

      {/* Modals */}
      {signup && <SignupForm handleLogin={handleLogin} setSignup={setSignup} />}
      {openLogin && (
        <LoginForm setOpenLogin={setOpenLogin} handleSignup={handleSignup} />
      )}
    </div>
  );
};

export default Header;
