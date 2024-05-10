import { Component } from "react";
import { Link } from "react-router-dom";
import configs from "../../configs";

const API = configs.apiUrl + "/api/tournaments";

class Tournaments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tournaments: [],
    };
  }

  componentDidMount() {
    fetch(API)
      .then((response) => response.json())
      .then((data) => this.setState({ tournaments: data.tournaments }));
  }

  render() {
    return (
      <div className="main-container" id="tournament-list">
        <h1 className="h2">Tournaments</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.tournaments.map((tournament) => {
              return (
                <tr
                  key={tournament._id}
                  className={tournament.over ? "bg-light" : ""}
                >
                  <td>
                    <Link to={`/tournament/${tournament._id}`}>
                      {tournament.name}
                    </Link>
                  </td>
                  <td></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Tournaments;
