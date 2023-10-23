// import { useState, useEffect } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import './App.css'

import { Container, Row } from "react-bootstrap";
import Fallback from "./Fallback";
import { ErrorBoundary } from "react-error-boundary";
import { CreateMealContent } from "../components";
import { NavBar } from "../components";

// import PageOne from "./components/createMealComponents/PageOne";
// import PageTwo from "./components/createMealComponents/PageTwo";
// import PageThree from "./components/createMealComponents/PageThree";
// import PageFour from "./components/createMealComponents/PageFour";
// import StepProgressBar from './components/StepProgressBar.jsx'

export default function ChooseMeals() {
  return (
    <>
      <NavBar />
      {/* <h1 style={{ textAlign: "center" }}>This is Choose Meals</h1> */}
      <ErrorBoundary FallbackComponent={Fallback}>
        <CreateMealContent />
      </ErrorBoundary>
    </>
  );
}
