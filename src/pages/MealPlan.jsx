import {
  Button,
  Container,
  Row,
  Col,
  Accordion,
  Tab,
  Tabs,
} from "react-bootstrap";
import { NavBar } from "../components";
import { CurrentMealPlanV2 } from "../components/CurrentMealPlan";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
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
import { CompletedMeals, CompletedMealsV2 } from "../components/CompletedMeals";
import Cookies from "js-cookie";


///anan add start
import styled from 'styled-components';

const BlackTextTabTitle = styled.div`
  color: black;
`;

// $primaryCol: #1F5E4B;
// $secondaryCol: #3EBC96;
/// anan add end


export default function MealPlan() {
  const navigate = useNavigate();
  const navHome = () => navigate("/home");
  const navChoose = () => navigate("/input");

  const [completed, setCompleted] = useState(null);
  const [currMealPlan, setCurrMealPlan] = useState(null);
  const [currDisplayMealPlan, setCurrDisplayMealPlan] = useState(null);
  const [shoppingCart, setShoppingCart] = useState(null);
  const [overlayData, setOverlayData] = useAtom(RecipeOverlay);
  const [trigger, setTrigger] = useState(false);

  const [width, setWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
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
    };
    
    fetchData();
  }, []);
  // console.log(completed)
  // console.log(currMealPlan)
  // console.log(currDisplayMealPlan)

  const handleRecal = async () => {
    const expirationTimeInHours = 1;
    const expirationDate = new Date(
    new Date().getTime() + expirationTimeInHours * 60 * 60 * 1000
    );
    
    let remainingCal = await dbFoodMethods.getRemainingCalories(currMealPlan.mealPlan);
    // console.log(remainingCal);
    
    if (remainingCal > 999){
        Cookies.set("recal", JSON.stringify(currMealPlan.mealPlan), { expires: expirationDate });
        Cookies.set("calories", remainingCal, { expires: expirationDate });
        navigate("/choose");
    } else {
        alert("You can only recalculate if you have at least 1000 calories per day left")
    }
    // setRecal(true);
    

    
};

  // console.log(shoppingCart)
  return (
    <>
      <NavBar />
      {/* <h1 style={{ textAlign: "center" }}>This is Current Meal Plan</h1> */}
      <ErrorBoundary FallbackComponent={Fallback}>
        {overlayData}
        {currDisplayMealPlan != null ? (
          <Container >
            <Tabs  
              // style={{backgroundColor:"", color:""}}
              defaultActiveKey="mealPlan"
              id="uncontrolled-tab-example"
              className="mb-3"
              // style={{padding: "20px"}}
              fill
            >
              <Tab eventKey="mealPlan"  title={"Current Meal Plan"} >
                {/* <CurrentMealPlan /> */}
                <div style={{marginTop: "30px", marginBottom: "30px", display:"flex", justifyContent:"space-between"}}>
                  <h2 style={{display:"flex", justifyContent:"center", alignItems:"center"}}>Your Current Meal Plan</h2>
                  <Button className="chooseBtn" onClick={handleRecal}>
                    Replan
                  </Button>

                </div>
                <CurrentMealPlanV2
                  currMealPlan={currMealPlan}
                  currDisplayMealPlan={currDisplayMealPlan}
                  shoppingCart={shoppingCart}
                />
              </Tab>
              
              <Tab eventKey="cart"title={"Shopping Cart"}>
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
              <Tab eventKey="Completed" title={"Completed Meals"}>
                <h2 style={{marginTop: "30px", marginBottom: "30px"}}>Your Completed Meals</h2>

                <Row
                    xs={1}
                    md={2}
                    lg={3}
                    style={{ margin: "10px", objectFit: "contain" }}
                    className="mealPlanContainer"
                  >
                  <CompletedMeals 
                    completed={completed} 
                    currMealPlan={currMealPlan}
                    currDisplayMealPlan={currDisplayMealPlan}
                  />
                  {/* <CompletedMealsV2 completed={completed} /> */}
                </Row>
              </Tab>
            </Tabs>
          </Container>
        ) : (
          <>
          <div style={{textAlign:"center",  marginTop:"250px"}}> 
            <h2>Create A Meal Plan With Us First!</h2>
            <Button className="createBtn" style={{marginTop:"20px"}} onClick={navChoose}>
              <FontAwesomeIcon className="plusIcon"
                  icon={faPlus}
                />Create Meal Plan!</Button>
          </div>
          </>
        )}
      </ErrorBoundary>
    </>
  );
}
