import React from "react";
import ReactDOM from "react-dom";
import { VictoryLine, VictoryChart, VictoryAxis, VictoryTheme } from "victory";

const BarChart = ({ Weights, Dates }) => {
  console.log(Weights);
  console.log(Dates);
  return (
    <VictoryChart theme={VictoryTheme.material}>
      <VictoryLine
        style={{
          data: { stroke: "#c43a31" },
          parent: { border: "1px solid #ccc" },
        }}
        data={[
          { x: 1, y: 2 },
          { x: 2, y: 3 },
          { x: 3, y: 5 },
          { x: 4, y: 4 },
          { x: 5, y: 7 },
        ]}
        animate={{
          duration: 2000,
          onLoad: { duration: 1000 },
        }}
      />
    </VictoryChart>
  );
};

export default BarChart;
