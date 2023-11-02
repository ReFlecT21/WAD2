import React from "react";
import ReactDOM from "react-dom";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useAtom } from "jotai";
import { Kcal } from "../atoms/KcalAtom";
const AnalyticsHomePage = ({ DayCal }) => {
  console.log(DayCal);
  const calories = localStorage.getItem("calories");

  const now = Math.floor((Number(DayCal) / calories) * 100);

  console.log(now);
  return <ProgressBar now={now} label={`${now}%`} />;
};

export default AnalyticsHomePage;
