import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <nav className="flex justify-between">
        <Link className="navbar-brand" to="/">
          <i className="fa fas fa-table-tennis"></i> PiMP
        </Link>

        <div className="flex" id="navbarText">
          <ul className="flex mr-auto">
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
          <ul className="flex">
            <li className="nav-item mx-3">
              <Link
                className=" bg-white text-primary px-6 py-1 rounded-full"
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
