import { Component } from "react";
import configs from "../../configs";
import Matches from "../Matches/Matches";
import Throbber from "../Throbber/Throbber";
import Flag from "../Flag/Flag";
import { Threshold } from "../charts";

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
    console.log("stats", stats);

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
              {player.nationality && (
                <li className="flex gap-2 my-2 items-center">
                  <span className="text-6xl uppercase">
                    {player.nationality}
                  </span>
                  <Flag country={player.nationality} size={64} />
                </li>
              )}

              {player.profession && (
                <li>
                  <b>Profession: </b>
                  {player.profession}
                </li>
              )}

              {/* <li>
                <b>Style: </b>-/-
              </li>

              <li>
                <b>Age: </b>-/-
              </li>
              <li>
                <b>Inviqa Ranking: </b>-/-
              </li> */}
              {player.hobbies && (
                <li>
                  <b>Hobbies: </b>
                  {player.hobbies}
                </li>
              )}
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
        <div className="flex gap-2 mt-5">
          <div className="lg:w-2/3">
            <div>
              <h3>Match Won vs Lost</h3>
              <Threshold
                width={500}
                height={300}
                axisLabels={["Matches Won", "Matches Lost"]}
                datum={stats.matchesWon.map((d, i) => ({
                  i,
                  positive: d,
                  negative: stats.matchesLost[i],
                }))}
              />
            </div>
          </div>
          <div className="lg:w-2/3">
            <h3>Sets Won vs Lost</h3>
            <Threshold
              width={500}
              height={300}
              axisLabels={["Sets Won", "Sets Lost"]}
              datum={stats.setWinLog.map((d, i) => ({
                i,
                positive: d,
                negative: stats.setLossLog[i],
              }))}
            />
          </div>
          <div className="lg:w-2/3">
            <h3>Points won vs lost</h3>
            <Threshold
              width={500}
              height={300}
              axisLabels={["Points Won", "Points Lost"]}
              datum={stats.pointsWon.map((d, i) => ({
                i,
                positive: d,
                negative: stats.pointsLost[i],
              }))}
            />
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
