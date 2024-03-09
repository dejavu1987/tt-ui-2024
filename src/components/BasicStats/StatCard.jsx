import PropTypes from "prop-types";

const StatCard = ({ label, value }) => {
  return (
    <div className="mdb-col">
      <div className="mdb-card">
        <div className="mdb-card-header">{label}</div>
        <div className="mdb-card-body display-1 h2">{value}</div>
      </div>
    </div>
  );
};

StatCard.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default StatCard;
