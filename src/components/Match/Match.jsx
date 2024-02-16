import React, { Component } from "react";
import "slick-carousel/slick/slick.scss";
import "slick-carousel/slick/slick-theme.scss";

import "./Match.scss";
import { socketSubscriber } from "../../SocketSubscriber";
import configs from "../../configs";
import Throbber from "../Throbber/Throbber";
import t from "../../translations";
import MatchOver from "../MatchOver/MatchOver";
import { getPlayerName } from "../../helper";

const API = configs.apiUrl + "/api/match";
const UPDATE_API = configs.apiUrl + "/api/update-score";
const UNDO_UPDATE_API = configs.apiUrl + "/api/undo-update-score";

class Match extends Component {
  selectedVoice = localStorage.getItem("selectedVoice") || 0;

  constructor(props) {
    super(props);

    this.state = {
      match: {},
      isLoaded: false,
      message: "",
      error: null,
      voices: [],
      lang: "en-US",
      selectedVoice: this.selectedVoice,
    };

    this.stat = {};

    this.speechSynth = new SpeechSynthesisUtterance();

    const populateVoiceList = () => {
      if (typeof speechSynthesis === "undefined") {
        return;
      }
      const voices = window.speechSynthesis.getVoices();

      console.log({ voices });
      this.state.voices = voices;
      this.state.lang = voices.length
        ? voices[this.selectedVoice].lang
        : "en-US";
      this.speechSynth.voice = voices[this.state.selectedVoice];
    };

    populateVoiceList();

    if (
      typeof speechSynthesis !== "undefined" &&
      speechSynthesis.onvoiceschanged !== undefined
    ) {
      speechSynthesis.onvoiceschanged = populateVoiceList;
    }

    this.handlePlayerAClick = this.handlePlayerAClick.bind(this);
    this.handleUndoClick = this.handleUndoClick.bind(this);

    this.socketSubscriber = socketSubscriber;
    this.socketSubscriber.addHandlers({
      "updated score": (match) => {
        if (!match.over) {
          const lang = this.state.lang.substr(0, 2);
          const servesMsg = match.serves[0]
            ? `${match.players[match.serves[0] - 1].name} ${t("serves", lang)}`
            : t("Play to serve", lang);
          let scoreMsg;

          if (match.scores[0] || match.scores[1]) {
            if (match.serves[0] === 1) scoreMsg = match.scores.join(" ");
            else {
              scoreMsg = [...match.scores].reverse().join(" ");
            }
          } else {
            if (!match.serves[1]) {
              scoreMsg =
                match.sets[0] > this.state.match.sets[0]
                  ? `${match.players[0].name} has won the set`
                  : `${match.players[1].name} has won the set.`;
            } else {
              scoreMsg = "";
            }
          }

          this.speechSynth.text =
            (match.scores[1] === match.config.gameOf - 1 &&
            match.scores[0] === match.config.gameOf - 1
              ? "Deuce. "
              : "") + `${scoreMsg}, ${servesMsg}.`;
        } else {
          this.speechSynth.text = `Over! ${
            match.players[match.winner].name +
            (match.mode === 2
              ? " and " + match.players[match.winner + 2].name
              : "")
          } has won the ${match.stage} match of ${match.event} in best of ${
            match.config.bestOf
          } by ${match.sets[0]} ${match.sets[1]}.`;
        }

        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(this.speechSynth);

        this.setState({ ...this.state, match: match });
      },
    });
  }

  handleVoicesChange = (e) => {
    const value = e.target.value;
    localStorage.setItem("selectedVoice", value);
    this.setState({
      ...this.state,
      selectedVoice: value,
      lang: this.state.voices[value].lang,
    });
    this.speechSynth.voice = this.state.voices[value];
  };

  speakWelcome() {
    const match = this.state.match;
    const players = match.players;
    this.speechSynth.text =
      match.serves.toString() === "0,0" ? match.event : "";

    const lang = this.state.lang.substr(0, 2);

    this.speechSynth.text += ` ${players[0].name} ${
      match.mode === 2 ? ` ${t("and", lang)} ${players[2].name}` : ""
    } ${t("versus", lang)} `;
    this.speechSynth.text += ` ${
      players[1].name +
      (match.mode === 2 ? ` ${t("and", lang)} ${players[3].name}` : "")
    }. `;
    console.log(this.speechSynth.text);
    this.speechSynth.text += match.serves[0]
      ? `${match.players[match.serves[0] - 1].name} ${t("serves", lang)}!`
      : "Play to serve!";

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(this.speechSynth);
  }

  handlePlayerAClick(event) {
    console.log(event);
    if (this.state.match.over) return;
    fetch(UPDATE_API + "/" + this.state.match.id + "/" + event, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ ...this.state, match: data, isLoaded: true });
      });
  }

  handleUndoClick(event) {
    fetch(UNDO_UPDATE_API + "/" + this.state.match.id, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ ...this.state, match: data, isLoaded: true });
      });
  }

  componentDidMount() {
    console.group("Component Did Mount");
    fetch(API + "/" + this.props.id)
      .then((response) => {
        if (response.ok) return response.json();
        else throw new Error(`${response.status}: ${response.statusText}`);
      })
      .then((data) => {
        const match = data.match;
        this.setState({ ...this.state, match: match });
        console.log("Fetched match data from server!");
        if (!match.over) {
          this.speakWelcome();
          console.log("joining match", this.state.match.id);
          this.socketSubscriber.socket.emit("join match", this.state.match.id);
        }
        this.setState({ ...this.state, isLoaded: true });
      })
      .catch((error) => {
        this.setState({ ...this.state, error: error.message, isLoaded: true });
        console.log(error);
      });

    console.groupEnd("Component Did MountEnd");
  }

  componentWillReceiveProps(nextProps, nextContext) {
    console.group("Component will receive props");
    console.log(nextProps);
    fetch(API + "/" + nextProps.id)
      .then((response) => {
        if (response.ok) return response.json();
        else throw new Error(`${response.status}: ${response.statusText}`);
      })
      .then((data) => {
        this.setState({ ...this.state, match: data.match, isLoaded: true });
        if (!data.match.over) {
          this.speakWelcome();

          console.log("joining match", this.state.match.id);
          this.socketSubscriber.socket.emit("join match", this.state.match.id);
        } else {
          //  may be do sth else
        }
      })
      .catch((error) => {
        this.setState({ ...this.state, error: error.message, isLoaded: true });
        console.log(error);
      });

    console.groupEnd("Component Did MountEnd");
  }

  render() {
    const { match, isLoaded, error, voices } = this.state;

    return isLoaded ? (
      !error ? (
        !match.over ? (
          <div className="score-board-wrap">
            <select
              className="announcer browser-default custom-select"
              onChange={this.handleVoicesChange}
              defaultValue={this.state.selectedVoice}
            >
              {voices.map((v, i) => (
                <option key={i.toString()} value={i}>
                  {v.name} ({v.lang})
                </option>
              ))}
            </select>
            <div className="d-flex align-items-center" id="match-details">
              <div className="col text-center">
                <h2 className="match-title h2">{match.event}</h2>
                <h4 className="match-stage">{match.stage}</h4>
                <h6 className="match-config">
                  Game of: {match.config && match.config.gameOf} | Best of{" "}
                  {match.config && match.config.bestOf}
                </h6>
              </div>
            </div>
            <div
              className="d-flex flex-column d-sm-flex flex-sm-row"
              id="scoreboard"
            >
              <div
                className={`relative col-12 col-sm-6 flex-column px-0 border-leftplayer border ${
                  match.winner === 0 && "the-winner"
                }`}
                id="playerA"
                onClick={() => this.handlePlayerAClick("playerA")}
              >
                <div className="player-name text-light h2 bg-leftplayer">
                  {getPlayerName(0, match.players)}
                </div>
                <div className="current-points text-leftplayer">
                  {match.scores[0]}{" "}
                  {match.winner === 0 && (
                    <i className="fa fas fa-crown text-warning"> </i>
                  )}
                </div>
                <div className="sets-won text-light bg-leftplayer">
                  {match.sets[0]}
                </div>
                {(match.serves[0] === 1 || match.serves[0] === 3) && (
                  <div
                    className={
                      "server-wrap server-wrap--" +
                      (match.serves[0] === 1 ? "left" : "right")
                    }
                  >
                    {new Array(match.serves[1]).fill().map((d, i) => (
                      <div
                        className="serves-left rounded-circle bg-info float-left mx-2"
                        key={i}
                      >
                        <i className="fa fas fa-table-tennis"> </i>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div
                className={`relative col-12 col-sm-6 flex-column px-0 border-rightplayer border  ${
                  match.winner === 1 && "the-winner"
                }`}
                id="playerB"
                onClick={() => this.handlePlayerAClick("playerB")}
              >
                <div className="player-name text-light bg-rightplayer h2 text-right">
                  {getPlayerName(1, match.players)}
                </div>
                <div className="current-points text-rightplayer">
                  {match.scores[1]}{" "}
                  {match.winner === 1 && (
                    <i className="fa fas fa-crown text-warning"> </i>
                  )}
                </div>
                <div className="sets-won text-light bg-rightplayer">
                  {match.sets[1]}
                </div>
                {(match.serves[0] === 2 || match.serves[0] === 4) && (
                  <div
                    className={
                      "server-wrap server-wrap--" +
                      (match.serves[0] === 2 ? "left" : "right")
                    }
                  >
                    {new Array(match.serves[1]).fill().map((d, i) => (
                      <div
                        className="serves-left rounded-circle bg-info float-right mx-2"
                        key={i}
                      >
                        <i className="fa fas fa-table-tennis"> </i>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div
              id="score-log"
              className="d-flex justify-content-left border-bottom p-4 overflow-auto"
            >
              <div
                className="fa fas fa-undo text-rightplayer py-3 pr-4"
                onClick={this.handleUndoClick}
              ></div>
              {match.scoreLog[match.sets[0] + match.sets[1]] &&
                match.scoreLog[match.sets[0] + match.sets[1]].map((side, i) => (
                  <div
                    className={`score-log bg-${
                      side === 0 ? "leftplayer" : "rightplayer"
                    }`}
                    key={i}
                  ></div>
                ))}
            </div>
          </div>
        ) : (
          <MatchOver match={match} />
        )
      ) : (
        <div className="text-center text-rightplayer">{error}</div>
      )
    ) : (
      <Throbber />
    );
  }
}

export default Match;
