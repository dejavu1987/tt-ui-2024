import React from 'react';
import './Versus.scss';

function Versus({
  players: { playerA, playerB, playerC, playerD },
  sets,
  winner,
}) {
  return (
    <div className="versus position-relative">
      <div className="col-lg-7 player-name text-light h2 leftplayer px-5">
        <div className="player-name__content">
          {playerA}
          {playerC && ' & ' + playerC}
          <span className="mx-5 d-inline-block">
            {sets && <>[ {sets[0]} ]</>}
          </span>
          {typeof winner !== undefined && winner === 0 && (
            <i className="fa fas fa-crown text-warning mx-5"> </i>
          )}
        </div>
      </div>
      <div className="vs"></div>
      <div className="col-lg-7 offset-lg-5 player-name text-light rightplayer h2">
        <div className="player-name__content">
          {typeof winner !== undefined && winner === 1 && (
            <i className="fa fas fa-crown text-warning  mx-5"> </i>
          )}
          <span className="mx-5 d-inline-block">
            {sets && <>[ {sets[1]} ]</>}
          </span>
          {playerB}
          {playerD && ' & ' + playerD}
        </div>
      </div>
    </div>
  );
}

export default Versus;
