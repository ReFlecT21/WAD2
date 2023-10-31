import React, { useEffect, useState } from "react";
import { fetcherPOST } from "../middleware/Fetcher";
import { NavBar } from "../components";
import { Row, Col, Button, Stack } from "react-bootstrap";
import { Box } from "@mui/material";
import { useAtom } from "jotai";
import { RecipeOverlay } from "../atoms/recipeOverlay";
import { Modal } from "@mui/material";
import { ManualSearchComponent } from "../components/ManualSearchInput";
import AnalyticsPage from "./AnalyticsPage";
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
  const dayIndex = 7;
  const [weights, setWeight] = useState([]);
  const [avgCal, setAvgCal] = useState("");
  const [diffWeight, setDiffWeight] = useState("");
  const [formattedDates, setFormattedDates] = useState([]);
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
      const result = await dbFoodMethods.getAnalytics();
      setWeight(result.weights);
      setAvgCal(result.Cals);
      setDiffWeight(result.diffWeight);
      let dates = result.Dates;

      const newFormattedDates = dates.map((timestamp) => {
        // Convert the timestamp to a Date object
        const date = new Date(timestamp);

        // Extract the date and month
        const day = date.getDate(); // Day of the month (1-31)
        const month = date.getMonth() + 1; // Month number (0-11, so we add 1)

        // Format the date and month
        return `${day}/${month}`;
      });

      setFormattedDates(newFormattedDates); // Update the state with the new array
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
                          {Object.keys(
                            currMealPlan.DisplayMealPlan[currDay]
                          ).includes(mealType) ? (
                            <MealPlanCardHome
                              recipe={
                                Object.keys(
                                  currMealPlan.DisplayMealPlan[currDay][
                                    mealType
                                  ]
                                )[0]
                              }
                            />
                          ) : (
                            <p>No Meal</p>
                          )}
                        </Col>
                      ))}
                    </>
                  ) : (
                    <>
                      {Object.keys(currMealPlan.DisplayMealPlan[currDay + 1])
                        .length > 0 ? (
                        <>
                          {["breakfast", "lunch", "dinner"].map((mealType) => (
                            <Col key={`${mealType}home`}>
                              {currMealPlan.DisplayMealPlan[currDay + 1][
                                mealType
                              ][
                                Object.keys(
                                  currMealPlan.DisplayMealPlan[currDay + 1][
                                    mealType
                                  ]
                                )[0]
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
                      ) : (
                        <p>No meals planned</p>
                      )}
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
      <Row>
        <AnalyticsPage></AnalyticsPage>
      </Row>
    </>
  );
};
{
  /* <BarChart Weights={weights} Dates={formattedDates} /> */
}
{
  /* <Card>
<Card.Body>
  <Card.Title style={{ color: "black" }}>
    {avgCal}
  </Card.Title>

  <Card.Text>Avg. Cals Per Day</Card.Text>
</Card.Body>
</Card> */
}
{
  /* <Card>
  <Card.Body>
    <Card.Title style={{ color: "black" }}>{diffWeight} kg</Card.Title>

    <Card.Text>
      {diffWeight < 0 ? "Total Weight Gain" : "Total Weight Loss"}
    </Card.Text>
  </Card.Body>
</Card> */
}
export default HomePage;
