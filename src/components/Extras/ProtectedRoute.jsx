import React from "react";
import { Route, Redirect } from "react-router-dom";

const isAuthenticated = window.localStorage.getItem("isAuthenticated");

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated) {
          //console.log("sí se muestra");
          return <Component {...props} />;
        } else {
          //console.log("NO se muestra");
          return <Redirect to="/login" />;
        }
      }}
    />
  );
};

export default ProtectedRoute;
