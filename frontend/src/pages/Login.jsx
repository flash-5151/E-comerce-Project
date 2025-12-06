import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveToken } from "../utils/auth";

const Login = () => {
  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
  const [form, setForm] = useState({ username: "", password: "" });
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
      const respose = await fetch(`${BASEURL}/api/token/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await respose.json();
      if (respose.ok) {
        saveToken(data);
        setMsg("Login successful! redirecting...");
        setTimeout(() => {
          navigate("/");
        }, 800);
      } else {
        setMsg(data.details || "login failed .please try again later");
      }
    } catch (error) {
      setMsg("An error occured please try again later", error);
    }
  };

  return (
    <div>
      <div className="mt-20 flex items-center flex-col justify-center">
        <h2 className="font-bold text-2xl mb-6 mt-5">Login</h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center gap-3"
        >
          <input
            className="rounded-lg border border-gray-300 w-full p-3  focus:outline-0 focus:ring-blue-500  items  focus:ring-2"
            name="username"
            type="username"
            placeholder="username"
            value={form.username}
            onChange={handleChange}
            required
          />
          <input
            className="rounded-lg border border-gray-300 w-full p-3  focus:outline-0 focus:ring-blue-500  items  focus:ring-2"
            name="password"
            type="password"
            placeholder="password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button
            className="relative w-full  rounded-lg p-3 text-lg font-bold overflow-hidden
              cursor-pointer bg-blue-500 "
          >
            <span className="text-white">Login</span>
          </button>
        </form>
        {msg && (
          <p
            className={`mt-2 text-sm ${
              message.includes("successfully")
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {msg}
          </p>
        )}
        <div className="mt-6">
          Don't have an account ?{""}
          <a href="/signup" className="text-blue-600 ml-2">
            SignUp
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
