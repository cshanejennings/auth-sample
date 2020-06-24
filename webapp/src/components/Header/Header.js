import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header(props) {
  const authData = useSelector(state => state.auth);
  let userFullName = "";

  if (authData && authData.user) {
    userFullName = `${authData.user.first_name} ${authData.user.last_name}`;
  }

  const renderAuthMenu = () => {
    if (userFullName !== "") {
      const profileLink = `/users/${authData.user.id}`;

      return (
        <>
          <li>
            <Link to={profileLink}>{userFullName}</Link>
          </li>
          <li>
            <Link to="/logout">Logout</Link>
          </li>
        </>
      );
    }

    return (
      <>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
      </>
    );
  };

  return (
    <nav>
      <div className="nav-wrapper">
        <Link to="/" className="brand-logo">
          Auth
        </Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          {renderAuthMenu()}
        </ul>
      </div>
    </nav>
  );
}
