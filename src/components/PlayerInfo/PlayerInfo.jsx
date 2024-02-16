import React from 'react';
import PropTypes from 'prop-types';
import Flag from '../Flag/Flag';

const PlayerInfo = ({ player }) => {
  return (
    <div>
      <h1 className="display-1">{player.name}</h1>
      <hr />
      <table className="table table-striped table-hover">
        <tbody>
          <tr>
            <th>Nationality</th>
            <td>
              {player.nationality && (
                <Flag country={player.nationality} size="64" />
              )}
            </td>
          </tr>
          <tr>
            <th>Profession</th>
            <td>{player.profession}</td>
          </tr>
          <tr>
            <th>Hobbies</th>
            <td>{player.hobbies}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

PlayerInfo.propTypes = {
  player: PropTypes.object,
};

export default PlayerInfo;
