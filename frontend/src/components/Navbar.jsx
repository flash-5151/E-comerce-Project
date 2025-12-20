import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { getAccessToken, clearToken } from "../utils/auth.js";

const Navbar = () => {
  const [isdark, setDark] = useState(false);
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const isLoggedIn = !!getAccessToken();

  const handleLogout = () => {
    clearToken();
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full h-16 bg-white font-bold shadow-md z-50 flex items-center justify-between  ">
      <Link
        to="/"
        className="cursor-pointer font-bold px-4 sm:px-16 text-2xl hover:border-2 hover:border-gray-400 transition-all duration-300 ease-in-out"
      >
        Home
      </Link>

      <div className=" font-bold px-2  sm:px-10 text-2xl flex items-center gap-2">
        <div className="font-bold px-2 sm:px-16 text-2xl ">
          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                className="ml-3 mr-0 cursor-pointer hover:border-2 hover:border-gray-400 transition-all duration-300 ease-in-out"
              >
                Login
              </Link>
            </>
          ) : (
            <>
              <button
                className="ml-3 mr-0 cursor-pointer hover:border-2 hover:border-gray-400 transition-all duration-300 ease-in-out"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}
        </div>
        <Link to="/cart" className="p-0 ml-0">
          <span className="relative inline-block ml-1 cursor-pointer hover:border-2 hover:border-gray-400 transition-all duration-300 ease-in-out">
            🛒
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
