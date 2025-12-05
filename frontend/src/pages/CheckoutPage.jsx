import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import axios from "axios";
import { authFetch } from "../utils/auth";

const CheckoutPage = () => {
  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    payment_method: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    console.log(form);

    try {
      const res = await authFetch(`${BASEURL}/api/orders/create/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      console.log(res);

      if (res.ok) {
        setMessage("Order placed successfully");
        // await axios.get(`${BASEURL}/api/cart/`);

        clearCart();

        setTimeout(() => navigate("/"), 2000);
      } else {
        setMessage(res.data.error || "Failed to place order!");
      }
    } catch (error) {
      setMessage("Please try again!");
      console.log(error, " try again later! ");
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="mt-20 flex items-center flex-col justify-center   ">
        <h1 className="font-bold text-2xl mb-6 mt-5">Checkout</h1>
        <form
          onSubmit={handlesubmit}
          className="flex flex-col items-center justify-center gap-3"
        >
          <input
            name="name"
            placeholder="Full Name"
            type="text"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-0 focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            name="address"
            placeholder="Full address"
            type="text"
            value={form.address}
            onChange={handleChange}
            required
            className="rounded-lg border border-gray-300 w-full p-3  focus:outline-0 focus:ring-blue-500  items  focus:ring-2"
          />
          <input
            name="phone"
            placeholder="phone number"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg w-full p-3 focus:outline-0 focus:ring-2 focus:ring-blue-500"
          />
          <select
            className="w-full border border-gray-300 rounded-lg p-3 cursor-pointer focus:outline-0 focus:ring-2 focus:ring-blue-500 "
            name="payment_method"
            onChange={handleChange}
            value={form.payment_method}
          >
            <option value="" hidden>
              --Select Payment Method--
            </option>
            <option value="COD" className="hover:bg-red-700">
              Cash on Delivery
            </option>
            <option value="creditCart">online payment</option>
            <option value="paypal">paypal</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="relative w-full border-2 border-gray-500 rounded-lg p-3 text-lg font-bold overflow-hidden
          before:absolute before:inset-0 before:bg-green-500 before:scale-x-0 before:origin-left
          before:transition-transform before:duration-1000 before:ease-in-out
          hover:before:scale-x-100 hover:before:duration-1000  cursor-pointer "
          >
            <span className="relative z-10">
              {loading ? "processing..." : "place order"}
            </span>
          </button>
          {message && (
            <p
              className={`mt-2 text-sm ${
                message.includes("successfully")
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
