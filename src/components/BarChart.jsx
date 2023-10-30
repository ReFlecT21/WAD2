import React from "react";
import ReactDOM from "react-dom";
import {
  VictoryLine,
  VictoryChart,
  VictoryScatter,
  VictoryTheme,
  VictoryVoronoiContainer,
  VictoryTooltip,
} from "victory";

const BarChart = ({ Weights, Dates }) => {
  // Create data array
  const data = Dates.map((date, index) => {
    return { x: date, y: Number(Weights[index]) };
  });

  return (
    <VictoryChart
      containerComponent={<VictoryVoronoiContainer voronoiDimension="x" />}
    >
      <VictoryLine
        style={{
          data: { stroke: "#c43a31" },
          parent: { border: "1px solid #ccc" },
        }}
        data={data}
      />
      <VictoryScatter
        style={{ data: { fill: "#c43a31" } }}
        size={5}
        data={data}
        labels={({ datum }) => `Weight:${datum.y}kg`}
        labelComponent={<VictoryTooltip />}
      />
    </VictoryChart>
  );
};

export default BarChart;
