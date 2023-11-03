import React, { useEffect, useState, useRef } from "react";

import ProgressBar from "react-bootstrap/ProgressBar";
import { dbFoodMethods } from "../middleware/dbMethods";
import currDayCalculator from "../middleware/currDayCalculator";
const AnalyticsHomePage = ({ completedPlan }) => {
  const [DailyCal, setDailyCal] = useState(0);
  var currDay = 0;
  if (completedPlan?.Completed) {
    currDay = currDayCalculator(completedPlan.CreatedAt) + 5;
    // FOR TESTING PURPOSES ONLY (NEED TO +1 )
  }
  const checkDaily = async () => {
    console.log("yes");
    if (completedPlan?.Completed) {
      console.log("check 1");
      let completed = completedPlan.Completed;
      console.log(completed);
      if (Object.keys(completed).length > 0) {
        if (
          completed[currDay - 1] &&
          Object.keys(completed[currDay - 1]).length == 3
        ) {
          await dbFoodMethods.updateDailyCal();
        }
      }
    }
    setDailyCal(await dbFoodMethods.getDayCal());
  };
  useEffect(() => {
    checkDaily();
  }, []);

  const calories = localStorage.getItem("calories");

  let now = Math.floor((Number(DailyCal) / calories) * 100);
  if (now > 95) {
    now = 100;
  }
  console.log(now);
  return <ProgressBar now={now} label={`${now}%`} />;
};

export default AnalyticsHomePage;
