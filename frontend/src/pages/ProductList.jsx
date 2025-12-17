import axios from "axios";
import React from "react";
import { useEffect, useState, useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import ProductCart from "../components/ProductCart";
import Spinner from "../utils/Spinner";

const ProductList = () => {
  const { products, loading, error } = useContext(ProductContext);
  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-violet-300 to-purple-400">
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
