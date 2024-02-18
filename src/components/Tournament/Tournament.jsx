import React, { Component } from "react";
import configs from "../../configs";
import Matches from "../Matches/Matches";

const API = configs.apiUrl + "/api/tournament";

class Tournament extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tournament: {},
      ready: false,
      players: localStorage.getItem("players"),
    };
  }

  componentDidMount() {
    fetch(API + "/" + this.props.id)
      .then((response) => response.json())
      .then((data) =>
        this.setState({ tournament: data.tournament, ready: true })
      );
  }

  render() {
    const tm = this.state.tournament;
    return this.state.ready ? (
      <div className="container mx-auto px-4" id="tournament-list">
        <h1 className="h2">{tm.name || "Loading..."}</h1>
        <h5>{tm.mode === 2 ? "Doubles" : "Solo"}</h5>
        <hr />
        {/* Groups */}
        <div className="groups">
          <h5>Groups</h5>
          <div className="card-group">
            {tm.groups.map((group, i) => (
              <div className="card mx-1" key={i}>
                <div className="card-header">Group {i + 1}</div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    {group.map((team, j) => (
                      <li className="list-group-item text-center" key={j}>
                        {team[0]} & {team[1]}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* end Groups*/}
        <hr />
        {/* Matches Selection */}
        <div className="groups">
          <h5 className="mt-5">Group matches</h5>
          <div className="card-group">
            {tm.matchesSelection.map((group, i) => (
              <div className="card mx-1" key={i}>
                <div className="card-header">Group {i + 1} matches</div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    {group.map((team, j) => (
                      <li className="list-group-item text-center" key={j}>
                        <span className="text-primary">
                          {team[0].join(" & ")}
                        </span>{" "}
                        Vs{" "}
                        <span className="text-danger">
                          {team[1].join(" & ")}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
        <h5 className="pt-5">Results</h5>
        <Matches filters={{ tournament: tm._id }} hide={["event", "stage"]} />
        {/* end Matches Selection*/}
        <hr />
        <div>
          <h5>Eliminations</h5>
          {tm.eliminations}
        </div>
      </div>
    ) : (
      <div>Loading...</div>
    );
  }
}

export default Tournament;
