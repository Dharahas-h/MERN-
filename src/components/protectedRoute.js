import React from "react";
import { Route, Navigate } from "react-router-dom";

const ProtectedRoute = (props) => {
  const token = localStorage.getItem("token");
  return (
    <Route
      path={props.path}
      element={token ? props.element : <Navigate to="/login" />}
    ></Route>
  );
};

export default ProtectedRoute;
