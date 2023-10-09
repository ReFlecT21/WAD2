import { Button, Container, Row, Col } from "react-bootstrap";
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

  const [mealPlan, setMealPlan] = useState(null);
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
          CreatedAt: Date.now(),
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
  useEffect(() => {
    const fetchData = async () => {
      const userId = auth.currentUser.email;
      setMealPlan(await getMealPlan(userId));
    };

    fetchData();
  }, []);

  // after successfully retrieving current meal plan
  const currMealPlan = [];

  if (mealPlan) {
    console.log(mealPlan);
    var d = new Date(mealPlan.CreatedAt);
    console.log(d.toString());

    for (let i = 0; i < 7; i++) {
      // i is the day number
      ["breakfast", "lunch", "dinner"].forEach((meal) => {
        currMealPlan.push(
          <p>
            {i}, {meal}
          </p>
        );
      });
    }
  }

  return (
    <>
      <NavBar />
      {/* <h1 style={{ textAlign: "center" }}>This is Current Meal Plan</h1> */}
      <ErrorBoundary FallbackComponent={Fallback}>
        {mealPlan != null ? (
          currMealPlan
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
