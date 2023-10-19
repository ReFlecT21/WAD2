import { Button, Container, Row, Col, Accordion } from "react-bootstrap";
import { NavBar } from "../components";
import { MealPlanCard } from "../components/MealPlanCard";

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


import getMealPlan from "../middleware/getMealPlan";
import getDisplayMealPlan from "../middleware/getDisplayMealPlan";
import { fetcher } from "../middleware/Fetcher";
import { dbFoodMethods } from "../middleware/dbMethods";

import {
  collection,
  doc,
  getDoc,
  setDoc,
  addDoc,
  query,
  getDocs,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, auth } from "../../firebase";

export default function MealPlan() {
  

  const navigate = useNavigate();
  const navHome = () => navigate("/home");
  const navChoose = () => navigate("/choose");

  const [currMealPlan, setCurrMealPlan] = useState(null);
  const [currDisplayMealPlan, setCurrDisplayMealPlan] = useState(null);
  const [overlayData, setOverlayData] = useAtom(RecipeOverlay);

  // const [dayIndex, setDayIndex] = useState(1);

  
  // async function markMealAsComplete(dayIndex, mealType, food) {
  //   const username = auth.currentUser.email;
  //   const docRef = doc(db, "Food", username);

  //   try {
  //     // Get the current state of the document
  //     const docSnap = await getDoc(docRef);

  //     if (docSnap.exists()) {
  //       const data = docSnap.data();
  //       console.log(data);
  //       const Completed = data.Completed;
  //       const DisplayPlan = data.DisplayPlan;
  //       console.log(Object.values(DisplayPlan[dayIndex].breakfast)[0]);

  //       // Make sure the day exists in the Completed array
  //       if (Object.keys(Completed).length == 0) {
  //         Completed[dayIndex] = {};
  //         console.log(Completed);
  //       }
  //       if (Object.values(DisplayPlan[dayIndex][mealType])[0] == 0) {
  //         const key = Object.keys(DisplayPlan[dayIndex][mealType])[0];
  //         DisplayPlan[dayIndex][mealType][key] = 1;
  //       }
  //       if (
  //         Completed[dayIndex].breakfast &&
  //         Completed[dayIndex].lunch &&
  //         Completed[dayIndex].dinner
  //       ) {
  //         // setDayIndex((prevDayIndex) => {
  //         //   const newDayIndex = prevDayIndex + 1;
  //         //   Completed[newDayIndex] = {};
  //         //   Completed[newDayIndex][mealType] = food;
  //         //   return newDayIndex;
  //         // });

  //         // should use formula instead of hardcoding
  //       } else {
  //         if (Completed[dayIndex][mealType]) {
  //           console.log(dayIndex);
  //           alert(`you cant have ${mealType} again`);
  //         } else {
  //           Completed[dayIndex][mealType] = food;
  //         }
  //       }

  //       console.log(JSON.stringify(Completed, null, 2));
  //       // Update the document in Firestore
  //       await updateDoc(docRef, {
  //         Completed: Completed,
  //         DisplayPlan: DisplayPlan,
  //       });

  //       console.log("Document written");
  //     } else {
  //       console.error(
  //         "Document does not exist or Completed field is not an array"
  //       );
  //     }
  //   } catch (e) {
  //     console.error("Error updating document: ", e);
  //   }
  // }

  var dayIndex = null;

  useEffect(() => {
    
    const fetchData = async () => {
      await dbFoodMethods.init();
      // const userId = auth.currentUser.email;
      setCurrMealPlan(await dbFoodMethods.getMealPlan());
      setCurrDisplayMealPlan(await dbFoodMethods.getDisplayMealPlan());
      // setCurrDisplayMealPlan(await getDisplayMealPlan(auth.currentUser.email));
    };
    
    fetchData();
  }, []);

  useEffect(() => {
    console.log(currDisplayMealPlan);
  }, [currDisplayMealPlan]);

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

  if (currDisplayMealPlan) {

    // console.log(currDisplayMealPlan)
    // console.log(Date.now())
    // dayIndex = Math.floor((Date.now() - currDisplayMealPlan.CreatedAt) / (1000 * 3600 * 24));
    dayIndex = new Date(Date.now()).getDate() - new Date(currDisplayMealPlan.CreatedAt).getDate();


    console.log(dayIndex);

    for (const day in currDisplayMealPlan.DisplayMealPlan) {
      const dayData = [null, null, null];
      for (const mealType in currDisplayMealPlan.DisplayMealPlan[day]) {
        // currDisplayMealPlan.DisplayMealPlan[day][mealType]
        // [mealType]: currDisplayMealPlan.DisplayMealPlan[day][mealType]
        if (mealType == "breakfast") {
          dayData[0] = (
            <div key={`${day}${mealType}`}>
              <Row xs={2} md={2} lg={2}>
                <Col>
                  <h4 style={{ margin: "0px" }}>{mealType}</h4>
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
                      dbFoodMethods.completeMeal(
                          dayIndex,
                          "breakfast",
                          currMealPlan.mealPlan[day][mealType]
                      );
                    }}

                    style={ currDisplayMealPlan.DisplayMealPlan[day][mealType][Object.keys(currDisplayMealPlan.DisplayMealPlan[day][mealType])[0]] ? 
                      {cursor: 'not-allowed'} : {cursor: 'pointer'}}
                  >
                    Completed
                  </Button>
                </Col>
              </Row>
              <MealPlanCard
                recipe={Object.keys(currDisplayMealPlan.DisplayMealPlan[day][mealType])[0]}
              />
            </div>
          );
        }
        if (mealType == "lunch") {
          dayData[1] = (
            <div key={`${day}${mealType}`}>
              <Row xs={2} md={2} lg={2}>
                <Col>
                  <h4 style={{ margin: "0px" }}>{mealType}</h4>
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
                      dbFoodMethods.completeMeal(
                        dayIndex,
                        "lunch",
                        currMealPlan.mealPlan[day][mealType]
                      );
                    }}
                  >
                    Completed
                  </Button>
                </Col>
              </Row>
              <MealPlanCard
                recipe={Object.keys(currDisplayMealPlan.DisplayMealPlan[day][mealType])[0]}
              />
            </div>
          );
        }
        if (mealType == "dinner") {
          dayData[2] = (
            <div key={`${day}${mealType}`}>
              <Row xs={2} md={2} lg={2}>
                <Col>
                  <h4 style={{ margin: "0px" }}>{mealType}</h4>
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
                      dbFoodMethods.completeMeal(
                        dayIndex,
                        "dinner",
                        currMealPlan.mealPlan[day][mealType]
                      );
                    }}
                  >
                    Completed
                  </Button>
                </Col>
              </Row>
              <MealPlanCard
                recipe={Object.keys(currDisplayMealPlan.DisplayMealPlan[day][mealType])[0]}
              />
            </div>
          );
        }

        // Object.keys(currDisplayMealPlan.DisplayMealPlan[day][mealType])[0]
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
      <NavBar />
      {/* <h1 style={{ textAlign: "center" }}>This is Current Meal Plan</h1> */}
      <ErrorBoundary FallbackComponent={Fallback}>
        {overlayData}
        {currDisplayMealPlan != null ? (
          <Container>
            {/* {display} */}
            <Accordion defaultActiveKey={["1"]} alwaysOpen>
              {display}
            </Accordion>
          </Container>
        ) : (
          <>
            <h1>Create A Meal Plan With Us First!</h1>
            <Button onClick={navChoose}>
              {/* <Button> */}
              Create Meal Plan!
            </Button>
          </>
        )}
      </ErrorBoundary>
    </>
  );
}
