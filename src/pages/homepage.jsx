import React, { useEffect, useState } from "react";
import { fetcherPOST } from "../middleware/Fetcher";
import { NavBar } from "../components";
import { Row, Col, Button, Stack } from "react-bootstrap";
import { Box } from "@mui/material";
import { useAtom } from "jotai";
import { RecipeOverlay } from "../atoms/recipeOverlay";
import { Modal } from "@mui/material";
import { ManualSearchComponent } from "../components/ManualSearchInput";

import Spline from "@splinetool/react-spline";
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
import { dbFoodMethods } from "../middleware/dbMethods";
import Cookies from "js-cookie";
import { Scan } from "../components/scan";
import PageNotification from "../components/PageNotification";
import currDayCalculator from "../middleware/currDayCalculator";
// import { useHistory } from 'react-router-dom';


const HomePage = () => {
  const [overlayData, setOverlayData] = useAtom(RecipeOverlay);
  const [currMealPlan, setCurrMealPlan] = useState(null);

  const [notiMessage, setNotiMessage] = useState("");
  const [notiRender, setNotiRender] = useState(false);
  
  function showNotification(message) {
    console.log("showing notification")
    setNotiMessage(message);
    setNotiRender(true);
  }


  useEffect(() => {
    const fetchData = async () => {

      await dbFoodMethods.init();

      setCurrMealPlan(await dbFoodMethods.getDisplayMealPlan());
    };

    fetchData();

  }, []);

  var currDay = 0;

  if (currMealPlan?.DisplayMealPlan) {
    currDay = currDayCalculator(currMealPlan.CreatedAt)
      // FOR TESTING PURPOSES ONLY (NEED TO +1 )
  }

  return (
    <>
      <NavBar />
      <PageNotification message={notiMessage} render={notiRender}/>
      {overlayData}
      <Row xs={1} md={3}>
        {/* <Col>
          <spline-viewer url="https://prod.spline.design/TGgKuiS6HyavoK5J/scene.splinecode" events-target="global" logo="No"></spline-viewer>
        </Col> */}
        <Col md={8}>
          {/* <Stack gap={2} >  */}
          <div className="neuphormicBox">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h1>{currDay === 0 ? "Upcoming" : "Today's"} Meal Plan</h1>
              <div>
                <Button className="buttonPrimary" href="/mealplan">
                  See meal plan
                </Button>
              </div>
            </div>

            <Row xs={1} md={3} lg={3}>
              {/* {todayMealDisplay} */}
              {/* {console.log(currMealPlan)} */}
              {/* {console.log(currMealPlan["DisplayMealPlan"]["1"]["breakfast"])} */}

              {currMealPlan ? (
                <>
                  {currMealPlan.DisplayMealPlan[currDay] ? (
                    <>
                      {["breakfast", "lunch", "dinner"].map((mealType) => (
                        <Col key={`${mealType}home`}>

                          <h4>{mealType}</h4>
                          {Object.keys(currMealPlan.DisplayMealPlan[currDay]).includes(mealType) ? (
                            <MealPlanCardHome
                              recipe={
                                Object.keys(
                                  currMealPlan.DisplayMealPlan[currDay][mealType]
                                )[0]
                              }
                            />
                          ):(<p>No Meal</p>)}
                        </Col>
                      ))}
                    </>
                  ) : (
                    <>
                      {console.log(currMealPlan.DisplayMealPlan)}
                      {console.log(currDay)}
                      {Object.keys(currMealPlan.DisplayMealPlan[currDay+1]).length >0 ? (
                        <>
                          {["breakfast", "lunch", "dinner"].map((mealType) => (
                            <Col key={`${mealType}home`}>

                              {currMealPlan.DisplayMealPlan[currDay+1][mealType] ? (
                                <>
                                {currMealPlan.DisplayMealPlan[currDay+1][mealType][
                                  Object.keys(currMealPlan.DisplayMealPlan[currDay+1][mealType])[0]
                                ] ? (
                                  <h4>{mealType} completed!</h4>
                                ) : (
                                  <h4>{mealType}</h4>
                                )}
                                <MealPlanCardHome
                                  recipe={Object.keys(currMealPlan.DisplayMealPlan[currDay + 1][mealType])[0]}
                                />
                                </>
                              ) : (
                                <>
                                  <h4>{mealType}</h4>
                                  <p>No meals planned</p>
                                </>
                              )}

                              
                              

                            </Col>
                          ))}
                        </>
                        ) : (<p>No meals planned</p>)}
                    </>
                  )}
                </>
              ) : (
                <h4>No Meal Plan</h4>
              )}

            </Row>

          </div>

        </Col>
        <Col>
          <div className="neuphormicBox" style={{textAlign:"center"}}>
            <Stack gap={2}>
              {/* <Button className="homePageBtn">Scan</Button> */}
              <h3>Manual Add</h3>
              <Button
                className="homePageBtn"
                onClick={() =>{
                  setOverlayData(<ManualSearchComponent currDay={currDay+1} showNotification={showNotification} />)
                }}
              >
                Manual Search
              </Button>
            </Stack>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default HomePage;
