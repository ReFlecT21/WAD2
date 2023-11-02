import React from "react";
import ReactDOM from "react-dom";
import ProgressBar from "react-bootstrap/ProgressBar";
const AnalyticsHomePage = () => {
  const now = 60;
  return <ProgressBar now={now} label={`${now}%`} />;
};

export default AnalyticsHomePage;
