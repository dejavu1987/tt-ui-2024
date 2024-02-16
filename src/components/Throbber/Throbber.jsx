import { Component } from "react";

import "./Throbber.scss";

/**
 * Basic throbber component
 *
 * Spinner with grow effect
 */
class Throbber extends Component {
  render() {
    return (
      <div className="throbber">
        <div
          className="spinner-grow text-primary text-center m-auto"
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
}

export default Throbber;
