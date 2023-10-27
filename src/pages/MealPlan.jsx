import {
  Button,
  Container,
  Row,
  Col,
  Accordion,
  Tab,
  Tabs,
} from "react-bootstrap";
import { CompletedMeals, NavBar } from "../components";
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
import { ShoppingCart, ShoppingCartMobile } from "../components/ShoppingCart";

export default function MealPlan() {
  const navigate = useNavigate();
  const navHome = () => navigate("/home");
  const navChoose = () => navigate("/choose");

  const [completed, setCompleted] = useState(null);
  const [currMealPlan, setCurrMealPlan] = useState(null);
  const [currDisplayMealPlan, setCurrDisplayMealPlan] = useState(null);
  const [shoppingCart, setShoppingCart] = useState(null);
  const [overlayData, setOverlayData] = useState(null);
  const [trigger, setTrigger] = useState(false);

  const [width, setWidth] = useState(window.innerWidth);
  // window.onresize = () => {
  //   width = window.innerWidth;
  // }
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
  
    window.addEventListener('resize', handleResize);
  
    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); 
  

  useEffect(() => {
    const fetchData = async () => {
      await dbFoodMethods.init();
      setCompleted(await dbFoodMethods.getCompleted());
      setCurrMealPlan(await dbFoodMethods.getMealPlan());
      setCurrDisplayMealPlan(await dbFoodMethods.getDisplayMealPlan());
      setShoppingCart(await dbFoodMethods.getShoppingCart());
      // console.log(shoppingCart)
      // console.log(completed)
      // console.log(currMealPlan)
      // console.log(currDisplayMealPlan)
    };

    fetchData();
  }, []);

  // console.log(shoppingCart)
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
                  shoppingCart={shoppingCart}
                />
              </Tab>
              <Tab eventKey="cart" title="Shopping Cart">
                {width > 767 ? (
                  // <h1>Shopping Cart</h1>
                  <ShoppingCart
                    shoppingCart={shoppingCart}
                  />
                ) : (
                  <ShoppingCartMobile
                    shoppingCart={shoppingCart}
                  />
                )}
              </Tab>
              <Tab eventKey="Completed" title="Completed Meals">
                <h1>Completed Meals</h1>
                <Row xs={1} md={2} lg={3}>
                  <CompletedMeals completed={completed} />
                </Row>
              </Tab>
            </Tabs>
          </Container>
        ) : (
          <>
            <h1>Create A Meal Plan With Us First!</h1>
            <Button onClick={navChoose}>Create Meal Plan!</Button>
          </>
        )}
      </ErrorBoundary>
    </>
  );
}
