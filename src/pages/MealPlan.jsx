import { Button, Container, Row, Col } from "react-bootstrap";
import Fallback from "./Fallback";
import { ErrorBoundary } from "react-error-boundary";
import { NavBar } from "../components";
import getMealPlan from "../getters/getMealPlan";
import { auth } from "../../firebase";
import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";

export default function MealPlan() {
  const navigate = useNavigate();
  const navHome = () => navigate('/home');
  const navChoose = () => navigate('/choose');

  const [mealPlan, setMealPlan] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const userId = auth.currentUser.email;
      setMealPlan(await getMealPlan(userId));
    };
    
    fetchData();
  }, []);
  
  console.log(mealPlan);


  return (
    <>
      <NavBar />
      {/* <h1 style={{ textAlign: "center" }}>This is Current Meal Plan</h1> */}
      <ErrorBoundary FallbackComponent={Fallback}>
        {
          mealPlan!=null ? (
            // mealPlan
            <p>you have a meal plan</p>
            
          ) : (
            <>

              <h1>Create A Meal Plan With Us First!</h1>
              <Button onClick={navChoose}>
                Create Meal Plan!
              </Button>

            </>


          )
        }
      </ErrorBoundary>
    </>
  );
}
