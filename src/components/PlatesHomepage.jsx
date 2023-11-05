import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";

const PlatesHomepage = ({ currMealPlan }) => {
  const [colorArray, setColorArray] = useState(null);
  // console.log(currMealPlan);
  useEffect(() => {
    console.log("yes");
    console.log(currMealPlan);
    if (currMealPlan?.mealPlan) {
      console.log("check 2");
      const data = currMealPlan.mealPlan;

      console.log(data);
      const colors = Object.values(data).map((obj) => {
        // Count the number of non-empty meals in the object
        const nonEmptyMeals = Object.values(obj).filter(
          (meal) => Object.keys(meal).length > 0
        ).length;

        if (nonEmptyMeals === 0) {
          return "green";
        } else if (nonEmptyMeals < 3) {
          return "yellow";
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
          switch (color) {
            case "grey":
              imgSrc = "/greyPlate.png";
              break;
            case "green":
              imgSrc = "/greenPlate.png";
              break;
            case "yellow":
              imgSrc = "/yellowPlate.png";
              break;
            default:
              imgSrc = "/greyPlate.png"; // Replace with your default image
          }
          return (
            <div
              className="responsive-img"
              

              key={i}
            >
              <img className="plateImg" src={imgSrc} alt={`${color} Plate`} />
            </div>
          );
        })}
    </div>
  );
};

export default PlatesHomepage;
