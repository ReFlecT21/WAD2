  import React from "react";
  import ReactDOM from "react-dom";
  import {
    VictoryLine,
    VictoryChart,
    VictoryScatter,
    VictoryTheme,
    VictoryVoronoiContainer,
    VictoryTooltip,
    VictoryAxis,
  } from "victory";

  const BarChart = ({ Weights, Dates }) => {
    // Create data array
    console.log(Weights);
    console.log(Dates);
    const data = Dates.map((date, index) => {
      return { x: date, y: Number(Weights[index]) };
    });
    console.log(data);
    return (
      <VictoryChart
        containerComponent={<VictoryVoronoiContainer voronoiDimension="x" />}
        
      >
        <VictoryAxis //y-axis
          dependentAxis
          tickFormat={(t) => (Number.isInteger(t) ? t : null)}
          style={{
            tickLabels: { fontSize: 12, fill: "#1F5E4B", },
            axis: {stroke: "#1F5E4B"},
            
          }} 

        
        />
        <VictoryAxis  
        
        style={{
          tickLabels: { fontSize: 12, fill: "#1F5E4B", },
          axis: {stroke: "#1F5E4B"},
          
        }} /> 
        <VictoryLine
          style={{ 
            data: { stroke: "#c43a31", },
            parent: { border: "1px solid #ccc" },
          }}
          data={data}
        />
        <VictoryScatter //dot
          style={{ data: { fill: "#1F5E4B" } }}
          size={5}
          data={data}
          labels={({ datum }) => `Weight:${datum.y}kg`} 
          className="barText"
          labelComponent={<VictoryTooltip />}
        />
      </VictoryChart>
    );
  };

  export default BarChart;
