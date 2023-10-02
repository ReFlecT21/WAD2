import React from "react";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";


const StepProgressBar = ({ page, onPageNumberClick }) => {
  var stepPercentage = 0;
  
  if (page === 1) {
    stepPercentage = 16;
  } else if (page === 2) {
    stepPercentage = 49.5;
  } else if (page === 3) {
    stepPercentage = 82.5;
  } else if (page === 4) {
    stepPercentage = 100;
  } else {
    stepPercentage = 0;
  }

  return (
    <>
    <ProgressBar style={{backGroundColor:'#205E4B'}} percent={stepPercentage}>
      <Step>
        {({ accomplished, index }) => (
          <div
            className={`indexedStep ${accomplished ? "accomplished" : null}`}
            onClick={() => onPageNumberClick(1)}
          >
            {/* {index + 1} */}
            Breakfast
          </div>
        )}
      </Step>
      <Step>
        {({ accomplished, index }) => (
          <div
            className={`indexedStep ${accomplished ? "accomplished" : null}`}
            onClick={() => onPageNumberClick(2)}
          >
            {/* {index + 1} */}
            Lunch
          </div>
        )}
      </Step>
      <Step>
        {({ accomplished, index }) => (
          <div
            className={`indexedStep ${accomplished ? "accomplished" : null}`}
            onClick={() => onPageNumberClick(3)}
          >
            {/* {index + 1} */}
            Dinner
          </div>
        )}
      </Step>
      <Step>
        {({ accomplished, index }) => (
          <div
            className={`indexedStep ${accomplished ? "accomplished" : null}`}
            onClick={() => onPageNumberClick(4)}
          >
            {/* {index + 1} */}
            Finish
          </div>
        )}
      </Step>
    </ProgressBar>
  </>
  );
};

export default StepProgressBar



// const MultiStepProgressBar = (props) => {
//   return (
//     <ProgressBar
//       percent={(props.step + 1) * 25}
//       filledBackground="#664de5"
//       height="2px"
//       style={{ margin: "auto" }}
//     >
//       <Step transition="scale">
//         {({ accomplished, index }) => (
//           <div
//             style={{
//               height: "15px",
//               width: "15px",
//               border: "1px solid lightgray",
//               borderRadius: "50%",
//               backgroundColor: `${accomplished ? "#664de5" : null}`
//             }}
//             className={`step ${accomplished ? "completed" : null}`}
//           >
//             1
//           </div>
//         )}
//       </Step>
//       <Step transition="scale">
//         {({ accomplished, index }) => (
//           <div
//             style={{
//               height: "15px",
//               width: "15px",
//               border: "1px solid lightgray",
//               borderRadius: "50%",
//               backgroundColor: `${accomplished ? "#664de5" : null}`
//             }}
//             className={`step ${accomplished ? "completed" : null}`}
//           >
//             2
//           </div>
//         )}
//       </Step>
//       <Step transition="scale">
//         {({ accomplished, index }) => (
//           <div
//             style={{
//               height: "15px",
//               width: "15px",

//               border: "1px solid lightgray",
//               borderRadius: "50%",
//               backgroundColor: `${accomplished ? "#664de5" : null}`
//             }}
//             className={`step ${accomplished ? "completed" : null}`}
//           >
//             3
//           </div>
//         )}
//       </Step>
//       <Step transition="scale">
//         {({ accomplished, index }) => (
//           <div
//             style={{
//               height: "15px",
//               width: "15px",
//               border: "1px solid lightgray",
//               borderRadius: "50%",
//               backgroundColor: `${accomplished ? "#664de5" : null}`
//             }}
//             className={`step ${accomplished ? "completed" : null}`}
//           >
//             4
//           </div>
//         )}
//       </Step>
//     </ProgressBar>
//   );
// };

// export default MultiStepProgressBar;
