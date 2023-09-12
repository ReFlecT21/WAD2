import React from "react";
import ReactDOM from "react-dom/client";
import NavBar from "./NavBar.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
// import './index.css'
import { ErrorBoundary } from 'react-error-boundary';

import 'bootstrap/dist/css/bootstrap.min.css';

import Fallback from './fallback.jsx';
import Choosemeals from "./ChooseMeals.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NavBar />
    <ErrorBoundary
      FallbackComponent={Fallback}
    >
      <Choosemeals />

    </ErrorBoundary>
  </React.StrictMode>,
)
