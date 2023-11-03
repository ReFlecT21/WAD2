import React, { useEffect, useState, useRef } from "react";
import { fetcherPOST } from "../middleware/Fetcher";
import { NavBar } from "../components";
import { Row, Col, Button, Stack, Card } from "react-bootstrap";
import { Box } from "@mui/material";
import { useAtom } from "jotai";
import { RecipeOverlay } from "../atoms/recipeOverlay";
import { Modal } from "@mui/material";
import { ManualSearchComponent } from "../components/ManualSearchInput";
import AnalyticsPage from "./AnalyticsPage";
import Spline from "@splinetool/react-spline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
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
import { dbFoodMethods, dbUserMethods } from "../middleware/dbMethods";
import Cookies from "js-cookie";
import { Scan } from "../components/scan";
import PageNotification from "../components/PageNotification";
import currDayCalculator from "../middleware/currDayCalculator";
// import { useHistory } from 'react-router-dom';
import BarChart from "../components/BarChart";
import AnalyticsHomePage from "../components/analyticsHomepage";

import Carousel from "react-bootstrap/Carousel";
// import ExampleCarouselImage from 'components/ExampleCarouselImage';
import carouselOne from "/carousel1.jpg";
import carouselTwo from "/carousel2.jpg";
import carouselThird from "/carousel3.jpg";
import carouselFourth from "/carousel4.jpg";
import carouselFifth from "/carousel5.jpg";
import { useNavigate } from "react-router-dom/dist";

import PlatesHomepage from "../components/platesHomepage";
const HomePage = () => {
  const [overlayData, setOverlayData] = useAtom(RecipeOverlay);
  // const [currMealPlan, setCurrMealPlan] = useState(null);
  const [currMealPlan, setCurrMealPlan] = useState(null);
  const [currDisplayMealPlan, setCurrDisplayMealPlan] = useState(null);
  const [completedPlan, setCompletedPlan] = useState(null);
  const [MealPlan, setMealPlan] = useState(null);

  const dayIndex = 7;
  const [weights, setWeight] = useState([]);
  const [avgCal, setAvgCal] = useState("");
  const [diffWeight, setDiffWeight] = useState("");
  const [formattedDates, setFormattedDates] = useState([]);
  const [notiMessage, setNotiMessage] = useState("");
  const [notiRender, setNotiRender] = useState(false);
  const [exist, setExist] = useState(false);

  function showNotification(message) {
    console.log("showing notification");
    setNotiMessage(message);
    setNotiRender(true);
  }

  const fetchData = async () => {
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
    setCurrMealPlan(await dbFoodMethods.getMealPlan());
    setCurrDisplayMealPlan(await dbFoodMethods.getDisplayMealPlan());
    setCompletedPlan(await dbFoodMethods.getCompleted());
    // setMealPlan(await dbFoodMethods.getMealPlan());
  };
  useEffect(() => {
    const checkUser = async () => {
      const result = await dbUserMethods.getUserData();
      console.log(result.formInput);
      if (result.formInput != undefined) {
        console.log("yes");
        fetchData();
        setExist(true);
      }
    };
    checkUser();
  }, []);

  var currDay = 0;

  if (currDisplayMealPlan?.DisplayMealPlan) {
    currDay = currDayCalculator(currDisplayMealPlan.CreatedAt);
    // FOR TESTING PURPOSES ONLY (NEED TO +1 )
  }

  return exist ? (
    <>
      <NavBar />
      <PageNotification message={notiMessage} render={notiRender} />
      {overlayData}

      <Row xs={1} md={3} id="homepage">
        {/* <Col>
          <spline-viewer url="https://prod.spline.design/TGgKuiS6HyavoK5J/scene.splinecode" events-target="global" logo="No"></spline-viewer>
        </Col> */}
        <Col md={8}>
          {/* <Stack gap={2} >  */}
          <div className="neuphormicBox">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h1>{currDay === 0 ? "Upcoming" : "Today's"} Meal Plan</h1>
              <div>
                <Button
                  className="chooseBtn"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  href="/mealplan"
                >
                  See All
                </Button>
              </div>
            </div>

            <Row xs={1} md={3} lg={3}>
              {/* {todayMealDisplay} */}
              {/* {console.log(currMealPlan)} */}
              {/* {console.log(currMealPlan["DisplayMealPlan"]["1"]["breakfast"])} */}

              {currDisplayMealPlan ? (
                <>
                  {currDisplayMealPlan.DisplayMealPlan[currDay] ? (
                    <>
                      {["breakfast", "lunch", "dinner"].map((mealType) => (
                        <Col key={`${mealType}home`}>
                          {/* <h4>{mealType}</h4> */}
                          {Object.keys(
                            currDisplayMealPlan.DisplayMealPlan[currDay]
                          ).includes(mealType) ? (
                            <MealPlanCard
                              key={`${mealType}${currDay}card`}
                              recipe={
                                Object.keys(
                                  currDisplayMealPlan.DisplayMealPlan[currDay][
                                    mealType
                                  ]
                                )[0]
                              }
                              render={
                                currDisplayMealPlan.DisplayMealPlan[currDay][
                                  mealType
                                ][
                                  Object.keys(
                                    currDisplayMealPlan.DisplayMealPlan[
                                      currDay
                                    ][mealType]
                                  )[0]
                                ] == 0
                                  ? true
                                  : false
                              }
                              day={currDay}
                              mealType={mealType}
                              dayIndex={currDay}
                              currMealPlan={currMealPlan}
                              currDisplayMealPlan={currDisplayMealPlan}
                            />
                          ) : (
                            // <MealPlanCardHome
                            //   recipe={
                            //     Object.keys(
                            //       currMealPlan.DisplayMealPlan[currDay][mealType]
                            //     )[0]
                            //   }
                            // />
                            <p>No Meal</p>
                          )}
                        </Col>
                      ))}
                    </>
                  ) : (
                    <>
                      {console.log(currDisplayMealPlan.DisplayMealPlan)}
                      {console.log(currDay)}
                      {Object.keys(
                        currDisplayMealPlan.DisplayMealPlan[currDay + 1]
                      ).length > 0 ? (
                        <>
                          {["breakfast", "lunch", "dinner"].map((mealType) => (
                            <Col key={`${mealType}home`}>
                              {currDisplayMealPlan.DisplayMealPlan[currDay + 1][
                                mealType
                              ] ? (
                                <>
                                {/* {currDisplayMealPlan.DisplayMealPlan[currDay+1][mealType][
                                  Object.keys(currDisplayMealPlan.DisplayMealPlan[currDay+1][mealType])[0]
                                ] ? (
                                  <h4>{mealType} completed!</h4>
                                ) : (
                                  <h4>{mealType}</h4>
                                )} */}
                                <MealPlanCard 
                                    key={`${mealType}${currDay}card`}
                                    recipe={Object.keys(currDisplayMealPlan.DisplayMealPlan[currDay+1][mealType])[0]}
                                    render={currDisplayMealPlan.DisplayMealPlan[currDay+1][mealType][Object.keys(currDisplayMealPlan.DisplayMealPlan[currDay+1][mealType])[0]] == 0 ? true : false}
                                    day={currDay}
                                    mealType={mealType}
                                    dayIndex={currDay}
                                    currMealPlan={currMealPlan}
                                    currDisplayMealPlan={currDisplayMealPlan}
                                  />
                                  {/* <MealPlanCardHome
                                  recipe={Object.keys(currDisplayMealPlan.DisplayMealPlan[currDay + 1][mealType])[0]}
                                /> */}
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
          <div className="neuphormicBox" style={{ textAlign: "center" }}>
            <Stack gap={2}>
              {/* <Button className="homePageBtn">Scan</Button> */}
              <h3>Manual Add</h3>
              <Button
                className="chooseBtn"
                onClick={() => {
                  setOverlayData(
                    <ManualSearchComponent
                      currDay={currDay + 2}
                      showNotification={showNotification}
                    />
                  );
                }}
              >
                Manual Search
              </Button>
            </Stack>
          </div>
        </Col>
      </Row>
      <Row>
        {exist && completedPlan ? (
          <AnalyticsHomePage completedPlan={completedPlan} />
        ) : (
          <></>
        )}
      </Row>
      <Row>
        {/* <PlatesHomepage colors={colorArray} /> */}
        {currMealPlan ? <PlatesHomepage currMealPlan={currMealPlan} /> : <></>}
        {weights && formattedDates ? (
          <BarChart Weights={weights} Dates={formattedDates} />
          // <></>
        ) : (
          <></>
        )}
      </Row>
      <Row>
        <Card>
          <Card.Body>
            <Card.Title style={{ color: "black" }}>{avgCal}</Card.Title>

            <Card.Text>Avg. Cals Per Day</Card.Text>
          </Card.Body>
        </Card>
      </Row>
      <Row>
        <Card>
          <Card.Body>
            <Card.Title style={{ color: "black" }}>{diffWeight} kg</Card.Title>

            <Card.Text>
              {diffWeight < 0 ? "Total Weight Gain" : "Total Weight Loss"}
            </Card.Text>
          </Card.Body>
        </Card>
      </Row>
    </>
  ) : (
    //if user is new
    <>
      <NavBar />
      <Carousel fade controls={false} interval={3000} wrap={true}>
        <Carousel.Item className="carouselItem">
          <img src={carouselOne} alt="first slide" className="carouselImg" />
          <Carousel.Caption className="carouselCaption">
            <h1>Welcome to MenuMate</h1>
            <h1>Start by creating a meal plan!</h1>
            <Button className="createBtn custom-clicked-button">
              <FontAwesomeIcon className="plusIcon" icon={faPlus} />
              Create Meal Plan!
            </Button>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item className="carouselItem">
          <img src={carouselTwo} alt="second slide" className="carouselImg" />
          <Carousel.Caption className="carouselCaption">
            <h1>Welcome to MenuMate</h1>
            <h1>Start by creating a meal plan!</h1>
            <Button className="createBtn custom-clicked-button">
              <FontAwesomeIcon className="plusIcon" icon={faPlus} />
              Create Meal Plan!
            </Button>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item className="carouselItem">
          <img src={carouselThird} alt="third slide" className="carouselImg" />
          <Carousel.Caption className="carouselCaption">
            <h1>Welcome to MenuMate</h1>
            <h1>Start by creating a meal plan!</h1>
            <Button className="createBtn custom-clicked-button">
              <FontAwesomeIcon className="plusIcon" icon={faPlus} />
              Create Meal Plan!
            </Button>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item className="carouselItem">
          <img
            src={carouselFourth}
            alt="fourth slide"
            className="carouselImg"
          />
          <Carousel.Caption className="carouselCaption">
            <h1>Welcome to MenuMate</h1>
            <h1>Start by creating a meal plan!</h1>
            <Button className="createBtn custom-clicked-button">
              <FontAwesomeIcon className="plusIcon" icon={faPlus} />
              Create Meal Plan!
            </Button>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item className="carouselItem">
          <img src={carouselFifth} alt="third slide" className="carouselImg" />
          <Carousel.Caption className="carouselCaption">
            <h1>Welcome to MenuMate</h1>
            <h1>Start by creating a meal plan!</h1>
            <Button
              className="createBtn custom-clicked-button"
              style={{ marginTop: "10px" }}
              href="/input"
            >
              <FontAwesomeIcon className="plusIcon" icon={faPlus} />
              Create Meal Plan!
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  );
};

export default HomePage;
