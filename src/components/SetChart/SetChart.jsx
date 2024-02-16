import React from "react";
import PropTypes from "prop-types";
// import NVD3Chart from 'react-nvd3';

const SetChart = ({ setScoreData }) => {
  return (
    <>
      {/* {React.createElement(NVD3Chart, {
        xAxis: {
          tickFormat: function (d) {
            return d;
          },
          axisLabel: 'Ball',
        },
        useInteractiveGuideline: true,
        yAxis: {
          tickFormat: function (d) {
            return d;
          },
          axisLabel: 'Score',
        },
        type: 'lineChart',
        datum: setScoreData,
        x: 'label',
        y: 'value',
        duration: 1,
        margin: {
          left: 45,
        },
        renderEnd: function () {
          console.log('renderEnd');
        },
      })} */}
    </>
  );
};

SetChart.propTypes = {};

export default SetChart;
