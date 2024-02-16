import React from 'react';
import PropTypes from 'prop-types';

const Flag = ({ country, size = 64 }) => {
  if (!country) return '-/-';
  return (
    <div className="flag">
      <img
        src={`https://www.countryflags.io/${country}/shiny/${size}.png`}
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
