import { Button, Container, Row, Col, Accordion } from "react-bootstrap";
import Fallback from "./Fallback";
import { ErrorBoundary } from "react-error-boundary";
import { NavBar } from "../components";
import getMealPlan from "../getters/getMealPlan";
import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { fetcher } from "../getters/Fetcher";
import { MealPlanCard } from "../components/MealPlanCard";
import { RecipeOverlay } from "../atoms/recipeOverlay";
import { useAtom } from "jotai";
import {
  collection,
  doc,
  getDoc,
  setDoc,
  addDoc,
  query,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { db, auth } from "../../firebase";

export default function MealPlan() {
  const navigate = useNavigate();
  const navHome = () => navigate("/home");
  const navChoose = () => navigate("/choose");

  const [currMealPlan, setCurrMealPlan] = useState(null);
  const [overlayData, setOverlayData] = useAtom(RecipeOverlay);
  
  
  let dayIndex = 1;
  
  async function markMealAsComplete(dayIndex, mealType) {
    const username = auth.currentUser.email;
    const docRef = doc(db, "Food", username);

    try {
      // Get the current state of the document
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const Completed = Array.isArray(data.Completed) ? data.Completed : [];

        // Make sure the day exists in the Completed array
        if (!Completed[dayIndex]) {
          Completed[dayIndex] = {};
        }

        // Mark the meal as complete
        Completed[dayIndex][mealType] = true;

        // Check if all meals are complete for the day
        if (
          Completed[dayIndex].breakfast &&
          Completed[dayIndex].lunch &&
          Completed[dayIndex].dinner
        ) {
          console.log(`All meals for day ${dayIndex + 1} are complete!`);
        }

        // Update the document in Firestore
        await setDoc(docRef, {
          Plan: data.Plan,
          Completed: Completed,
          CreatedAt: Date.now(), // i cannot have this field change everytime i update the document
        });

        console.log("Document written");
      } else {
        console.error(
          "Document does not exist or Completed field is not an array"
        );
      }
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  }

  var defaultActiveKey = null

  useEffect(() => {
    const fetchData = async () => {
      const userId = auth.currentUser.email;
      setCurrMealPlan(await getMealPlan(userId));
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

  if (currMealPlan) {
    console.log(currMealPlan);
    // d.setDate(d.getDate() + 1)
    // console.log( d )

    // console.log(currMealPlan.CreatedAt)
    // console.log(Date.now())
    // console.log()
    defaultActiveKey = Math.floor((Date.now() -currMealPlan.CreatedAt) / (1000 * 3600 * 24))

    for (const day in currMealPlan.mealPlan) {
      const dayData = [null, null, null];
      for (const mealType in currMealPlan.mealPlan[day]) {
        if (mealType == "breakfast") {
          dayData[0] = (
            <div>
              <Row xs={2} md={2} lg={2}>
                <Col>
                  <h4 style={{ margin: "0px" }}>{mealType}</h4>
                </Col>
                <Col>
                  <Button
                    className="buttonPrimary"
                    onClick={
                      console.log("clicking completed")
                      
                      // check: if the current day he is on, the meal type has been completed
                      // if completed: block adding
                      // else: add to count of completed meals, call delete from db, call add meal to completed

                    }
                  >
                    Completed
                  </Button>
                </Col>
              </Row>
              <MealPlanCard
                recipe={Object.keys(currMealPlan.mealPlan[day][mealType])[0]}
              />
            </div>
          );
        }
        if (mealType == "lunch") {
          dayData[1] = (
            <div>
              <Row xs={2} md={2} lg={2}>
                <Col>
                  <h4 style={{ margin: "0px" }}>{mealType}</h4>
                </Col>
                <Col>
                  <Button
                    className="buttonPrimary"
                    onClick={
                      console.log("clicking completed")
                      // check: if the current day he is on, the meal type has been completed
                      // if completed: block adding
                      // else: add to count of completed meals, call delete from db, call add meal to db
                    }
                  >
                    Completed
                  </Button>
                </Col>
              </Row>
              <MealPlanCard
                recipe={Object.keys(currMealPlan.mealPlan[day][mealType])[0]}
              />
            </div>
          );
        }
        if (mealType == "dinner") {
          dayData[2] = (
            <div>
              <Row xs={2} md={2} lg={2}>
                <Col>
                  <h4 style={{ margin: "0px" }}>{mealType}</h4>
                </Col>
                <Col>
                  <Button
                    className="buttonPrimary"
                    onClick={
                      console.log("clicking completed")
                      // check: if the current day he is on, the meal type has been completed
                      // if completed: block adding
                      // else: add to count of completed meals, call delete from db, call add meal to db
                    }
                  >
                    Completed
                  </Button>
                </Col>
              </Row>
              <MealPlanCard
                recipe={Object.keys(currMealPlan.mealPlan[day][mealType])[0]}
              />
            </div>
          );
        }

        // Object.keys(currMealPlan.mealPlan[day][mealType])[0]
      }

      console.log(currMealPlan);

      var d = new Date(currMealPlan.CreatedAt);
      d.setDate(d.getDate() + parseInt(day));
      display.push(
        <>
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
        </>
      );
    }
  }

  return (
    <>
      <NavBar />
      {/* <h1 style={{ textAlign: "center" }}>This is Current Meal Plan</h1> */}
      <ErrorBoundary FallbackComponent={Fallback}>
        {overlayData}
        {currMealPlan != null ? (
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
