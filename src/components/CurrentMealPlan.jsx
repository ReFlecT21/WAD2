import { Button, Container, Row, Col, Accordion, Tab, Tabs} from "react-bootstrap";
import { MealPlanCard } from "../components/MealPlanCard";
import Fallback from "../pages/Fallback";

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


import getMealPlan from "../middleware/getMealPlan";
import getDisplayMealPlan from "../middleware/getDisplayMealPlan";
import { fetcher } from "../middleware/Fetcher";
import { dbFoodMethods } from "../middleware/dbMethods";




export default function CurrentMealPlan() {

  const navigate = useNavigate();
  const navHome = () => navigate("/home");
  const navChoose = () => navigate("/choose");

  const [currMealPlan, setCurrMealPlan] = useState(null);
  const [currDisplayMealPlan, setCurrDisplayMealPlan] = useState(null);
  const [overlayData, setOverlayData] = useAtom(RecipeOverlay);


  var dayIndex = null;

  useEffect(() => {
    
    const fetchData = async () => {
      await dbFoodMethods.init();
      setCurrMealPlan(await dbFoodMethods.getMealPlan());
      setCurrDisplayMealPlan(await dbFoodMethods.getDisplayMealPlan());
    };
    
    fetchData();
  }, []);

  
  // after successfully retrieving current meal plan
  
  const display = [];
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  useEffect(() => {
    console.log(currMealPlan);
    console.log(currDisplayMealPlan);

  }, [currDisplayMealPlan]);

  function populateDisplay(day, mealType, dayIndex){
    return (
      <div key={`${day}${mealType}`}>
        <Row xs={2} md={2} lg={2}>
          <Col>
            <h4 style={{ margin: "0px" }}>{mealType}</h4>
            {/* <p>{Object.keys(currDisplayMealPlan.DisplayMealPlan[day][mealType])[0]}</p> */}
          </Col>
          <Col>
            <Button
              className="buttonPrimary"
              onClick={() => {
                // check: if the current day he is on, the meal type has been completed
                // if completed: block adding
                // "breakfast": currDisplayMealPlan.DisplayMealPlan[day][mealType]
                // else: add to count of completed meals, call delete from db, call add meal to db
                console.log("clicking completed");
                const clickFunc = async () => {
                  await dbFoodMethods.completeMeal(
                      dayIndex,
                      mealType,
                      currMealPlan.mealPlan[day][mealType]
                  );
                  window.location.reload(false)

                }
                clickFunc();
              }}

              style={ currDisplayMealPlan.DisplayMealPlan[day][mealType][Object.keys(currDisplayMealPlan.DisplayMealPlan[day][mealType])[0]] ? 
                {pointerEvents: 'none', cursor: 'not-allowed'} : {cursor: 'pointer'}}
            >
              Completed
            </Button>
          </Col>
        </Row>
        <MealPlanCard
          recipe={Object.keys(currDisplayMealPlan.DisplayMealPlan[day][mealType])[0]}
        />
      </div>
    )
  }

  
  if (currDisplayMealPlan) {

    // console.log(currDisplayMealPlan)
    // console.log(Date.now())
    // dayIndex = Math.floor((Date.now() - currDisplayMealPlan.CreatedAt) / (1000 * 3600 * 24));
    dayIndex = new Date(Date.now()).getDate() - new Date(currDisplayMealPlan.CreatedAt).getDate() + 1; // +1 not suppose to be there  this is for testing


    // console.log(dayIndex);

    for (const day in currDisplayMealPlan.DisplayMealPlan) {
      const dayData = [null, null, null];
      
      for (const mealType in currDisplayMealPlan.DisplayMealPlan[day]) {
        if (mealType == "breakfast") {
          dayData[0] = populateDisplay(day, mealType, dayIndex);
        }
        else if (mealType == "lunch") {
          dayData[1] = populateDisplay(day, mealType, dayIndex); 
        }
        else if (mealType == "dinner") {
          dayData[2] = populateDisplay(day, mealType, dayIndex);
        }


      }

      var d = new Date(currDisplayMealPlan.CreatedAt);
      d.setDate(d.getDate() + parseInt(day));
      display.push(
        <div key={day}>
          <Accordion.Item eventKey={day}>
            <Accordion.Header>
              <h3 style={{ margin: "0px" }}>
                {d.toLocaleDateString()}, {weekday[d.getDay()]}
              </h3>
            </Accordion.Header>
            <Accordion.Body>
              <Row xs={1} md={2} lg={3}>
                {dayData}
              </Row>
            </Accordion.Body>
          </Accordion.Item>
        </div>
      );
    }
  }

  return (
    <>
        <Accordion defaultActiveKey={["1"]} alwaysOpen>
            {display}
        </Accordion>
    </>
  );
}
