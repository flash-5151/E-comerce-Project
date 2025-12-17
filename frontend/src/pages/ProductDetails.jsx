import React from "react";
import { Link, useParams } from "react-router-dom";
import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import { useCart } from "../context/CartContext.jsx";

const ProductDetails = () => {
  const { productId } = useParams();
  const { products } = useContext(ProductContext);
  const { addToCart } = useCart();
  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

  // find the product by ID
  const product = products.find((p) => p.id === Number(productId));

  if (!product)
    return (
      <div className="flex items-center justify-center py-10">
        <div
          className={`h-9 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600`}
        />
      </div>
    );

  const handleAddToCart = () => {
    if (!localStorage.getItem("access_token")) {
      window.location.href = "/login";
      return;
    }
    addToCart(product.id);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-2xl shadow-lg grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* LEFT: Product Image */}
        <div className="flex justify-center items-center">
          <img
            src={`${BASEURL}${product.image}`}
            alt={product.name}
            className="w-full max-w-sm object-contain rounded-xl shadow-md 
          transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* RIGHT: Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {product.name}
          </h1>

          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            {product.descriptions}
          </p>

          {/* Price */}
          <p className="text-4xl font-extrabold text-purple-600 mb-6">
            ₹ {product.price}
          </p>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition cursor-pointer"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
