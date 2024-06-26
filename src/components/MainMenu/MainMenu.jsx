import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";
import { useState } from "react";
import { NavLink as Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

function MainMenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <CSSTransition
        in={menuOpen}
        timeout={500}
        className="animate__animated main-menu animate__faster fixed z-50 top-0 right-0 w-full max-w-96 bg-primary text-white px-6 py-3 h-full"
        classNames={{
          enterActive: "animate__slideInRight",
          exitActive: "animate__slideOutRight",
        }}
        unmountOnExit
      >
        <nav>
          <div className="close fixed top-0 right-0 mt-3 mr-3">
            <button
              className="close-btn text-xl px-4"
              onClick={() => setMenuOpen(false)}
            >
              <i className="fa fa-times"></i>
            </button>
          </div>
          <h1 className="logo pt-2 pb-28 text-3xl">
            <Link to="/">
              <i className="fa fa-table-tennis"></i> PiMP
            </Link>
          </h1>
          <ul className="flex flex-col mr-auto">
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/"
                activeClassName="active"
                exact={true}
              >
                Matches
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
              <Link
                className="nav-link"
                to="/tournaments"
                activeClassName="active"
              >
                Tournaments
              </Link>
            </li>
            <li className="nav-item mt-20">
              <Link
                className=" bg-white text-primary px-6 py-4 rounded-full block hover:bg-opacity-90 mb-2"
                to="/create-match"
                activeClassName="active"
              >
                <i className="fa fa-plus mr-4"></i>
                Create New Match
              </Link>
            </li>
          </ul>
          <SignedIn>
            <UserButton afterSignOutUrl={window.location.href} />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal" />
          </SignedOut>
        </nav>
      </CSSTransition>
      <CSSTransition
        in={!menuOpen}
        timeout={300}
        className="animate__animated menu-btn button fixed z-50 right-2 bottom-2 m-3 w-12 h-12 bg-primary text-white rounded-full text-2xl"
        classNames={{
          enterActive: "animate__bounceIn",
          exitActive: "animate__bounceOut",
        }}
        unmountOnExit
      >
        <button onClick={() => setMenuOpen(true)}>
          <i className="fa fa-bars"></i>
        </button>
      </CSSTransition>
    </>
  );
}

export default MainMenu;
