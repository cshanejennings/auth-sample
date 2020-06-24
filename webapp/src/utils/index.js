import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

/*
 * A wrapper for <Route> that redirects to the login
 * screen if you're not yet authenticated.
 * <PrivateRoute path="/protected">
 *   <ProtectedPage />
 * </PrivateRoute>
 */
export function PrivateRoute({ children, ...rest }) {
  let isAuthenticated = false;
  const loginData = useSelector(state => state.auth);
  if (loginData && loginData.user) {
    isAuthenticated = true;
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}
