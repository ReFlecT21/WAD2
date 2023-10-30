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
// import { useHistory } from 'react-router-dom';


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
      // const userId = auth.currentUser.email;
      // setCurrMealPlan(await getMealPlan(userId));
      await dbFoodMethods.init();

      setCurrMealPlan(await dbFoodMethods.getDisplayMealPlan());
    };

    fetchData();

  }, []);

  // const history = useHistory();

  // useEffect(() => {
  //   const unlisten = history.listen(() => {
  //     window.location.reload();
  //   });
  //   return () => {
  //     unlisten();
  //   };
  // }, [history]);

  
  // console.log(currMealPlan)
  var currDay = 0;

  if (currMealPlan?.DisplayMealPlan) {
    var currDay =
      new Date(Date.now()).getDate() -
      new Date(currMealPlan.CreatedAt).getDate();
      // FOR TESTING PURPOSES ONLY (NEED TO +1 )
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
                          {Object.keys(currMealPlan.DisplayMealPlan[currDay+1]).length >0 ? (
                            <>
                              {["breakfast", "lunch", "dinner"].map((mealType) => (
                                <Col key={`${mealType}home`}>

                                  {currMealPlan.DisplayMealPlan[currDay+1][mealType][
                                    Object.keys(currMealPlan.DisplayMealPlan[currDay+1][mealType])[0]
                                  ] ? (
                                    <h4>{mealType} completed!</h4>
                                  ) : (
                                    <h4>{mealType}</h4>
                                  )}
                                  <MealPlanCardHome
                                    recipe={
                                      Object.keys(
                                        currMealPlan.DisplayMealPlan[currDay + 1][
                                          mealType
                                        ]
                                      )[0]
                                    }
                                  />

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
          <div className="neuphormicBox">
            <Stack gap={2}>
              {/* <Button className="homePageBtn">Scan</Button> */}
              <Scan />
              <Button
                className="homePageBtn"
                onClick={() =>
                  setOverlayData(<ManualSearchComponent currDay={currDay} />)
                }
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
