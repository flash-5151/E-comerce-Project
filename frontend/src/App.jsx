import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";
import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import CartPage from "./pages/CartPage";
import Navbar from "./components/Navbar";
import CheckoutPage from "./pages/CheckoutPage";
import PrivateRouter from "./components/PrivateRouter";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Spinner from "./utils/Spinner";

const App = () => {
  return (
    <div className="bg-(--bg) text-(--text) dark:bg-(--bg) dark:text-(--text)">
      <BrowserRouter>
        <div className="mb-14">
          <Navbar />
        </div>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route
            path="/productDetails/:productId"
            element={<ProductDetails />}
          />
          <Route path="/cart" element={<CartPage />} />
          <Route element={<PrivateRouter />}>
            <Route path="/checkout" element={<CheckoutPage />}></Route>
          </Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
