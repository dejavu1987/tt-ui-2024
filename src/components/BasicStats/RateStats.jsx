import PropTypes from "prop-types";
import StatCard from "./StatCard";

const RateStats = ({
  matchesCnt,
  wins,
  setWins,
  setLosses,
  pointWins,
  pointLosses,
}) => {
  console.log({ pointWins, pointLosses });

  return (
    <div className="mdb-row text-center text-white">
      <StatCard
        label="Matches"
        value={`${Math.round((wins / matchesCnt) * 100)}%`}
      />
      <StatCard
        label="Sets"
        value={`${Math.round((setWins / (setWins + setLosses)) * 100)}%`}
      />
      <StatCard
        label="Points"
        value={`${Math.round((pointWins / (pointWins + pointLosses)) * 100)}%`}
      />
    </div>
  );
};

RateStats.propTypes = {
  matchesCnt: PropTypes.number.isRequired,
  wins: PropTypes.number.isRequired,
  setWins: PropTypes.number.isRequired,
};

export default RateStats;
