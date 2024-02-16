import { Component } from "react";
import "./CreateMatch.scss";
import configs from "../../configs";

/**
 * Create match form
 */
class CreateMatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: "Quick Match",
      stage: "quick",
      mode: "1",
      playerA: "",
      playerB: "",
      gameOf: "11",
      bestOf: "3",
      serves: "2",
      players: JSON.parse(localStorage.getItem("players")) || [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    console.log(this.state);
    event.preventDefault();
    fetch(configs.apiUrl + "/api/match", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(`${res.status}: ${res.statusText}`);
        }
      })
      .then((data) => this.props.history.push("/match/" + data.match.id))
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div className="container py-5">
        <form className="container" onSubmit={this.handleSubmit}>
          <h2>Create new Match</h2>
          <div className="row">
            <div className="col-8">
              <input
                name="event"
                label="Event"
                icon="trophy"
                required
                type="text"
                value={this.state.event}
                onChange={this.handleChange}
              />
              <input
                name="stage"
                label="Stage"
                icon="sitemap"
                type="text"
                value={this.state.stage}
                onChange={this.handleChange}
              />
              <div className="form-group">
                <div className="form-check form-check-inline">
                  <input
                    onChange={this.handleChange}
                    className="form-check-input"
                    type="radio"
                    name="mode"
                    id="mode1"
                    checked={this.state.mode === "1"}
                    value="1"
                  />
                  <label className="form-check-label" htmlFor="mode1">
                    Singles
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    onChange={this.handleChange}
                    className="form-check-input"
                    type="radio"
                    name="mode"
                    id="mode2"
                    value="2"
                  />
                  <label className="form-check-label" htmlFor="mode2">
                    Doubles
                  </label>
                </div>
              </div>
              <div className="p-3 mb-3 border border-leftplayer">
                <div className="form-group">
                  <label htmlFor="playerA">PlayerA:</label>
                  <select
                    name="playerA"
                    id="playerA"
                    onChange={this.handleChange}
                    className="form-control"
                    required
                  >
                    <option value="">Select Player</option>
                    {this.state.players.map((player) => (
                      <option value={player.id} key={player.id}>
                        {player.name}
                      </option>
                    ))}
                  </select>
                  <small className="form-text text-muted">
                    Use usernames example 'alex.j'.
                  </small>
                </div>
                {this.state.mode === "2" && (
                  <div className="form-group">
                    <label htmlFor="playerC">PlayerC:</label>
                    <select
                      name="playerC"
                      id="playerC"
                      onChange={this.handleChange}
                      className="form-control"
                    >
                      <option value="">Select Player</option>
                      {this.state.players.map((player) => (
                        <option value={player.id} key={player.id}>
                          {player.name}
                        </option>
                      ))}
                    </select>
                    <small className="form-text text-muted">
                      Use usernames example 'alex.j'.
                    </small>
                  </div>
                )}
              </div>
              <div className="p-3 mb-3 border border-rightplayer">
                <div className="form-group">
                  <label htmlFor="playerB">PlayerB:</label>
                  <select
                    name="playerB"
                    id="playerB"
                    onChange={this.handleChange}
                    className="form-control"
                    required
                  >
                    <option value="">Select Player</option>
                    {this.state.players.map((player) => (
                      <option value={player.id} key={player.id}>
                        {player.name}
                      </option>
                    ))}
                  </select>
                  <small className="form-text text-muted">
                    Use usernames example 'oleksii.p'.
                  </small>
                </div>
                {this.state.mode === "2" && (
                  <div className="form-group">
                    <label htmlFor="playerD">PlayerD:</label>
                    <select
                      name="playerD"
                      id="playerD"
                      onChange={this.handleChange}
                      className="form-control"
                    >
                      <option value="">Select Player</option>
                      {this.state.players.map((player) => (
                        <option value={player.id} key={player.id}>
                          {player.name}
                        </option>
                      ))}
                    </select>
                    <small className="form-text text-muted">
                      Use usernames example 'oleksii.p'.
                    </small>
                  </div>
                )}
              </div>
            </div>
            <div className="col-4">
              <label htmlFor="">
                Game of:{" "}
                <input
                  name="gameOf"
                  label="Game of"
                  icon="greater-than-equal"
                  type="number"
                  value={this.state.gameOf}
                  onChange={this.handleChange}
                />
              </label>{" "}
              <label htmlFor="">
                Best of:{" "}
                <input
                  name="bestOf"
                  label="Best of"
                  icon="gavel"
                  type="number"
                  value={this.state.bestOf}
                  onChange={this.handleChange}
                />
              </label>{" "}
              <label htmlFor="">
                Serves:{" "}
                <input
                  name="serves"
                  label="Serves"
                  icon="table-tennis"
                  type="number"
                  value={this.state.serves}
                  onChange={this.handleChange}
                />
              </label>{" "}
            </div>
          </div>

          <button color="primary" type="submit">
            Create Match
          </button>
        </form>
      </div>
    );
  }
}

export default CreateMatch;
