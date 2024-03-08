import { useEffect, useState } from "react";
import configs from "../../configs";
import Matches from "../Matches/Matches";
import Throbber from "../Throbber/Throbber";
import Flag from "../Flag/Flag";
import { Threshold } from "../charts";

const API = configs.apiUrl + "/api/player";

const Player = ({ id }) => {
  const [playerState, setPlayerState] = useState({
    player: {},
    stats: {},
    loaded: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API + "/" + id);
        const data = await response.json();
        setPlayerState({ ...data, loaded: true });
      } catch (error) {
        console.error("Error fetching player data:", error);
      }
    };

    fetchData();

    return () => {
      // Cleanup if needed
    };
  }, [id]);

  return playerState.loaded ? (
    <div className="p-2 mx-auto container" id="player-info">
      <div className="md:flex items-end gap-4">
        <div className="md:w-1/2">
          <img
            className="mt-4 pt-3"
            src={
              playerState.player.photo ||
              "https://res.cloudinary.com/anilmaharjan-com-np/image/upload/v1708244355/tt-pp.png"
            }
            alt=""
            width="100%"
          />
        </div>
        <div className="md:w-1/2 p-2">
          <h1 className="h2 text-8xl mt-5">{playerState.player.fullName}</h1>
          <ul className="text-lg">
            {playerState.player.nationality && (
              <li className="flex gap-2 my-2 items-center">
                <span className="text-6xl uppercase">
                  {playerState.player.nationality}
                </span>
                <Flag country={playerState.player.nationality} size={64} />
              </li>
            )}

            {playerState.player.profession && (
              <li>
                <b>Profession: </b>
                {playerState.player.profession}
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
            {playerState.player.hobbies && (
              <li>
                <b>Hobbies: </b>
                {playerState.player.hobbies}
              </li>
            )}
          </ul>
          <div className="mt-5">
            <h3 className="text-2xl">Basic Stats</h3>
            <div className="flex gap-2 w-full mt-4 text-center">
              <div className="border w-full rounded-md p-4 text-primary">
                <div className="md:text-[1.5vw] text-nowrap">
                  Matches Played
                </div>
                <div className="text-[10vw]">
                  {playerState.stats.matchesCnt}
                </div>
              </div>

              <div className="border w-full rounded-md p-4 text-success">
                <div className="md:text-[1.5vw] text-nowrap">Matches Won</div>
                <div className="text-[10vw]">{playerState.stats.wins}</div>
              </div>

              <div className="border w-full rounded-md p-4 text-green-800">
                <div className="md:text-[1.5vw] text-nowrap">Sets Won</div>
                <div className="text-[10vw]">{playerState.stats.setWins}</div>
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
              datum={playerState.stats.matchesWon.map((d, i) => ({
                i,
                positive: d,
                negative: playerState.stats.matchesLost[i],
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
            datum={playerState.stats.setWinLog.map((d, i) => ({
              i,
              positive: d,
              negative: playerState.stats.setLossLog[i],
            }))}
          />
        </div>
        <div className="lg:w-2/3">
          <h3>Points won vs lost</h3>
          <Threshold
            width={500}
            height={300}
            axisLabels={["Points Won", "Points Lost"]}
            datum={playerState.stats.pointsWon.map((d, i) => ({
              i,
              positive: d,
              negative: playerState.stats.pointsLost[i],
            }))}
          />
        </div>
      </div>

      <div className="row pt-5">
        <div className="col">
          <Matches filters={{ player: playerState.player._id }} />
        </div>
      </div>
    </div>
  ) : (
    <Throbber />
  );
};
export default Player;
