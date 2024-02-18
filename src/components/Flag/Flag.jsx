import PropTypes from "prop-types";

const Flag = ({ country, size = 64 }) => {
  if (!country) return "-/-";
  return (
    <div className="flag">
      <img
        height={size}
        src={`https://raw.githubusercontent.com/hampusborgos/country-flags/main/svg/${country}.svg`}
        alt={`Flag of ${country}`}
      />
    </div>
  );
};

Flag.propTypes = {
  country: PropTypes.string.isRequired,
  size: PropTypes.number,
};

export default Flag;
