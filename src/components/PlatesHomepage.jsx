import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";

const PlatesHomepage = ({ currMealPlan }) => {
  const [colorArray, setColorArray] = useState(null);
  // console.log(currMealPlan);
  useEffect(() => {
    // console.log("yes");
    // console.log(currMealPlan);
    if (currMealPlan?.mealPlan) {
      // console.log("check 2");
      const data = currMealPlan.mealPlan;

      // console.log(data);
      const colors = Object.values(data).map((obj) => {
        // Count the number of non-empty meals in the object
        const nonEmptyMeals = Object.values(obj).filter(
          (meal) => Object.keys(meal).length > 0
        ).length;

        if (nonEmptyMeals === 0) {
          return "green";
        } else if (nonEmptyMeals === 1) {
          return "yellow1";
        } else if (nonEmptyMeals === 2) {
          return "yellow2";
        } else {
          return "grey";
        }
      });
      setColorArray(colors);
    }
  }, []);
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      {colorArray &&
        colorArray.map((color, i) => {
          let imgSrc = "";
          let complete = "";
          switch (color) {
            case "grey":
              imgSrc = "/greyPlate.png";
              complete = "0/3";
              break;
            case "yellow2":
              imgSrc = "/yellowPlate.png";
              complete = "1/3";
              break;
            case "yellow1":
              imgSrc = "/yellowPlate.png";
              complete = "2/3";
              break;
            case "green":
              imgSrc = "/greenPlate.png";
              complete = "3/3";
              break;
            default:
              imgSrc = "/greyPlate.png"; // Replace with your default image
          }
          return (
            <div
              className="responsive-img"
              title={`Completed: ${complete} meals`} // This will be the tooltip text
              key={i}
            >
              <img className="plateImg" src={imgSrc} alt={`${color} Plate`} />
              <div style={{ textAlign: "center" }}>
                <p className="plateNum">{i + 1}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default PlatesHomepage;
