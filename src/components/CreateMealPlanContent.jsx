import React, { useState, useEffect } from "react";

import { Card, Button, Container, Row, Col } from "react-bootstrap";
import {
  collection,
  doc,
  getDoc,
  setDoc,
  addDoc,
  query,
  getDocs,
} from "firebase/firestore";
import { db, auth } from "../../firebase";
import StepProgressBar from "./StepProgressBar";
import { fetcher } from "../getters/Fetcher";
import { pageDataGetter } from "./pageDataGetter";
import { FinaliseRecipeCard, RecpieCard } from "./RecipeCard";
import Loader from "./Loader";
import NavBar from "./NavBar";

import { useAtom } from "jotai";
import { RecipeOverlay } from "../atoms/recipeOverlay";
import { MealPlan } from "../atoms/mealPlan";
import { Kcal } from "../atoms/KcalAtom";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";

const CreateMealPages = {
  1: async function (
    setPageNo,
    hasFetched,
    data,
    setApiData,
    selected,
    setSelected,
    setOverlayData,
    currCal
  ) {
    function Renderpage() {
      let CardData = [];

      let bfastCalories = currCal * 0.3;

      if (!hasFetched) {
        const [response, setResponse] = useState(null);
        pageDataGetter(
          "breakfast, morning meal, brunch",
          bfastCalories,
          setResponse
        );
        setApiData((prevApiData) => ({
          ...prevApiData,
          1: {
            hasFetched: true,
            data: response,
          },
        }));

        data = response;
      }
      console.log(data);

      const [currSel, setCurrSel] = useState(selected["breakfast"]);

      if (data !== null) {
        data.forEach((recipe) => {
          CardData.push(<RecpieCard recipe={recipe} setter={setCurrSel} />);
        });
      }

      if (Object.keys(currSel).length > 0) {
        setSelected((prev) => ({
          ...prev,
          breakfast: currSel,
        }));
      }

      return (
        <>
          <Container>
            <Row className="">
              <Col>
                <h2>Pick Your Breakfast Items!</h2>
              </Col>
              <Col>
                <div style={{ textAlign: "right" }}>
                  <Button
                    className="buttonPrimary"
                    onClick={() => setPageNo(2)}
                  >
                    Next Page
                  </Button>
                </div>
              </Col>
            </Row>

            <Row xs={1} md={2} lg={3}>
              {CardData.length > 0 ? CardData : <Loader />}
            </Row>
          </Container>
        </>
      );
    }

    return (
      <>
        <Renderpage />
      </>
    );
  },

  2: async function (
    setPageNo,
    hasFetched,
    data,
    setApiData,
    selected,
    setSelected,
    setOverlayData,
    currCal
  ) {
    function Renderpage() {
      let CardData = [];

      let lunchCals = currCal * 0.5;

      if (!hasFetched) {
        const [response, setResponse] = useState(null);

        pageDataGetter(
          "lunch, side dish, main course, main dish, dinner",
          lunchCals,
          setResponse
        );

        setApiData((prevApiData) => ({
          ...prevApiData,
          2: {
            hasFetched: true,
            data: response,
          },
        }));

        data = response;
      }

      console.log(data);

      const [currSel, setCurrSel] = useState(selected["lunch"]);

      if (data !== null) {
        data.forEach((recipe) => {
          CardData.push(<RecpieCard recipe={recipe} setter={setCurrSel} />);
        });
      }

      if (Object.keys(currSel).length > 0) {
        setSelected((prev) => ({
          ...prev,
          lunch: currSel,
        }));
      }

      return (
        <>
          <Container>
            <Row>
              <Col>
                <h2>Pick Your Lunch Items!</h2>
              </Col>
              <Col>
                <div style={{ textAlign: "right" }}>
                  <Button onClick={() => setPageNo(3)}>Next Page</Button>
                </div>
              </Col>
            </Row>
            <Row xs={1} md={2} lg={3}>
              {CardData.length > 0 ? CardData : <Loader />}
            </Row>
          </Container>
        </>
      );
    }

    return (
      <>
        <Renderpage />
      </>
    );
  },

  3: async function (
    setPageNo,
    hasFetched,
    data,
    setApiData,
    selected,
    setSelected,
    setOverlayData,
    currCal
  ) {
    function Renderpage() {
      let CardData = [];

      let dinnerCals = currCal * 0.2;

      if (!hasFetched) {
        const [response, setResponse] = useState(null);

        pageDataGetter("dinner, main course", dinnerCals, setResponse);

        setApiData((prevApiData) => ({
          ...prevApiData,
          3: {
            hasFetched: true,
            data: response,
          },
        }));

        data = response;
      }

      console.log(data);

      const [currSel, setCurrSel] = useState(selected["dinner"]);

      if (data !== null) {
        data.forEach((recipe) => {
          CardData.push(<RecpieCard recipe={recipe} setter={setCurrSel} />);
        });
      }

      if (Object.keys(currSel).length > 0) {
        setSelected((prev) => ({
          ...prev,
          dinner: currSel,
        }));
      }

      console.log(selected);

      return (
        <>
          <Container>
            <Row>
              <Col>
                <h2>Pick Your Dinner Items!</h2>
              </Col>
              <Col>
                <div style={{ textAlign: "right" }}>
                  <Button onClick={() => setPageNo(4)}>Next Page</Button>
                </div>
              </Col>
            </Row>

            <Row xs={1} md={2} lg={3}>
              {CardData.length > 0 ? CardData : <Loader />}
            </Row>
          </Container>
        </>
      );
    }

    return (
      <>
        <Renderpage />
      </>
    );
  },

  4: async function (
    //create randomiser function
    setPageNo,
    hasFetched,
    data,
    setApiData,
    selected,
    setSelected,
    setOverlayData
  ) {
    function Renderpage() {
      const navigate = useNavigate();

      const [mealPlan, setMealPlan] = useAtom(MealPlan);
      const [mealPlanCopy, setMealPlanCopy] = useState([]);
      const [total, setTotal] = useState(0);
      let CardData = [];

      // console.log(selected)
      // console.log(Object.keys(selected.breakfast))
      // console.log(Object.keys(selected.breakfast).length)

      if (
        Object.keys(selected["breakfast"]).length > 0 &&
        Object.keys(selected["lunch"]).length > 0 &&
        Object.keys(selected["dinner"]).length > 0
      ) {
        // console.log(selected)

        for (const meal in selected) {
          const [response, setResponse] = useState(null);

          let mealcards = [];

          fetcher(
            "/foodAPI/getBulk/?",
            {
              ids: Object.keys(selected[meal]).join(),
            },
            setResponse
          );

          if (response?.length > 0) {
            response.forEach((recipe) => {
              mealcards.push(
                <FinaliseRecipeCard recipe={recipe} selected={selected} />
              );
            });

            let mealdata = (
              <>
                <h3>{meal}</h3>
                <Row xs={1} md={2} lg={3}>
                  {mealcards}
                </Row>
                <br></br>
              </>
            );
            CardData.push(mealdata);
          }
        }

        console.log(selected);
      }
      const countMealPlansInHistory = async (username) => {
        const docRef = doc(db, "Food", username);
        const subcollectionRef = collection(docRef, "MealPlanHistory");
        const Query = query(subcollectionRef);
        const snapshot = await getDocs(Query);
        return snapshot.size;
      };
      const addMealPlanToHistory = async (plan, username) => {
        // Get the number of documents in the `MealPlanHistory` subcollection.
        const count = await countMealPlansInHistory(username);

        // Add a new document to the `MealPlanHistory` subcollection with a sequential document ID.
        const docRef = doc(
          db,
          "Food",
          username,
          "MealPlanHistory",
          String(count + 1)
        );
        await setDoc(docRef, {
          Plan: plan,
          CreatedAt: Date.now(),
        });
      };
      // plan1 is for recal, plan2 is for display
      const addMeal = async (plan1, plan2) => {
        if (plan1.length !== 0) {
          console.log(JSON.stringify(plan1));
          try {
            const username = auth.currentUser.email;
            await setDoc(doc(db, "Food", username), {
              Plan: plan1,
              DisplayPlan: plan2,
              CreatedAt: Date.now(),
              Completed: {},
              Added: [],
            }).then(() => {
              console.log("Document written");
              addMealPlanToHistory(plan1, username);
              // navigate("/home");
            });
          } catch (e) {
            console.error("Error adding document: ", e);
          }
        }
      };
      useEffect(() => {
        console.log(mealPlan);
        console.log(mealPlanCopy);
        if (
          Object.keys(mealPlan).length !== 0 &&
          Object.keys(mealPlanCopy).length !== 0
        ) {
          addMeal(mealPlan, mealPlanCopy);
        }
      }, [mealPlan, mealPlanCopy]);
      useEffect(() => {
        console.log(total);
      }, [total]);
      return (
        <>
          <Container>
            <Row>
              <Col>
                <h2>Finalise Your Items!</h2>
              </Col>
              <Col>
                <div style={{ textAlign: "right" }}>
                  <Button
                    onClick={() => {
                      let sum = 0;
                      for (let i = 1; i < 8; i++) {
                        ["breakfast", "lunch", "dinner"].forEach((meal) => {
                          let randomDish = Object.keys(selected[meal])[
                            Math.floor(
                              Math.random() * Object.keys(selected[meal]).length
                            )
                          ];

                          let value = selected[meal][randomDish];
                          sum += value;

                          setMealPlan((prev) => ({
                            ...prev,
                            [i]: {
                              ...prev[i],
                              [meal]: {
                                [randomDish]: value,
                              },
                            },
                          }));

                          setMealPlanCopy((prev) => ({
                            ...prev,
                            [i]: {
                              ...prev[i],
                              [meal]: {
                                [randomDish]: 0,
                              },
                            },
                          }));
                        });
                      }

                      console.log(mealPlanCopy); // use for front end display

                      setTotal(Math.round(sum));
                    }}
                  >
                    Next Page
                  </Button>
                </div>
              </Col>
            </Row>

            <Row xs={1} md={2} lg={3}>
              {CardData.length > 0 ? (
                CardData
              ) : (
                <p>Please choose at least 1 meal</p>
              )}
            </Row>
          </Container>
        </>
      );
    }
    return (
      <>
        <Renderpage />
      </>
    );
  },
};

export default function CreateMealContent() {
  // replace with atom when ready
  const [calories, setCalories] = useAtom(Kcal);
  // const weekly_cal = Kcal;
  // const daily_cal = weekly_cal / 7;

  const [mealPlan, setMealPlan] = useAtom(MealPlan);
  const [overlayData, setOverlayData] = useAtom(RecipeOverlay);

  const [activePage, setActivePage] = useState(1);
  const [currPage, setCurrPage] = useState(null);
  const [selected, setSelected] = useState({
    breakfast: {},
    lunch: {},
    dinner: {},
  });

  const [apiData, setApiData] = useState({
    1: {
      hasFetched: false,
      data: null,
    },
    2: {
      hasFetched: false,
      data: null,
    },
    3: {
      hasFetched: false,
      data: null,
    },
    4: {
      hasFetched: false,
      data: null,
    },
  });

  useEffect(() => {
    async function fetchPageData() {
      const pageData = await CreateMealPages[activePage](
        setActivePage,
        apiData[activePage].hasFetched,
        apiData[activePage].data,
        setApiData,
        selected,
        setSelected,
        setOverlayData,
        2000
      );
      setCurrPage(pageData);
    }

    fetchPageData();
  }, [activePage]);

  return (
    <>
      <div>
        {overlayData}
        <Container>
          <Row>
            <StepProgressBar
              page={activePage}
              onPageNumberClick={setActivePage}
            />
          </Row>
        </Container>
        {currPage}
      </div>
    </>
  );
}
