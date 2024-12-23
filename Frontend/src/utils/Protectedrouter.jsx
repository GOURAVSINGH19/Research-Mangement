import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const Protectedrouter = () => {
  const user = localStorage.getItem("token");
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default Protectedrouter;
