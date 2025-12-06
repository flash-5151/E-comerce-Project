import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authFetch, saveToken } from "../utils/auth";

const SignUp = () => {
  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    console.log(form);

    try {
      const response = await fetch(`${BASEURL}/api/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        setMsg("Signup successful! Redirecting to login...");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        console.log(response);

        setMsg(data?.detail || data?.error || "Signup failed. Try again.");
      }
    } catch (error) {
      setMsg("An error occurred. Please try again later.");
      console.error(error);
    }
  };

  return (
    <div className="mt-20 flex flex-col items-center justify-center">
      <h2 className="font-bold text-2xl mb-6">Sign Up</h2>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm flex flex-col gap-3"
      >
        <input
          className="rounded-lg border border-gray-300 w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        />

        <input
          className="rounded-lg border border-gray-300 w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          className="rounded-lg border border-gray-300 w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <input
          className="rounded-lg border border-gray-300 w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          name="password2"
          type="password"
          placeholder="Confirm Password"
          value={form.password2}
          onChange={handleChange}
          required
        />

        <button className="w-full rounded-lg p-3 text-lg font-bold bg-blue-500 text-white hover:bg-blue-600 transition">
          Create Account
        </button>
      </form>

      {msg && (
        <p
          className={`mt-2 text-sm ${
            msg.includes("successful!") ? "text-green-500" : "text-red-500"
          }`}
        >
          {msg}
        </p>
      )}
    </div>
  );
};

export default SignUp;
