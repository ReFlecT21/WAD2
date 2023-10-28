import React from "react";
import { VictoryPie, VictoryContainer } from "victory";

const ProgressBar = ({ percent = 25, color = "tomato" }) => {
  return (
    <VictoryPie
      containerComponent={<VictoryContainer responsive={false} />}
      width={200}
      height={200}
      data={[
        { x: "progress", y: percent },
        { x: "remainder", y: 100 - percent },
      ]}
      colorScale={[color, "#ccc"]}
      innerRadius={70}
      labels={() => null}
      padding={{ top: 0, bottom: 0 }}
    />
  );
};

export default ProgressBar;
