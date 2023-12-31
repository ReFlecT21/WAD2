import React from "react";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";


const StepProgressBar = ({ page, onPageNumberClick }) => {
  var stepPercentage = 0;
  
  if (page === 1) {
    stepPercentage = 2;
  } else if (page === 2) {
    stepPercentage = 35;
  } else if (page === 3) {
    stepPercentage = 70;
  } else if (page === 4) {
    stepPercentage = 100;
  } else {
    stepPercentage = 0;
  }

  return (
    <>
    <ProgressBar className="progressBar" percent={stepPercentage}>
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

