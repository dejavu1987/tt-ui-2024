import { Component } from "react";
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
      <div
        className="container mx-auto px-4 flex flex-col space-y-4"
        id="tournament-list"
      >
        <h1 className="h2">{tm.name || "Loading..."}</h1>
        <h3>Mode: {tm.mode === 2 ? "Doubles" : "Solo"}</h3>
        <div className="groups">
          <h2 className="text-xl">Groups</h2>
          <div className="flex ">
            {tm.groups.map((group, i) => (
              <div className="card mx-1 border rounded-md p-4" key={i}>
                <div className="card-header font-bold text-lg">
                  Group {i + 1}
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    {group.map((team, j) => (
                      <li className="list-group-item text-center" key={j}>
                        {tm.mode === 2 ? `${team[0]} & ${team[1]}` : team}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Matches Selection */}
        <div className="groups">
          <h5 className="text-xl">Group matches</h5>
          <div className="card-group flex">
            {tm.matchesSelection.map((group, i) => (
              <div className="card mx-1 border p-4 rounded-md" key={i}>
                <div className="card-header font-bold text-lg">
                  Group {i + 1} matches
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    {group.map((team, j) => (
                      <li className="list-group-item text-center" key={j}>
                        <span className="text-primary">
                          {tm.mode === 2 ? team[0].join(" & ") : team[0]}
                        </span>{" "}
                        Vs{" "}
                        <span className="text-secondary">
                          {tm.mode === 2 ? team[1].join(" & ") : team[1]}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
        <h5 className="pt-5 text-xl">Results</h5>
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
