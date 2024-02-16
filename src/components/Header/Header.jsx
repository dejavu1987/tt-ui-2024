import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";

function Header() {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark">
        <Link className="navbar-brand" to="/">
          <i className="fa fas fa-table-tennis"></i> PiMP
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className=" navbar-collapse" id="navbarText">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item mx-3">
              <Link className="nav-link" to="/devices">
                Manage Devices
              </Link>
            </li>
            <li className="nav-item mx-3">
              <Link className="nav-link" to="/players">
                Manage Players
              </Link>
            </li>
            <li className="nav-item mx-3">
              <Link className="nav-link" to="/tournaments">
                Tournaments
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item mx-3">
              <Link
                className="nav-link btn-md btn-md-primary"
                to="/create-match"
              >
                Create New Match
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
