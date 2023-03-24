import React from "react";
import { Navigate } from "react-router-dom";
import { getLocalStorageData } from "../utils/userLocalData";

const PrivateRoute = ({ children }) => {
  let isAuthenticated = getLocalStorageData("JWTTOKEN") || null;
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default PrivateRoute;
