const MatchStats = ({
  sets,
  playerLeft,
  playerRight,
  highestDiff,
  highestStreaks,
  totalPoints,
}) => {
  return (
    <table className="table-auto">
      <thead>
        <tr>
          <th>Stats</th>
          <th className="bg-leftplayer text-white">{playerLeft}</th>
          <th className="bg-rightplayer text-white">{playerRight}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>Highest Streak</th>
          <td>
            {highestStreaks[0]}{" "}
            {highestStreaks[0] > highestStreaks[1] && (
              <i className="fa fas fa-crown text-yellow-500"> </i>
            )}
          </td>
          <td>
            {highestStreaks[1]}{" "}
            {highestStreaks[1] > highestStreaks[0] && (
              <i className="fa fas fa-crown text-yellow-500"> </i>
            )}
          </td>
        </tr>
        <tr>
          <th>Total Points won</th>
          <td>
            {totalPoints[0]}{" "}
            {totalPoints[0] > totalPoints[1] && (
              <i className="fa fas fa-crown text-yellow-500"> </i>
            )}
          </td>
          <td>
            {totalPoints[1]}{" "}
            {totalPoints[1] > totalPoints[0] && (
              <i className="fa fas fa-crown text-yellow-500"> </i>
            )}
          </td>
        </tr>
        <tr>
          <th>Sets won</th>
          <td>
            {sets[0]}{" "}
            {sets[0] > sets[1] && (
              <i className="fa fas fa-crown text-yellow-500"> </i>
            )}
          </td>
          <td>
            {sets[1]}{" "}
            {sets[1] > sets[0] && (
              <i className="fa fas fa-crown text-yellow-500"> </i>
            )}
          </td>
        </tr>
        <tr>
          <th>Highest point difference in advantage</th>
          <td>
            {highestDiff[0]}{" "}
            {highestDiff[0] > Math.abs(highestDiff[1]) && (
              <i className="fa fas fa-crown text-yellow-500"> </i>
            )}
          </td>
          <td>
            {Math.abs(highestDiff[1])}{" "}
            {Math.abs(highestDiff[1]) > highestDiff[0] && (
              <i className="fa fas fa-crown text-yellow-500"> </i>
            )}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

MatchStats.propTypes = {};

export default MatchStats;
