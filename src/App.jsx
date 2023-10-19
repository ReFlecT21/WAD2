import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ErrorBoundary } from "react-error-boundary";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  LoginComponent,
  SignUpComponent,
  ChooseMeals,
  SpinnerPage,
  HomePage,
  Fallback,
  InputPage,
  MealPlan,
} from "./pages";
import { useAtom } from "jotai";
import { LoggedIn } from "./atoms/logInAtom.js";
import { Loader } from "./components";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useAtom(LoggedIn);
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
            {user && loggedIn ? (
              <Route path="/" element={<HomePage />} />
            ) : (
              <>
                <Route path="/home" element={<HomePage />} />
                <Route path="/input" element={<InputPage />} />
                <Route path="/" element={<LoginComponent />} />
                <Route path="/signup" element={<SignUpComponent />} />
                <Route path="/choose" element={<ChooseMeals />} />
                <Route path="/mealplan" element={<MealPlan />} />
              </>
            )}
          </Routes>
        </ErrorBoundary>
      </Router>
    </>
  );
}

export default App;
