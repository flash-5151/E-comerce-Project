import ProductList from "../pages/ProductList";
import ProductDetails from "../pages/ProductDetails";
import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route
            path="/productDetails/:productId"
            element={<ProductDetails />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
