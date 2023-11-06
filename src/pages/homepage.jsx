import React, { useEffect, useState, useRef } from "react";
// import { fetcherPOST } from "../middleware/Fetcher";
import { NavBar } from "../components";
import { Row, Col, Button, Stack, Card, Container } from "react-bootstrap";
import { Box } from "@mui/material";
import { useAtom } from "jotai";
import { RecipeOverlay } from "../atoms/recipeOverlay";
import { Modal } from "@mui/material";
import { ManualSearchComponent } from "../components/ManualSearchInput";
import AnalyticsPage from "./AnalyticsPage";
// import Spline from "@splinetool/react-spline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
// import {
//   collection,
//   doc,
//   getDoc,
//   setDoc,
//   addDoc,
//   query,
//   getDocs,
//   serverTimestamp,
// } from "firebase/firestore";
// import { db, auth } from "../../firebase";
// import getMealPlan from "../middleware/getMealPlan";
import { MealPlanCard, MealPlanCardHome } from "../components/MealPlanCard";
import { isMobile } from "react-device-detect";
import { dbFoodMethods, dbUserMethods } from "../middleware/dbMethods";
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
import { useScroll, animated, useSpring } from "@react-spring/web";
import { useInView } from "react-intersection-observer";
import Lottie from "lottie-react";
import animationData from "../assets/food.json";
import LoadingAnimationData from "../assets/loading.json";
import { faUnlockKeyhole } from "@fortawesome/free-solid-svg-icons";
import PlatesHomepage from "../components/platesHomepage";
const HomePage = () => {
  const navigate = useNavigate();
  const [overlayData, setOverlayData] = useAtom(RecipeOverlay);
  // const [currMealPlan, setCurrMealPlan] = useState(null);
  const [currMealPlan, setCurrMealPlan] = useState(null);
  const [currDisplayMealPlan, setCurrDisplayMealPlan] = useState(null);
  const [completedPlan, setCompletedPlan] = useState(null);
  const [MealPlan, setMealPlan] = useState(null);
  const [weights, setWeight] = useState([]);
  const [avgCal, setAvgCal] = useState("");
  const [diffWeight, setDiffWeight] = useState("");
  const [formattedDates, setFormattedDates] = useState([]);
  const [notiMessage, setNotiMessage] = useState("");
  const [notiRender, setNotiRender] = useState(false);
  const [exist, setExist] = useState(false);

  const [buffer, setBuffer] = useState(true);
  const [analytics, setAnalytics] = useState(false);

  const [ref1, inView1] = useInView({
    triggerOnce: true,
  });
  const AnimatedContainer = animated(Container);
  const props1 = useSpring({
    opacity: inView1 ? 1 : 0,
    transform: inView1 ? "translateX(0)" : "translateX(100%)",
  });

  // For animated.div
  const [ref2, inView2] = useInView({
    triggerOnce: true,
  });
  const props2 = useSpring({
    opacity: inView2 ? 1 : 0,
    transform: inView2 ? "translateX(0)" : "translateX(100%)",
  });

  const animation = useSpring({
    from: { opacity: 0, transform: "translateY(10%)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { tension: 220, friction: 120 },
  });
  function showNotification(message) {
    // console.log("showing notification");
    setNotiMessage(message);
    setNotiRender(true);
  }

  function smoothScrollTo(targetId) {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
      });
    }
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
    setAnalytics(await dbFoodMethods.checkAnalytics());
    // setMealPlan(await dbFoodMethods.getMealPlan());
  };
  useEffect(() => {
    const checkUser = async () => {
      const result = await dbUserMethods.getUserData();
      // console.log(result.formInput);
      if (result.formInput != undefined) {
        // console.log("yes");
        fetchData();
        setExist(true);
      }
      setBuffer(false);
    };
    checkUser();
  }, []);

  var currDay = 0;

  if (currDisplayMealPlan?.DisplayMealPlan) {
    currDay = currDayCalculator(currDisplayMealPlan.CreatedAt);
    // FOR TESTING PURPOSES ONLY (NEED TO +1 )
  }

  return buffer ? (
    // <Lottie
    //   animationData={LoadingAnimationData} // Your animation data
    //   loop={true} // Set to true for looped animations
    //   autoplay={true} // Set to true to play the animation automatically
    //   style={{ width: "700px", height: "700px" }}
    // />
    <></>
  ) : exist ? (
    <>
      <NavBar />
      <PageNotification message={notiMessage} render={notiRender} />
      {overlayData}
      <animated.div style={animation}>
        <Row
          id="homepage"
          style={{
            marginLeft: "0px",
            marginRight: "0px",
          }}
        >
          <Col className="">
            <div style={{ textAlign: "center" }} className="welcome">
              <h1>Welcome to MenuMate</h1>
              <h5>Plan Your Plates, Savor the Taste!</h5>
              <Button
                className="createBtn custom-clicked-button"
                onClick={() => smoothScrollTo("today")}
              >
                What's Cooking Today?
              </Button>
              <span style={{ margin: "5px" }}></span>
              <Button
                className="createBtn custom-clicked-button"
                onClick={() => smoothScrollTo("insights")}
              >
                See Your Insights!
              </Button>
            </div>
          </Col>

          <Col className="col-6 lottieHome" style={{ marginTop: "50px" }}>
            <Lottie
              style={{ height: "95%", width: "90%", padding: "0px" }}
              animationData={animationData} // Your animation data
              loop={true} // Set to true for looped animations
              autoplay={true} // Set to true to play the animation automatically
            />
          </Col>
        </Row>
      </animated.div>
      {/* START OF CURRENT MEAL PLAN */}
      <AnimatedContainer fluid style={props1} ref={ref1}>
        <Row id="today"></Row>
        <Row style={{ marginTop: "100px" }}>
          <Col className="todayCol">
            <Row style={{ marginBottom: "30px", maxWidth: "100%" }}>
              <Col className="col-6 upcomingTitle">
                <h1>{currDay === 0 ? "Upcoming" : "Today's"} Meal Plan</h1>
              </Col>

              <Col
                className="col-6 homeBtn"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button className="chooseBtn" href="/mealplan">
                  See All
                </Button>
                <div style={{ margin: "10px" }}></div>
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
              </Col>
              {/* <Col style={{ display: "flex", alignItems: "center", justifyContent: "start" }}> */}

              {/* </Col> */}
            </Row>

            <Row
              xs={1}
              sm={2}
              md={2}
              lg={3}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
                margin: "0px",
              }}
            >
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
                            <>
                              {/* <h4>{mealType}</h4> */}
                              <p style={{ color: "#1F5E4B" }}>No Meal</p>
                            </>
                          )}
                        </Col>
                      ))}
                    </>
                  ) : (
                    <>
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
                                  <MealPlanCard
                                    key={`${mealType}${currDay}card`}
                                    recipe={
                                      Object.keys(
                                        currDisplayMealPlan.DisplayMealPlan[
                                          currDay + 1
                                        ][mealType]
                                      )[0]
                                    }
                                    render={
                                      currDisplayMealPlan.DisplayMealPlan[
                                        currDay + 1
                                      ][mealType][
                                        Object.keys(
                                          currDisplayMealPlan.DisplayMealPlan[
                                            currDay + 1
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
                                </>
                              ) : (
                                <>
                                  <h4>{mealType}</h4>
                                  <p style={{ color: "#1F5E4B" }}>
                                    No meals planned
                                  </p>
                                </>
                              )}
                            </Col>
                          ))}
                        </>
                      ) : (
                        <p style={{ color: "#1F5E4B" }}>No meals planned</p>
                      )}
                    </>
                  )}
                </>
              ) : (
                <h4 style={{ color: "#1F5E4B" }}>No Meal Plan</h4>
              )}
            </Row>
          </Col>
        </Row>
      </AnimatedContainer>
      <animated.div style={props2} ref={ref2}>
        <Row id="insights">
          <h1>Your Insights</h1>
        </Row>
      </animated.div>
      {analytics ? (
        <animated.div style={props2} ref={ref2}>
          <Row>
            {/* THIS IS BAR CHART */}
            <Col
              className="col-6 barChart"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div>
                {weights && formattedDates ? (
                  <BarChart
                    Weights={weights}
                    Dates={formattedDates}
                    style={{ margin: "0" }}
                  />
                ) : (
                  <></>
                )}
              </div>
            </Col>

            <Col className="col-6 infoCard">
              {/* THIS IS CARDS */}
              <Row
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: "50px",
                  marginTop: "30px",
                  margin: "20px",
                }}
              >
                <Col className="insightInfo">
                  <Card
                    style={{
                      margin: "0px",
                      backgroundColor: "#3EBC96",
                      width: "200px",
                      borderRadius: "20px",
                      height: "100px",
                    }}
                  >
                    <Card.Body style={{ textAlign: "center" }}>
                      <Card.Title
                        style={{
                          color: "#F6FEFC",
                          fontWeight: "bold",
                          fontSize: "20px",
                        }}
                      >
                        {avgCal}
                      </Card.Title>

                      <Card.Text
                        style={{ color: "#F6FEFC", fontWeight: "bold" }}
                      >
                        Avg. Cals Per Day
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>

                <Col className="insightInfo">
                  <Card
                    style={{
                      margin: "0px",
                      backgroundColor: "#3EBC96",
                      width: "200px",
                      borderRadius: "20px",
                      height: "100px",
                    }}
                  >
                    <Card.Body style={{ textAlign: "center" }}>
                      <Card.Title
                        style={{
                          color: "#F6FEFC",
                          fontWeight: "bold",
                          fontSize: "20px",
                        }}
                      >
                        {diffWeight} kg
                      </Card.Title>

                      <Card.Text
                        style={{ color: "#F6FEFC", fontWeight: "bold" }}
                      >
                        {diffWeight < 0
                          ? "Total Weight Gain"
                          : "Total Weight Loss"}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              {/* THIS IS COMPLETION */}

              <Row className="mealBar">
                {/* THIS IS PROGRESS BAR */}
                <Row
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <h3 style={{ marginBottom: "30px" }}>
                    Today's Meal Progress
                  </h3>
                  <div className="progBar">
                    {exist && completedPlan ? (
                      <AnalyticsHomePage completedPlan={completedPlan} />
                    ) : (
                      <></>
                    )}
                  </div>
                </Row>

                {/* THIS IS PLATES */}
                <Row
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "80px",
                  }}
                >
                  <h3 style={{ marginBottom: "30px" }}>
                    Weekly Meals Completed
                  </h3>

                  <div className="plates">
                    {currMealPlan ? (
                      <PlatesHomepage currMealPlan={currMealPlan} />
                    ) : (
                      <></>
                    )}
                  </div>
                </Row>
              </Row>
            </Col>
          </Row>
        </animated.div>
      ) : (
        <animated.div style={props2} ref={ref2}>
          <Row>
            <Col
              className="col-md-6 col-12"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "#3EBC96",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "50%",
                  borderRadius: "50px",
                  textAlign: "center",
                  padding: "20px",
                }}
              >
                <div>
                  <FontAwesomeIcon
                    icon={faUnlockKeyhole}
                    style={{ color: "#F6FEFC", width: "30px", height: "30px" }}
                  />
                </div>
                <div>
                  <h4 style={{ color: "#F6FEFC", marginTop: "5px" }}>
                    Finish your first week before analytics can be displayed
                  </h4>
                </div>
              </div>
            </Col>

            <Col className="col-6 infoCard">
              <Row
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: "50px",
                  marginTop: "30px",
                  marginRight: "20px",
                }}
              >
                <Col
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Card
                    style={{
                      margin: "0px",
                      backgroundColor: "#3EBC96",
                      borderRadius: "20px",
                      width: "250px ",
                      height: "auto",
                      marginBottom: "8px",
                      marginLeft: "20px",
                    }}
                  >
                    <Card.Body style={{ textAlign: "center" }}>
                      <Card.Title
                        style={{
                          color: "#F6FEFC",
                          fontWeight: "bold",
                          fontSize: "20px",
                        }}
                      >
                        <FontAwesomeIcon icon={faUnlockKeyhole} />
                      </Card.Title>

                      <Card.Text
                        style={{ color: "#F6FEFC", fontWeight: "bold" }}
                      >
                        Avg. Cals Per Day
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>

                <Col
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Card
                    style={{
                      margin: "0px",
                      backgroundColor: "#3EBC96",
                      borderRadius: "20px",
                      width: "250px ",
                      height: "auto",
                      marginLeft: "20px",
                      marginBottom: "8px",
                    }}
                  >
                    <Card.Body style={{ textAlign: "center" }}>
                      <Card.Title
                        style={{
                          color: "#F6FEFC",
                          fontWeight: "bold",
                          fontSize: "20px",
                        }}
                      >
                        <FontAwesomeIcon icon={faUnlockKeyhole} />
                      </Card.Title>

                      <Card.Text
                        style={{ color: "#F6FEFC", fontWeight: "bold" }}
                      >
                        {diffWeight < 0
                          ? "Total Weight Gain"
                          : "Total Weight Loss"}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Row className="mealBar">
                {/* THIS IS PROGRESS BAR */}
                <Row
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <h3 style={{ marginBottom: "30px" }}>
                    Today's Meal Progress
                  </h3>
                  <div className="progBar">
                    {exist && completedPlan ? (
                      <AnalyticsHomePage completedPlan={completedPlan} />
                    ) : (
                      <></>
                    )}
                  </div>
                </Row>

                {/* THIS IS PLATES */}
                <Row
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "80px",
                    paddingLeft: "30px",
                  }}
                >
                  <h3 style={{ marginBottom: "30px" }}>
                    Weekly Meals Completed
                  </h3>

                  <div className="plates">
                    {currMealPlan ? (
                      <PlatesHomepage currMealPlan={currMealPlan} />
                    ) : (
                      <></>
                    )}
                  </div>
                </Row>
              </Row>
            </Col>
          </Row>
        </animated.div>
      )}
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
            <Button
              className="createBtn custom-clicked-button"
              onClick={() => navigate("/input")}
            >
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
            <Button
              className="createBtn custom-clicked-button"
              onClick={() => navigate("/input")}
            >
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
            <Button
              className="createBtn custom-clicked-button"
              onClick={() => navigate("/input")}
            >
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
            <Button
              className="createBtn custom-clicked-button"
              onClick={() => navigate("/input")}
            >
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
              onClick={() => navigate("/input")}
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
