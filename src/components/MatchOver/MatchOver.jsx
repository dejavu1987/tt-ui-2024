import { useHistory } from "react-router";
import Slider from "react-slick";
import Versus from "../Versus/Versus";
import MatchStats from "../MatchStats/MatchStats";
import { Threshold } from "../charts";
import configs from "../../configs";
import { getPlayerName } from "../../helper";

const MatchOver = ({ match }) => {
  const history = useHistory();
  const REMATCH_API = configs.apiUrl + "/api/rematch";
  const stats = {};

  stats.highestStreaks = [0, 0];
  stats.totalPoints = [0, 0];
  stats.highestDiff = [0, 0];

  match.scoreLog.forEach((setScoreLog, set) => {
    let scores = [0, 0];
    let chartValues = [[], []];
    let streak = [0, 0];
    let scoreDiff = 0;

    setScoreLog.forEach((side, i) => {
      const otherSide = side === 0 ? 1 : 0;
      scores[side]++;
      streak[otherSide] = 0;
      stats.totalPoints[side]++;
      streak[side]++;
      if (stats.highestStreaks[side] < streak[side])
        stats.highestStreaks[side] = streak[side];
      chartValues[0].push({ x: i + 1, y: scores[0] });
      chartValues[1].push({ x: i + 1, y: scores[1] });
      scoreDiff = scores[0] - scores[1];
      if (stats.highestDiff[0] < scoreDiff) {
        stats.highestDiff[0] = scoreDiff;
      }
      if (stats.highestDiff[1] > scoreDiff) {
        stats.highestDiff[1] = scoreDiff;
      }
    });

    stats.setScoreData = stats.setScoreData || [];
    stats.setScoreData[set] = [
      {
        values: chartValues[0],
        key: getPlayerName(0, match.players),
        color: "#44B3C2",
      },
      {
        values: chartValues[1],
        key: getPlayerName(1, match.players),
        color: "#E45641",
      },
    ];
  });

  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 500,
    centerMode: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1920,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 760,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const handleRematchClick = () => {
    console.log("Rematch!");
    if (!match.over) return;
    fetch(REMATCH_API + "/" + match.id, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        history.push("/match/" + data.match.id);
      });
  };

  return (
    <div id="match-stats">
      <div className="text-center">
        <div className="row flex items-center" id="match-details">
          <div className="col text-center">
            <h2 className="match-title h2">{match.event}</h2>
            <h4 className="match-stage">{match.stage}</h4>
            <h6 className="match-config">
              Game of: {match.config && match.config.gameOf} | Best of{" "}
              {match.config && match.config.bestOf}
            </h6>
          </div>
        </div>
      </div>
      <div className="player-names relative">
        {match.over && (
          <div
            className="rematch-btn fa fas fa-redo"
            title="Rematch"
            onClick={handleRematchClick}
          ></div>
        )}
        <Versus
          players={{
            playerA: match.players[0].name,
            playerB: match.players[1].name,
            playerC: match.players[2]?.name,
            playerD: match.players[3]?.name,
          }}
          sets={match.sets}
          winner={match.winner}
        />
      </div>
      <div className="charts p-3">
        <div>
          <Slider {...settings}>
            {match.scoreLog.map((scoreLog, set) => {
              const datum = stats.setScoreData[set][0].values.map((d, i) => {
                return {
                  i: d.x,
                  positive: d.y,
                  negative: stats.setScoreData[set][1].values[i].y,
                };
              });
              return (
                set < match.sets[0] + match.sets[1] && (
                  <div className="slide" key={set}>
                    <h3>Set {set + 1}</h3>

                    <Threshold
                      width={500}
                      height={300}
                      axisLabels={["Matches Won", "Matches Lost"]}
                      datum={datum}
                      colorP="#0FF"
                      colorN="#F55"
                    />
                  </div>
                )
              );
            })}
            <div className="slide statistics">
              <MatchStats
                sets={match.sets}
                playerLeft={getPlayerName(0, match.players)}
                playerRight={getPlayerName(1, match.players)}
                highestDiff={stats.highestDiff}
                highestStreaks={stats.highestStreaks}
                totalPoints={stats.totalPoints}
              />
            </div>
          </Slider>
        </div>
      </div>
    </div>
  );
};

MatchOver.propTypes = {};

export default MatchOver;
