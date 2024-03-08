import "./Versus.scss";

function Versus({
  players: { playerA, playerB, playerC, playerD },
  sets,
  winner,
}) {
  return (
    <div className="versus relative">
      <div className="relative lg:w-2/3 player-name text-white text-2xl leftplayer px-5 h3">
        <div className="player-name__content">
          {playerA}
          {playerC && " & " + playerC}
          <span className="mx-5 d-inline-block">
            {sets && <>[ {sets[0]} ]</>}
          </span>
          {typeof winner !== undefined && winner === 0 && (
            <i className="fa fas fa-crown text-yellow-500 mx-5"> </i>
          )}
        </div>
      </div>
      <div className="vs"></div>
      <div className="relative lg:w-2/3 lg:ml-auto player-name text-white rightplayer h3">
        <div className="player-name__content">
          {typeof winner !== undefined && winner === 1 && (
            <i className="fa fas fa-crown text-yellow-500  mx-5"> </i>
          )}
          <span className="mx-5 d-inline-block">
            {sets && <>[ {sets[1]} ]</>}
          </span>
          {playerB}
          {playerD && " & " + playerD}
        </div>
      </div>
    </div>
  );
}

export default Versus;
