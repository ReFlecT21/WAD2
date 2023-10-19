import React, { useEffect, useState } from "react";
import { fetcherPOST } from "../middleware/Fetcher";
import { NavBar } from "../components";
import { Row, Col, Button, Stack } from "react-bootstrap";
import { Box } from "@mui/material";
import { useAtom } from "jotai";
import { RecipeOverlay } from "../atoms/recipeOverlay";
import { Modal } from "@mui/material";
import { ManualSearchComponent } from "../components/ManualSearchInput";


import Spline from '@splinetool/react-spline';
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
import getMealPlan from "../middleware/getMealPlan";
import { MealPlanCard, MealPlanCardHome } from "../components/MealPlanCard";
import { isMobile } from "react-device-detect";




const HomePage = () => {
  const [overlayData, setOverlayData] = useAtom(RecipeOverlay);
  const [currMealPlan, setCurrMealPlan] = useState(null);

  // const body = {
  //   query: "prata",
  //   include_subrecipe: true,
  //   use_raw_foods: false,
  //   line_delimited: true,
  //   claims: true,
  //   taxonomy: true,
  //   ingredient_statement: true,
  // };
  // const [data, setData] = useState(null);

  // fetcherPOST("/foodAPI/manualSearch", body, setData);

  // console.log(data);

  useEffect(() => {
    const fetchData = async () => {
      const userId = auth.currentUser.email;
      setCurrMealPlan(await getMealPlan(userId));
    };

    fetchData();
  }, []);

  var todayMealDisplay = []
  var todayMeal = []
  // console.log(currMealPlan)
  
  if (currMealPlan != null) {
    var currDay = Math.floor((Date.now() - currMealPlan.CreatedAt) / (1000 * 3600 * 24))
    // console.log(currDay)
    todayMeal = currMealPlan["mealPlan"][currDay];
    // console.log(todayMeal)

    for (const mealType in todayMeal){
      // console.log(todayMeal[mealType])
      todayMealDisplay.push(
        <>
          <MealPlanCardHome recipe={Object.keys(todayMeal[mealType])[0]} />
          {/* <div>
            <h3>{mealType}</h3>
            <p>{todayMeal[mealType]}</p>
          </div> */}
        </>
      )
    }
  }


  return (
    <>
      <NavBar />
      {overlayData}
      <Row xs={1} md={3}>
        {/* <Col>
          <spline-viewer url="https://prod.spline.design/TGgKuiS6HyavoK5J/scene.splinecode" events-target="global" logo="No"></spline-viewer>
        </Col> */}
        <Col md={8}>
          {/* <Stack gap={2} >  */}
            <div className="neuphormicBox">
              <h1>Today's Meal</h1>

              <Row xs={1} md={3} lg={3}>

                {todayMealDisplay}
              </Row>
              {/* <h3>Breakfast</h3>
              <h3>Lunch</h3>
              <h3>Dinner</h3>
              <p>LOREM ipsum</p> */}
            </div>
          {/* </Stack> */}
        </Col>
          <Col>
            <div className="neuphormicBox">
              <Stack gap={2}>
                <Button className="buttonPrimary">Scan</Button>
                <Button className="buttonPrimary" onClick={() => setOverlayData(<ManualSearchComponent />)}>Input</Button>
              </Stack>
            </div>
          </Col>
      </Row> 
    </>
  );
};

export default HomePage;
