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
          <div
            className={`h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600`}
          />
        )}
      </div>
    </div>
  );
};

export default ProductList;
