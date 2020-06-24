import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { postLogin, authSelector } from "./authSlice";

export default function Login() {
  const dispatch = useDispatch();
  const authState = useSelector(authSelector);
  const history = useHistory();

  const loginForm = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Must be an valid email")
        .required("Email is requried"),
      password: Yup.string().required("Password is required")
    }),

    onSubmit(values) {
      values["driver"] = "normal";
      dispatch(postLogin(values));

      if (authState.error) {
        return;
      }

      history.push("/");
    }
  });

  const renderError = () => {
    if (authState.error) {
      return <div className="auth-error">{authState.error}</div>;
    }

    return null;
  };

  return (
    <div className="row login">
      <div className="col s6 offset-s3">
        <div className="card">
          <h5>Login</h5>
          <div className="card-content">
            <form method="POST" onSubmit={loginForm.handleSubmit}>
              {renderError()}
              <div className="row">
                <div className="input-field col s12">
                  <input
                    id="email"
                    type="email"
                    className="validate"
                    name="email"
                    onBlur={loginForm.handleBlur}
                    onChange={loginForm.handleChange}
                    value={loginForm.values.email}
                  />
                  {loginForm.touched.email && loginForm.errors.email ? (
                    <span className="helper-text error" data-error="wrong">
                      {loginForm.errors.email}
                    </span>
                  ) : null}
                  <label htmlFor="email">Email</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input
                    id="password"
                    type="password"
                    className="validate"
                    name="password"
                    onBlur={loginForm.handleBlur}
                    onChange={loginForm.handleChange}
                    value={loginForm.values.password}
                  />
                  {loginForm.touched.password && loginForm.errors.password ? (
                    <span className="helper-text error" data-error="wrong">
                      {loginForm.errors.password}
                    </span>
                  ) : null}
                  <label htmlFor="password">Password</label>
                </div>
              </div>
              <button
                type="submit"
                className="waves-effect waves-light btn red"
              >
                Login
              </button>
              <Link
                className="btn-account-hint right"
                rel="stylesheet"
                to="/register"
              >
                Don't has account?
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
