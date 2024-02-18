import { Component } from "react";
import configs from "../../configs";
import Matches from "../Matches/Matches";
import Throbber from "../Throbber/Throbber";
// import NVD3Chart from "react-nvd3";
import Flag from "../Flag/Flag";

const API = configs.apiUrl + "/api/player";

class Player extends Component {
  constructor(props) {
    super(props);

    this.state = {
      player: {},
      stats: {},
      loaded: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleChange(event) {
    this.setState({
      player: {
        ...this.state.player,
        [event.target.name]: event.target.value,
      },
    });
  }

  handleSubmit(event) {
    console.log(this.state);
    event.preventDefault();
    fetch(API, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.player),
    })
      .then((res) => res.json())
      .then((data) => this.props.history.push("/players"));
  }

  handleEdit(event, player) {
    event.preventDefault();

    const newUuid = event.target.children[0].value;
    player.uuid = newUuid;

    fetch(configs.apiUrl + "/" + player.id, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(player),
    })
      .then((res) => res.json())
      .then((data) => this.props.history.push("/players"));
  }

  componentDidMount() {
    fetch(API + "/" + this.props.id)
      .then((response) => response.json())
      .then((data) => this.setState({ ...data, loaded: true }));
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({ loaded: false });
    fetch(API + "/" + nextProps.id)
      .then((response) => response.json())
      .then((data) => this.setState({ ...data, loaded: true }));
  }

  render() {
    const player = this.state.player;
    const stats = this.state.stats;
    return this.state.loaded ? (
      <div className="p-2" id="player-info">
        <div className="md:flex items-end gap-4">
          <div className="md:w-1/2">
            <img
              className="mt-4 pt-3"
              src={
                player.photo ||
                "https://res.cloudinary.com/anilmaharjan-com-np/image/upload/v1708244355/tt-pp.png"
              }
              alt=""
              width="100%"
            />
          </div>
          <div className="md:w-1/2">
            <h1 className="h2 text-8xl mt-5">{player.fullName}</h1>
            <ul className="text-lg">
              <li className="flex gap-2 my-2">
                <span className="text-6xl uppercase">{player.nationality}</span>
                <Flag country={player.nationality} size={32} />
              </li>
              <li>
                <b>Profession: </b>
                {player.profession}
              </li>
              <li>
                <b>Style: </b>-/-
              </li>

              <li>
                <b>Age: </b>-/-
              </li>
              <li>
                <b>Inviqa Ranking: </b>-/-
              </li>
              <li>
                <b>Hobbies: </b>
                {player.hobbies}
              </li>
            </ul>
            <div className="mt-5">
              <h3 className="text-2xl">Basic Stats</h3>
              <div className="flex justify-between w-full mt-4 text-center">
                <div>
                  <div className="text-primary">
                    <div>Matches Played</div>
                    <div className="display-1 h1">{stats.matchesCnt}</div>
                  </div>
                </div>
                <div>
                  <div className="text-success">
                    <div>Matches Won</div>
                    <div className="display-1 h1">{stats.wins}</div>
                  </div>
                </div>
                <div>
                  <div>
                    <div>Sets Won</div>
                    <div className="display-1 h1">{stats.setWins}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <div lg="8">
            <h3>Match Won vs Lost</h3>
            {/* {React.createElement(NVD3Chart, {
              xAxis: {
                tickFormat: function (d) {
                  return d;
                },
                axisLabel: "Matches",
              },
              useInteractiveGuideline: true,
              type: "linePlusBarChart",
              datum: [
                {
                  key: "Win vs Loss",
                  bar: true,
                  color: "#0080a0",
                  values: stats.winLog.map((d, i) => [i, d]),
                },
                {
                  key: "Matches Won",
                  color: "#28a745",
                  values: stats.matchesWon.map((d, i) => [i, d]),
                },
                {
                  key: "Matches Lost",
                  color: "#d22d16",
                  values: stats.matchesLost.map((d, i) => [i, d]),
                },
              ],
              x: (d) => d[0] + 1,
              y: (d) => d[1],
              duration: 300,
              margin: {
                left: 45,
              },
              renderEnd: function () {
                console.log("renderEnd");
              },
            })} */}
          </div>
          <div lg="4">
            {/* {React.createElement(NVD3Chart, {
              useInteractiveGuideline: true,
              type: "pieChart",
              datum: [
                ["Matches Won", stats.wins, "#28a745"],
                ["Matches Lost", stats.lost, "#d22d16"],
              ],
              color: (d) => d[2],
              x: (d) => d[0],
              y: (d) => d[1],
              transitionDuration: 300,
              renderEnd: function () {
                console.log("renderEnd");
              },
            })} */}
          </div>
        </div>
        <div className="pt-5">
          <div lg="6">
            <h3>Sets Won vs Lost</h3>
            {/* {React.createElement(NVD3Chart, {
              xAxis: {
                tickFormat: function (d) {
                  return d;
                },
                axisLabel: "Matches",
              },
              useInteractiveGuideline: true,
              yAxis: {
                tickFormat: function (d) {
                  return d;
                },
                axisLabel: "Wins",
              },
              type: "linePlusBarChart",
              datum: [
                {
                  bar: true,
                  color: "#0080a0",
                  key: "Sets Win vs Loss",
                  values: stats.setLog.map((d, i) => [i, d]),
                },
                {
                  key: "Sets won",
                  color: "#28a745",
                  values: stats.setWinLog.map((d, i) => [i, d]),
                },
                {
                  key: "Sets lost",
                  color: "#d22d16",
                  values: stats.setLossLog.map((d, i) => [i, d]),
                },
              ],
              x: (d) => d[0],
              y: (d) => d[1],
              duration: 1,
              margin: {
                left: 45,
              },
              renderEnd: function () {
                console.log("renderEnd");
              },
            })} */}
            <hr />
            {/* {React.createElement(NVD3Chart, {
              xAxis: {
                tickFormat: function (d) {
                  return d;
                },
                axisLabel: "Matches",
              },
              useInteractiveGuideline: true,
              yAxis: {
                tickFormat: function (d) {
                  return d;
                },
                axisLabel: "Set Wins vs Losses",
              },
              type: "pieChart",
              datum: [
                ["Sets Won", stats.setWins, "#28a745"],
                ["Sets Lost", stats.setLosses, "#d22d16"],
              ],
              color: (d) => d[2],
              x: (d) => d[0],
              y: (d) => d[1],
              duration: 1,
              margin: {
                left: 45,
              },
              renderEnd: function () {
                console.log("renderEnd");
              },
            })} */}
          </div>
          <div lg="6">
            <h3>Points won vs lost</h3>
            {/* {React.createElement(NVD3Chart, {
              xAxis: {
                tickFormat: function (d) {
                  return d;
                },
                axisLabel: "Matches",
              },
              useInteractiveGuideline: true,
              yAxis: {
                tickFormat: function (d) {
                  return d;
                },
                axisLabel: "Wins",
              },
              type: "linePlusBarChart",
              datum: [
                {
                  key: "Points Win vs Loss",
                  bar: true,
                  color: "#0080a0",
                  values: stats.points.map((d, i) => [i + 1, d]),
                },
                {
                  key: "Points Won",
                  color: "#28a745",
                  values: stats.pointsWon.map((d, i) => [i + 1, d]),
                },
                {
                  key: "Points Lost",
                  color: "#d22d16",
                  values: stats.pointsLost.map((d, i) => [i + 1, d]),
                },
              ],
              x: (d) => d[0],
              y: (d) => d[1],
              duration: 1,
              focusable: false,
              margin: {
                left: 45,
              },
              renderEnd: function () {
                console.log("renderEnd");
              },
            })} */}
            <hr />
            {/* {React.createElement(NVD3Chart, {
              xAxis: {
                tickFormat: function (d) {
                  return d;
                },
                axisLabel: "Matches",
              },
              useInteractiveGuideline: true,
              yAxis: {
                tickFormat: function (d) {
                  return d;
                },
                axisLabel: "Points Wins vs Losses",
              },
              type: "pieChart",
              datum: [
                ["Points Won", stats.currentPointsWon, "#28a745"],
                ["Points Lost", stats.currentPointsLost, "#d22d16"],
              ],
              x: (d) => d[0],
              y: (d) => d[1],
              duration: 1,
              color: (d) => d[2],
              margin: {
                left: 45,
              },
              renderEnd: function () {
                console.log("renderEnd");
              },
            })} */}
          </div>
        </div>
        <div className="row pt-5">
          <div className="col">
            <h3>Matches</h3>
            <Matches filters={{ player: player._id }} />
          </div>
        </div>
      </div>
    ) : (
      <Throbber />
    );
  }
}

export default Player;
