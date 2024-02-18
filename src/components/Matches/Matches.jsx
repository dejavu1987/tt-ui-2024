import { Component } from "react";
import "./Matches.scss";
import { Link } from "react-router-dom";
import configs from "../../configs";
import { DateTime } from "luxon";
import ErrorBoundary from "../ErrorBoundary";
import Throbber from "../Throbber/Throbber";

const API = configs.apiUrl + "/api/matches";
const MATCH_API = configs.apiUrl + "/api/match";
const DEVICE_API = configs.apiUrl + "/api/device";

/**
 * Lists matches
 */
class Matches extends Component {
  constructor(props) {
    super(props);

    this.state = {
      matches: [],
      loaded: false,
      admin: false,
    };

    this.joinWithDeviceHandler = this.joinWithDeviceHandler.bind(this);
    this.deleteMatchHandler = this.deleteMatchHandler.bind(this);
  }

  joinWithDeviceHandler(matchId) {
    console.log(matchId);
    const defaultDevice = localStorage.getItem("defaultDevice");
    fetch(DEVICE_API + "/" + defaultDevice, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ linkedMatch: matchId }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  deleteMatchHandler(matchId) {
    console.log(matchId);
    if (window.confirm("Sure you want to delete match?")) {
      fetch(MATCH_API + "/" + matchId, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.deleted) {
            this.setState({
              matches: [...this.state.matches].filter(
                (match) => match.id !== matchId
              ),
            });
          }
        });
    }
  }

  componentDidMount() {
    const url = new URL(API),
      params = this.props.filters;
    console.log(params);
    if (params) {
      Object.keys(params).forEach((key) =>
        url.searchParams.append(key, params[key])
      );
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => this.setState({ matches: data.matches, loaded: true }));
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const url = new URL(API),
      params = nextProps.filters;
    if (params) {
      Object.keys(params).forEach((key) =>
        url.searchParams.append(key, params[key])
      );
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => this.setState({ matches: data.matches, loaded: true }));
  }

  render() {
    return this.state.loaded ? (
      <ErrorBoundary>
        <table className="table table-auto matches-table w-full">
          <thead>
            <tr className="">
              <th>Date</th>
              {(!this.props.hide ||
                this.props.hide.indexOf("event") === -1) && <th>Event</th>}
              {(!this.props.hide ||
                this.props.hide.indexOf("stage") === -1) && <th>Stage</th>}
              <th className="text-center">Players</th>
              <th className="text-center">Players</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.matches.map((match) => (
              <tr
                key={match.id}
                className={match.over ? "match-over" : "match-active"}
              >
                <td className="card-header-sm  text-center md:text-left">
                  <Link to={`/match/${match.id}`}>
                    <span className="d-inline d-md-none">
                      {match.event} / {match.stage} on{" "}
                    </span>
                    {DateTime.fromISO(match.created).toLocaleString(
                      DateTime.DATETIME_MED
                    )}
                  </Link>
                </td>
                {(!this.props.hide ||
                  this.props.hide.indexOf("event") === -1) && (
                  <td className="align-middle d-none d-md-table-cell font-weight-bold">
                    {match.tournament ? (
                      <Link to={`/tournament/${match.tournament}`}>
                        {match.event}
                      </Link>
                    ) : (
                      match.event
                    )}
                  </td>
                )}
                {(!this.props.hide ||
                  this.props.hide.indexOf("stage") === -1) && (
                  <td className="align-middle">{match.stage}</td>
                )}
                <td className="align-middle player-left text-leftplayer  d-block d-md-table-cell">
                  <div className="flex justify-between">
                    <div className="flex-grow-1 text-center">
                      <Link to={`/player/${match.players[0].id}`}>
                        {match.players[0].name}
                      </Link>
                      {match.players[2] && (
                        <span>
                          {" "}
                          &{" "}
                          <Link to={`/player/${match.players[2].id}`}>
                            {match.players[2].name}
                          </Link>
                        </span>
                      )}
                    </div>
                    <div className="text-right matches-score bg">
                      {match.winner === 0 && (
                        <i className="fa fas fa-crown text-warning"> </i>
                      )}
                      {match.over && `[${match.sets[0]}]`}
                    </div>
                  </div>
                </td>
                <td className="align-middle player-right text-rightplayer  d-block d-md-table-cell">
                  <div className="flex justify-between">
                    <div className="text-left matches-score">
                      {match.over && `[${match.sets[1]}]`}
                      {match.winner === 1 && (
                        <i className="fa fas fa-crown text-warning"> </i>
                      )}
                    </div>
                    <div className="flex-grow-1 text-center">
                      <Link to={`/player/${match.players[1].id}`}>
                        {match.players[1].name}
                      </Link>
                      {match.players[3] && (
                        <span>
                          {" "}
                          &{" "}
                          <Link to={`/player/${match.players[3].id}`}>
                            {match.players[3].name}
                          </Link>
                        </span>
                      )}
                    </div>
                  </div>
                </td>
                <td className="align-middle actions">
                  {!match.over && (
                    <button
                      onClick={() => this.joinWithDeviceHandler(match.id)}
                      title="Join with device!"
                      size="sm"
                      className="fa fas fa-plug text-light dot"
                    ></button>
                  )}
                  {this.state.admin && (
                    <button
                      onClick={() => this.deleteMatchHandler(match.id)}
                      size="sm"
                      color="danger"
                      className="fa fas fa-trash text-light dot"
                    ></button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </ErrorBoundary>
    ) : (
      <Throbber />
    );
  }
}

export default Matches;
