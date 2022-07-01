import React from "react";
import { NavLink } from "react-router-dom";

export default function NavBar({ username }) {
  return (
    <nav className="navbar navbar-light bg-light mb-3 navbar-expand-md ">
      <ul className="navbar-nav me-auto mb-2 md-lg-0">
        {username ? (
          <li className="nav-item">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
          </li>
        ) : null}
        <li className="nav-item">
          <NavLink to="/addform" className={"nav-link"}>
            Add
          </NavLink>
        </li>
        {/*<li className="nav-item">
          <NavLink to="/register" className="nav-link">
            Register
          </NavLink>
        </li>
        */}
        {!username ? (
          <li className="nav-item">
            <NavLink to="/login" className="nav-link">
              Login
            </NavLink>
          </li>
        ) : (
          <NavLink to="/logout" className="nav-link">
            Logout
          </NavLink>
        )}
      </ul>
      {username ? (
        <NavLink className="navbar-brand" to="/">
          {username}
        </NavLink>
      ) : null}
    </nav>
  );
}
