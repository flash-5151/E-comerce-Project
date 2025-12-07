import React from "react";
import { Link } from "react-router-dom";

const ProductCart = ({ product }) => {
  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
  return (
    <Link key={product.id} to={`/productDetails/${product.id}`}>
      <div
        className="bg-white/80 backdrop-blur-sm border border-gray-200 shadow-lg rounded-2xl p-6 
                   hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-contain rounded-xl shadow-lg mb-2.5 
           transition-all duration-500 hover:scale-110 hover:shadow-2xl"
        />

        <h2 className="text-2xl font-semibold text-gray-900">{product.name}</h2>
        <p className="text-indigo-600 font-bold text-xl mt-4">
          ${product.price}
        </p>
      </div>
    </Link>
  );
};

export default ProductCart;
