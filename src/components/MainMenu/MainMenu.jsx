import { useState } from "react";
import { NavLink as Link } from "react-router-dom";

function MainMenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  return menuOpen ? (
    <nav className="main-menu fixed z-50 top-0 right-0 w-full max-w-96 bg-primary text-white px-6 py-3 h-full">
      <div className="close fixed top-0 right-0 mt-3 mr-3">
        <button className="close-btn" onClick={() => setMenuOpen(false)}>
          <i className="fa fa-times"></i>
        </button>
      </div>
      <h1 className="logo py-5">
        <Link to="/">
          <i className="fa fa-table-tennis"></i> PiMP
        </Link>
      </h1>
      <ul className="flex flex-col mr-auto">
        <li className="nav-item">
          <Link
            className=" bg-white text-primary px-6 py-4 rounded-full block hover:bg-opacity-90 mb-2"
            to="/create-match"
            activeClassName="active"
          >
            Create New Match
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/devices" activeClassName="active">
            Manage Devices
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/players" activeClassName="active">
            Manage Players
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/tournaments" activeClassName="active">
            Tournaments
          </Link>
        </li>
      </ul>
    </nav>
  ) : (
    <button
      className="menu-btn button fixed z-50 right-2 bottom-2 m-3 w-12 h-12 bg-primary text-white rounded-full text-2xl"
      onClick={() => setMenuOpen(true)}
    >
      <i className="fa fa-bars"></i>
    </button>
  );
}

export default MainMenu;
