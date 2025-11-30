import axios from "axios";
import React from "react";
import { useEffect, useState, useContext } from "react";
import { ProductContext } from "../src/context/ProductContext";
import ProductCart from "../components/ProductCart";

const ProductList = () => {
  const { products } = useContext(ProductContext);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

  return (
    <div className="min-h-screen bg-linear-to-br from-violet-300 to-purple-400">
      <h1 className="sticky top-0 z-50 text-3xl font-bold text-center text-white py-4 bg-white/20 backdrop-blur-sm shadow-md">
        Product List
      </h1>

      <div className="py-12 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCart key={product.id} product={product} />
          ))
        ) : (
          <p className="text-center col-span-full text-white">
            No Products available
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
