import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import NavBar from "./NavBar.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { ErrorBoundary } from "react-error-boundary";
import LoginComponent from "./login.jsx";
import SignUpComponent from "./signup.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import Fallback from "./fallback.jsx";
import Choosemeals from "./ChooseMeals.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import HomePage from "./homepage.jsx";
import SpinnerPage from "./components/loadingComponent/SpinnerPage.jsx";
import { useAtom } from "jotai";
import { LoggedIn } from "./atoms/logInAtom";

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
    return <SpinnerPage />; // Or replace with your own loading component
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
                <Route path="/" element={<LoginComponent />} />
                <Route path="/signup" element={<SignUpComponent />} />
                <Route path="/choose" element={<Choosemeals />} />
              </>
            )}
          </Routes>
        </ErrorBoundary>
      </Router>
    </>
  );
}

export default App;
