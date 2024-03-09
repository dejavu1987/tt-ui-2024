import { useEffect, useState } from "react";
import Slider from "react-slick";
import BasicStats from "../../components/BasicStats/BasicStats";
import RateStats from "../../components/BasicStats/RateStats";
import PlayerInfo from "../../components/PlayerInfo/PlayerInfo";
import Versus from "../../components/Versus/Versus";
import configs from "../../configs";
import "./VersusPage.scss";

const VersusPage = ({ players }) => {
  const API = configs.apiUrl + "/api/player";

  const [loading, setLoading] = useState(true);
  const [playerA, setPlayerA] = useState({});
  const [playerB, setPlayerB] = useState({});

  useEffect(() => {
    (async () => {
      const [playerAResponse, playerBResponse] = await Promise.all([
        fetch(API + "/" + players.playerA),
        fetch(API + "/" + players.playerB),
      ]);

      const a = await playerAResponse.json();
      const b = await playerBResponse.json();
      console.log({ a, b });

      setPlayerA(a);
      setPlayerB(b);
      setLoading(false);
    })();
  }, [API]);

  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1920,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="page--versus">
      {!loading ? (
        <>
          <Versus
            players={{
              playerA: playerA.player.name,
              playerB: playerB.player.name,
            }}
          ></Versus>
          <div className="p-3">
            <div className="flex player-detail-cards gap-4">
              <div className="w-1/2">
                <div className="player-detail-card  bg-leftplayer">
                  <Slider {...settings}>
                    <div className="slide">
                      <PlayerInfo player={playerA.player}></PlayerInfo>
                    </div>
                    <div className="slide">
                      <h3>Basic Stats</h3>
                      <BasicStats
                        matchesCnt={playerA.stats.matchesCnt}
                        wins={playerA.stats.wins}
                        setWins={playerA.stats.setWins}
                      ></BasicStats>
                    </div>
                    <div className="slide">
                      <h3>Win rates</h3>
                      <RateStats
                        matchesCnt={playerA.stats.matchesCnt}
                        wins={playerA.stats.wins}
                        setWins={playerA.stats.setWins}
                        setLosses={playerA.stats.setLosses}
                        pointWins={
                          playerA.stats.pointsWon[
                            playerA.stats.pointsWon.length - 1
                          ]
                        }
                        pointLosses={
                          playerA.stats.pointsLost[
                            playerA.stats.pointsLost.length - 1
                          ]
                        }
                      ></RateStats>
                    </div>
                  </Slider>
                </div>
              </div>
              <div className="w-1/2">
                <div className="player-detail-card  bg-rightplayer">
                  <Slider {...settings}>
                    <div className="slide">
                      <PlayerInfo player={playerB.player}></PlayerInfo>
                    </div>
                    <div className="slide">
                      <h3>Basic Stats</h3>
                      <BasicStats
                        matchesCnt={playerB.stats.matchesCnt}
                        wins={playerB.stats.wins}
                        setWins={playerB.stats.setWins}
                      ></BasicStats>
                    </div>
                    <div className="slide">
                      <h3>Win rates</h3>
                      <RateStats
                        matchesCnt={playerB.stats.matchesCnt}
                        wins={playerB.stats.wins}
                        setWins={playerB.stats.setWins}
                        setLosses={playerB.stats.setLosses}
                        pointWins={
                          playerB.stats.pointsWon[
                            playerB.stats.pointsWon.length - 1
                          ]
                        }
                        pointLosses={
                          playerB.stats.pointsLost[
                            playerB.stats.pointsLost.length - 1
                          ]
                        }
                      ></RateStats>
                    </div>
                  </Slider>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default VersusPage;
