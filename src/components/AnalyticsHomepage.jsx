import React, { useEffect, useState, useRef } from "react";

import ProgressBar from "react-bootstrap/ProgressBar";
import { dbFoodMethods, dbUserMethods } from "../middleware/dbMethods";
import currDayCalculator from "../middleware/currDayCalculator";
const AnalyticsHomePage = ({ completedPlan }) => {
  const [DailyCal, setDailyCal] = useState(null);
  const [now, setNow] = useState(null);
  const [dailyIntake, setDailyIntake] = useState(0);
  var currDay = 0;
  if (completedPlan?.Completed) {
    currDay = currDayCalculator(completedPlan.CreatedAt);
    // FOR TESTING PURPOSES ONLY (NEED TO +1 )
  }

  const checkDaily = async () => {
    // console.log("yes");
    if (completedPlan?.Completed) {
      // console.log("check 1");
      let completed = completedPlan.Completed;
      // console.log(completed);
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
  useEffect(() => {
    const call = async () => {
      let temp1 = await dbUserMethods.getDayCal();
      setDailyIntake(temp1);
    };

    call();
  }, []);

  useEffect(() => {
    if (DailyCal !== null) {
      let temp2 = Math.floor((Number(DailyCal) / dailyIntake) * 100);
      if (temp2 > 95) {
        temp2 = 100;
      }
      setNow(temp2);
    }
  }, [DailyCal, dailyIntake]);

  // const calories = localStorage.getItem("calories");

  // dbUserMethods.getDayCal().then((res) => {
  //   setCalories(res);
  //   let temp = Math.floor((Number(DailyCal) / res) * 100)
  //   if (temp > 95) {
  //     temp = 100;
  //   }
  //   setNow(temp);

  // });

  // let now = Math.floor((Number(DailyCal) / calories) * 100);
  // if (now > 95) {
  //   now = 100;
  // }

  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <p>Daily Intake: {dailyIntake} calories</p>
      </div>

      <ProgressBar
        now={now}
        label={`${now}%`}
        style={{
          padding: "0px",
          width: "500px",
          height: "50px",
          borderRadius: "50px",
        }}
      />
    </div>
  );
};

export default AnalyticsHomePage;
