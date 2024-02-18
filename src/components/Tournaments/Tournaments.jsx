import React, { Component } from "react";
import { Link } from "react-router-dom";
import configs from "../../configs";

const API = configs.apiUrl + "/api/tournaments";
const DEVICE_API = configs.apiUrl + "/api/device";

class Tournaments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tournaments: [],
    };

    this.joinWithDeviceHandler = this.joinWithDeviceHandler.bind(this);
  }

  joinWithDeviceHandler(tournamentId) {
    console.log(tournamentId);
    const defaultDevice = localStorage.getItem("defaultDevice");
    fetch(DEVICE_API + "/" + defaultDevice, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ linkedMatch: tournamentId }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  componentDidMount() {
    fetch(API)
      .then((response) => response.json())
      .then((data) => this.setState({ tournaments: data.tournaments }));
  }

  render() {
    return (
      <div className="container mx-auto px-4" id="tournament-list">
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
