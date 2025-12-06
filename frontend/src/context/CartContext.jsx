import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import { authFetch, getAccessToken, clearToken } from "../utils/auth";
import React from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, SetCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
  useEffect(() => {
    const token = getAccessToken();

    if (!token) {
      console.log("No token found. Skipping cart fetch.");
      return;
    }

    fetchCart();
  }, []);

  const fetchCart = async () => {
    const token = getAccessToken();

    if (!token) {
      console.log("No token, user not logged in");
      return;
    }

    try {
      const res = await authFetch(`${BASEURL}/api/cart/`);

      if (res.status === 401) {
        clearToken();
        window.location.href = "/login";
        return;
      }

      const data = await res.json();
      SetCartItems(data.items || []);
      setTotal(data.total || 0);
    } catch (error) {
      console.log("Error fetching cart:", error);
    }
  };

  const addToCart = async (productId) => {
    console.log(productId);

    try {
      const res = await authFetch(`${BASEURL}/api/cart/add/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ product_id: productId }),
      });
      fetchCart();
    } catch (error) {
      console.log("error adding to cart", error);
    }
  };

  const removeFromCart = async (id) => {
    try {
      const res = await authFetch(`${BASEURL}/api/cart/remove/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ item_id: id }),
      });
      fetchCart();
    } catch (error) {
      console.log("error during removing the cart", error);
    }
  };
  const updateQuantity = async (id, quantity) => {
    if (quantity < 1) {
      await removeFromCart(id);
      return;
    }

    try {
      const res = await authFetch(`${BASEURL}/api/cart/update/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          item_id: id,
          quantity: quantity,
        }),
      });
      fetchCart();
    } catch (error) {
      console.log("error during updating the cart", error);
    }
  };

  const clearCart = () => {
    SetCartItems([]);
    setTotal(0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        total,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
export const useCart = () => useContext(CartContext);
