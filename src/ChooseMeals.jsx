import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'

import { Container, Row } from 'react-bootstrap'

import Fallback from './fallback'
import { ErrorBoundary } from 'react-error-boundary'

// import PageOne from "./components/createMealComponents/PageOne";
// import PageTwo from "./components/createMealComponents/PageTwo";
// import PageThree from "./components/createMealComponents/PageThree";
// import PageFour from "./components/createMealComponents/PageFour";
import StepProgressBar from './components/StepProgressBar.jsx'
import CreateMealContent from './components/CreateMealPlanContent';

export default function Choosemeals() {

  return(
    <>
      <h1 style={{textAlign:'center'}}>This is Choose Meals</h1>
      <ErrorBoundary
        FallbackComponent={Fallback}
      >
        <CreateMealContent />

      </ErrorBoundary>
      
    </>
  )
}



