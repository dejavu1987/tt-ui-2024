import { useEffect, useState } from "react";
import "slick-carousel/slick/slick.scss";
import "slick-carousel/slick/slick-theme.scss";
import "./Match.scss";
import { socketSubscriber } from "../../SocketSubscriber";
import configs from "../../configs";
import Throbber from "../Throbber/Throbber";
import t from "../../translations";
import MatchOver from "../MatchOver/MatchOver";
import { getPlayerName } from "../../helper";
import { MatchHeader } from "./MatchHeader";
import { useVoiceSynthesizer } from "../../hooks/SpeechSynthesizer";

const API = configs.apiUrl + "/api/match";
const UPDATE_API = configs.apiUrl + "/api/update-score";
const UNDO_UPDATE_API = configs.apiUrl + "/api/undo-update-score";

const headers = {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

const Match = ({ id }) => {
  const [match, setMatch] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const { voices, lang, selectedVoice, handleVoicesChange, speechSynth } =
    useVoiceSynthesizer();

  const incrementPlayerScore = (side) => {
    if (match.over) return;
    fetch(`${UPDATE_API}/${match.id}/${side}`, headers);
  };

  const undoLastScoreUpdate = () => {
    fetch(`${UNDO_UPDATE_API}/${match.id}`, headers);
  };

  useEffect(() => {
    const speakWelcome = (mtch) => {
      const shortLang = lang.substring(0, 2);
      speechSynth.text = mtch.serves.toString() === "0,0" ? mtch.event : "";
      speechSynth.text += ` ${mtch.players[0].name} ${
        mtch.mode === 2
          ? ` and ${t("and", shortLang)} ${mtch.players[2].name}`
          : ""
      } ${t("versus", shortLang)} `;
      speechSynth.text += ` ${
        mtch.players[1].name +
        (mtch.mode === 2
          ? ` ${t("and", shortLang)} ${mtch.players[3].name}`
          : "")
      }. `;

      // Who serves
      speechSynth.text += mtch.serves[0]
        ? `${mtch.players[mtch.serves[0] - 1].name} ${t("serves", shortLang)}!`
        : "Play to serve!";
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(speechSynth);
    };

    if (id) {
      console.log("Match id", id);
      console.log("Fetching match data from server...");

      fetch(`${API}/${id}`)
        .then((response) => {
          if (response.ok) return response.json();
          else throw new Error(`${response.status}: ${response.statusText}`);
        })
        .then((data) => {
          const match = data.match;
          setMatch(match);
          console.log("Fetched match data from server!");
          if (!match.over) {
            speakWelcome(match);
            console.log("joining match", match.id);
            socketSubscriber.socket.emit("join match", match.id);
          }
          setIsLoaded(true);
        })
        .catch((error) => {
          setError(error.message);
          setIsLoaded(true);
          console.log(error);
        });
    }

    return () => {
      console.log("Cleanup code");
    };
  }, [id]);

  useEffect(() => {
    socketSubscriber.addHandlers({
      "updated score": (mtch) => {
        if (!mtch.over) {
          const shortLang = lang.substring(0, 2);
          const servesMsg = mtch.serves[0]
            ? `${mtch.players[mtch.serves[0] - 1].name} ${t(
                "serves",
                shortLang
              )}`
            : t("Play to serve", shortLang);
          let scoreMsg;

          if (mtch.scores[0] || mtch.scores[1]) {
            if (mtch.serves[0] === 1) scoreMsg = mtch.scores.join(" ");
            else {
              scoreMsg = [...mtch.scores].reverse().join(" ");
            }
          } else {
            if (!mtch.serves[1]) {
              scoreMsg =
                mtch.sets[0] > mtch.sets[0]
                  ? `${mtch.players[0].name} has won the set`
                  : `${mtch.players[1].name} has won the set.`;
            } else {
              scoreMsg = "";
            }
          }

          speechSynth.text =
            (mtch.scores[1] === mtch.config.gameOf - 1 &&
            mtch.scores[0] === mtch.config.gameOf - 1
              ? "Deuce. "
              : "") + `${scoreMsg}, ${servesMsg}.`;
        } else {
          speechSynth.text = `Over! ${
            mtch.players[mtch.winner].name +
            (mtch.mode === 2
              ? " and " + mtch.players[mtch.winner + 2].name
              : "")
          } has won the ${mtch.stage} match of ${mtch.event} in best of ${
            mtch.config.bestOf
          } by ${mtch.sets[0]} ${mtch.sets[1]}.`;
        }

        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(speechSynth);

        setMatch(mtch);
      },
    });
  }, []);

  return isLoaded ? (
    !error ? (
      !match.over ? (
        <div className="score-board-wrap">
          <select
            className="announcer browser-default custom-select absolute bottom-2 left-2 max-w-64"
            onChange={handleVoicesChange}
            defaultValue={selectedVoice}
          >
            {voices.map((v, i) => (
              <option key={i.toString()} value={i}>
                {v.name} ({v.lang})
              </option>
            ))}
          </select>
          <MatchHeader
            event={match.event}
            stage={match.stage}
            gameOf={match.config?.gameOf}
            bestOf={match.config?.bestOf}
          />
          <div
            className="relative flex flex-col sm:flex-row w-full"
            id="scoreboard"
          >
            <div
              className={`relative w-full  px-0 border-leftplayer border-8 ${
                match.winner === 0 && "the-winner"
              }`}
              id="playerA"
              onClick={() => incrementPlayerScore("playerA")}
            >
              <div className="player-name text-white bg-leftplayer relative">
                {getPlayerName(0, match.players)}
                <svg
                  className="absolute left-0 bottom-0 w-1/2"
                  width="400"
                  height="10"
                  viewBox="0 0 400 10"
                  preserveAspectRatio="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <polygon
                    points="0,0 390,0 400,10 0,10"
                    className="fill-white"
                  />
                </svg>
              </div>
              <div className="current-points text-leftplayer">
                {match.scores[0]}{" "}
                {match.winner === 0 && (
                  <i className="fa fas fa-crown text-yellow-500"> </i>
                )}
              </div>
              <div className="sets-won text-white bg-leftplayer">
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
                      className="serves-left rounded-circle bg-primary"
                      key={i}
                    >
                      <i className="fa fas fa-table-tennis self-center"> </i>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div
              className={`relative w-full flex-column px-0 border-rightplayer border-8  ${
                match.winner === 1 && "the-winner"
              }`}
              id="playerB"
              onClick={() => incrementPlayerScore("playerB")}
            >
              <div className="player-name text-white bg-rightplayer text-right relative">
                {getPlayerName(1, match.players)}
                <svg
                  className="absolute right-0 bottom-0 w-1/2"
                  width="400"
                  height="10"
                  viewBox="0 0 400 10"
                  preserveAspectRatio="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <polygon
                    points="10,0 400,0 400,10 0,10"
                    className="fill-white"
                  />
                </svg>
              </div>
              <div className="current-points text-rightplayer">
                {match.scores[1]}{" "}
                {match.winner === 1 && (
                  <i className="fa fas fa-crown text-yellow-500"> </i>
                )}
              </div>
              <div className="sets-won text-white bg-rightplayer">
                {match.sets[1]}
              </div>
              {(match.serves[0] === 2 || match.serves[0] === 4) && (
                <div
                  className={
                    "flex server-wrap server-wrap--" +
                    (match.serves[0] === 2 ? "left" : "right")
                  }
                >
                  {new Array(match.serves[1]).fill().map((d, i) => (
                    <div
                      className="flex serves-left rounded-circle bg-primary"
                      key={i}
                    >
                      <i className="fa fas fa-table-tennis self-center"> </i>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div
            id="score-log"
            className="flex justify-left border-bottom p-4 overflow-auto"
          >
            <div
              className="fa fas fa-undo text-rightplayer py-3 pr-4"
              onClick={undoLastScoreUpdate}
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
};

export default Match;
