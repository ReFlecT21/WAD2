import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ErrorBoundary } from "react-error-boundary";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  LoginComponent,
  SignUpComponent,
  SpinnerPage,
  HomePage,
  Fallback,
  InputPage,
  MealPlan,
  ChooseMealsV2,
  AnalyticsPage,
} from "./pages";
import { useAtom } from "jotai";
import { LoggedIn } from "./atoms/logInAtom.js";
import { Loader } from "./components";
import AnalyticsHomePage from "./components/analyticsHomepage";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Loader />; // Or replace with your own loading component
  }

  return (
    <>
      <Router>
        <ErrorBoundary FallbackComponent={Fallback}>
          <Routes>
            {user ? (
              <>
                <Route path="/home" element={<HomePage />} />
                <Route path="/input" element={<InputPage />} />
                <Route path="/mealplan" element={<MealPlan />} />
                <Route path="/choose" element={<ChooseMealsV2 />} />
                <Route path="/analytics" element={<AnalyticsPage />} />
                <Route path="/analytic" element={<AnalyticsHomePage />} />
                <Route path="/login" element={<LoginComponent />} />
              </>
            ) : (
              <>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<LoginComponent />} />
                <Route path="/signup" element={<SignUpComponent />} />
                {/* <Route path="/choose" element={<ChooseMeals />} /> */}
              </>
            )}
          </Routes>
        </ErrorBoundary>
      </Router>
    </>
  );
}

export default App;
