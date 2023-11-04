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
        width={600}
        height={500}
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
            data: { stroke: "#3EBC96", },
            parent: { border: "1px solid #ccc" },
          }}
          data={data}
        />
        <VictoryScatter //dot
          style={{ data: { fill: "#1F5E4B" } }}
          size={5}
          data={data}
          labels={({ datum }) => `Weight: ${datum.y}kg`} 
          className="barText"
          labelComponent={<VictoryTooltip cornerRadius={5} // Adjust the corner radius of the tooltip box
          flyoutStyle={{
            stroke: "#1F5E4B", // Border color of the tooltip box
            fill: "#FFFFFF",   // Background color of the tooltip box
          }}
          flyoutPadding={10}  // Adjust padding within the tooltip box
          flyoutWidth={100}   // Set the width of the tooltip box
          flyoutHeight={50}/>}
        />
      </VictoryChart>
    );
  };

  export default BarChart;
