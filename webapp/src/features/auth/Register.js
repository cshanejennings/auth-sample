import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postRegister, authSelector } from "./authSlice";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function Register(props) {
  const dispatch = useDispatch();
  const authState = useSelector(authSelector);

  const registerForm = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: ""
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required("First name is required"),
      last_name: Yup.string().required("Last name is required"),
      email: Yup.string()
        .email("Must be an valid email")
        .required("Email is requried"),
      password: Yup.string().required("Password is required")
    }),

    onSubmit(values) {
      values["driver"] = "normal";
      dispatch(postRegister(values));

      if (authState.error) {
        return;
      }

      props.history.push("/");
    }
  });

  return (
    <div className="row register">
      <div className="col s6 offset-s3">
        <div className="card">
          <h5>Create New Account</h5>
          <div className="card-content">
            <form method="POST" onSubmit={registerForm.handleSubmit}>
              <div className="row">
                <div className="input-field col s6">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    id="firstName"
                    type="text"
                    className="validate"
                    name="first_name"
                    onBlur={registerForm.handleBlur}
                    onChange={registerForm.handleChange}
                    value={registerForm.values.first_name}
                  />
                  {registerForm.touched.first_name &&
                  registerForm.errors.first_name ? (
                    <span className="helper-text error" data-error="wrong">
                      {registerForm.errors.first_name}
                    </span>
                  ) : null}
                </div>

                <div className="input-field col s6">
                  <input
                    id="lastName"
                    type="text"
                    className="validate"
                    name="last_name"
                    onBlur={registerForm.handleBlur}
                    onChange={registerForm.handleChange}
                    value={registerForm.values.last_name}
                  />
                  {registerForm.touched.lastName &&
                  registerForm.errors.last_name ? (
                    <span className="helper-text error" data-error="wrong">
                      {registerForm.errors.last_name}
                    </span>
                  ) : null}
                  <label htmlFor="lastName">Last Name</label>
                </div>
              </div>

              <div className="row">
                <div className="input-field col s12">
                  <input
                    id="email"
                    type="email"
                    className="validate"
                    name="email"
                    onBlur={registerForm.handleBlur}
                    onChange={registerForm.handleChange}
                    value={registerForm.values.email}
                  />
                  {registerForm.touched.email && registerForm.errors.email ? (
                    <span className="helper-text error" data-error="wrong">
                      {registerForm.errors.email}
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
                    onBlur={registerForm.handleBlur}
                    onChange={registerForm.handleChange}
                    value={registerForm.values.password}
                  />
                  {registerForm.touched.password &&
                  registerForm.errors.password ? (
                    <span className="helper-text error" data-error="wrong">
                      {registerForm.errors.password}
                    </span>
                  ) : null}
                  <label htmlFor="password">Password</label>
                </div>
              </div>
              <button
                type="submit"
                className="waves-effect waves-light btn red"
              >
                Register
              </button>
              <Link
                className="btn-account-hint right"
                rel="stylesheet"
                to="/login"
              >
                Already has account?
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
