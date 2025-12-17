import axios from "axios";
import React from "react";
import { useEffect, useState, useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import ProductCart from "../components/ProductCart";

const ProductList = () => {
  const { products } = useContext(ProductContext);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

  return (
    <div className="min-h-screen bg-linear-to-br from-violet-300 to-purple-400">
      <div className="py-12 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCart key={product.id} product={product} />
          ))
        ) : (
          // <div className="text-center col-span-full text-white">
          //   No Products available

          // </div>
          <div className="animate-pulse space-y-3">
            <div className="h-48 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
