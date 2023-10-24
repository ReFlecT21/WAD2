import { Button, Container, Row, Col, Accordion, Tab, Tabs} from "react-bootstrap";
import {  CompletedMeals, NavBar } from "../components";
import { CurrentMealPlanV2 } from "../components/CurrentMealPlan";

import Fallback from "./Fallback";
import { ErrorBoundary } from "react-error-boundary";
import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";


import { useAtom } from "jotai";
import { RecipeOverlay } from "../atoms/recipeOverlay";

import { fetcher } from "../middleware/Fetcher";
import { dbFoodMethods } from "../middleware/dbMethods";


export default function MealPlan() {
  

  const navigate = useNavigate();
  const navHome = () => navigate("/home");
  const navChoose = () => navigate("/choose");

  const [currMealPlan, setCurrMealPlan] = useState(null);
  const [currDisplayMealPlan, setCurrDisplayMealPlan] = useState(null);
  const [overlayData, setOverlayData] = useAtom(RecipeOverlay);

  



  useEffect(() => {
    
    const fetchData = async () => {
      await dbFoodMethods.init();
      // const userId = auth.currentUser.email;
      setCurrMealPlan(await dbFoodMethods.getMealPlan());
      setCurrDisplayMealPlan(await dbFoodMethods.getDisplayMealPlan());
      // setCurrDisplayMealPlan(await getDisplayMealPlan(auth.currentUser.email));
      // console.log("triggered")
      // console.log(currDisplayMealPlan)
    };
    
    fetchData();

  }, []);

  return (
    <>
      <NavBar />
      {/* <h1 style={{ textAlign: "center" }}>This is Current Meal Plan</h1> */}
      <ErrorBoundary FallbackComponent={Fallback}>
        {overlayData}
        {currDisplayMealPlan != null ? (
          <Container>
            <Tabs
              defaultActiveKey="mealPlan"
              id="uncontrolled-tab-example"
              className="mb-3"
              fill
            >
              <Tab eventKey="mealPlan" title="Current Meal Plan">
                {/* <CurrentMealPlan /> */}
                <CurrentMealPlanV2 
                  currMealPlan={currMealPlan}
                  currDisplayMealPlan={currDisplayMealPlan}
                  
                />

              </Tab>
              <Tab eventKey="cart" title="Shopping Cart">
                <h1>Shopping cart</h1>
              </Tab>
              <Tab eventKey="Completed" title="Completed Meals">
                <CompletedMeals />
              </Tab>

            </Tabs>


          </Container>
        ) : (
          <>
            <h1>Create A Meal Plan With Us First!</h1>
            <Button onClick={navChoose}>
              Create Meal Plan!
            </Button>
          </>
        )}
      </ErrorBoundary>
    </>
  );
}
