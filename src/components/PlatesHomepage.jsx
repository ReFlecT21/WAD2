import React from "react";
import ReactDOM from "react-dom";

const PlatesHomepage = ({ colors }) => {
  console.log(colors);
  return (
    <div>
      {colors &&
        colors.map((color, i) => {
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
          return <img key={i} src={imgSrc} alt={`${color} Plate`} />;
        })}
    </div>
  );
};

export default PlatesHomepage;
