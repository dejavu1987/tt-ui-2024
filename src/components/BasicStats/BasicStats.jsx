import PropTypes from "prop-types";
import StatCard from "./StatCard";

const BasicStats = ({ matchesCnt, wins, setWins }) => {
  return (
    <div className="flex text-center text-white gap-4">
      <StatCard label="Matches Played" value={matchesCnt.toString()} />
      <StatCard label="Matches Won" value={wins.toString()} />
      <StatCard label="Sets Won" value={setWins.toString()} />
    </div>
  );
};

BasicStats.propTypes = {
  matchesCnt: PropTypes.number.isRequired,
  wins: PropTypes.number.isRequired,
  setWins: PropTypes.number.isRequired,
};

export default BasicStats;
