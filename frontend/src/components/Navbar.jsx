import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { getAccessToken, clearToken } from "../utils/auth.js";

const Navbar = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const isLoggedIn = !!getAccessToken();

  const handleLogout = () => {
    clearToken();
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full h-16 bg-white font-bold shadow-md z-50 flex items-center justify-between">
      <Link to="/" className="cursor-pointer font-bold px-4 sm:px-16 text-2xl">
        Home
      </Link>

      <div className="cursor-pointer font-bold px-2  sm:px-10 text-2xl flex items-center gap-2">
        <span className="mr-0">
          <div className="cursor-pointer font-bold px-2 sm:px-16 text-2xl ">
            {!isLoggedIn ? (
              <>
                <Link to="/login" className="ml-3 mr-0">
                  Login
                </Link>
              </>
            ) : (
              <>
                <button className="ml-3 mr-0" onClick={handleLogout}>
                  Logout
                </button>
              </>
            )}
          </div>
        </span>
        <Link to="/cart" className="p-0 ml-0">
          <span className="relative inline-block ml-1">
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
