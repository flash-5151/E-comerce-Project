import React from "react";
import { Navigate, Outlet } from "react-router-dom";
const isAuthenticated = () => !!localStorage.getItem("access_token");
// !! It converts ANYTHING into a true or false boolean
const PrivateRouter = ({ redirectTo = "/login" }) => {
  return isAuthenticated() ? <Outlet /> : <Navigate to={redirectTo} replace />;
};

export default PrivateRouter;
