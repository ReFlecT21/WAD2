import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Container, Row, Button } from "react-bootstrap";
import { NavBar } from "../components";
import StepProgressBar from "../components/StepProgressBar";
import { pageDataGetter } from "../components/pageDataGetter";

import { RecipeOverlay } from "../atoms/recipeOverlay";
import { useAtom } from "jotai";
import {
  CreateMealPlanContentFinalise,
  CreateMealPlanContentv2,
} from "../components/CreateMealPlanContentv2";
import { RecalAtom } from "../atoms/recal";
import Cookies from "js-cookie";
import { dbFoodMethods } from "../middleware/dbMethods";

export default function ChooseMealsV2() {
  const [recal, setRecal] = useState(Cookies.get("recal"));
  const [calories, setCalories] = useState(Cookies.get("calories"));
  // console.log(recal);

  const navigate = useNavigate();
  const [overlayData, setOverlayData] = useAtom(RecipeOverlay);

  // console.log(`Calories: ${calories}`, `Recal: ${recal}`);
  // console.log(`Calories: ${calories}`, `Recal: ${recal}`);

  useEffect(() => {
    if (!Cookies.get("calories")) {
      navigate("/input");
    } else {
      // setOverlayData([]);
    }
  }, []);

  const [activePage, setActivePage] = useState(1);

  const [breakfastSelected, setBreakfastSelected] = useState({});
  const [lunchSelected, setLunchSelected] = useState({});
  const [dinnerSelected, setDinnerSelected] = useState({});

  // ------------------------ api data on mount
  const [response, setResponse] = useState(null);
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
  });
  const paramList = {
    1: [
      ["breakfast, morning meal, brunch"],
      calories * 0.3,
      "Breakfast",
      setBreakfastSelected,
      breakfastSelected,
    ],
    2: [
      ["lunch, side dish, main course, main dish"],
      calories * 0.4,
      "Lunch",
      setLunchSelected,
      lunchSelected,
    ],
    3: [
      ["dinner, main course"],
      calories * 0.3,
      "Dinner",
      setDinnerSelected,
      dinnerSelected,
    ],
  };

  // const test = (response) => {
  //   console.log(response);

  //   setApiData((prevApiData) => ({
  //     ...prevApiData,
  //     [data]: {
  //       hasFetched: true,
  //       data: response,
  //     },
  //   }));
  // };

  useEffect(() => {
    for (const data in apiData) {
      if (!apiData[data].hasFetched) {

        pageDataGetter(paramList[data][0], paramList[data][1], (response) => {

          setApiData((prevApiData) => ({
            ...prevApiData,
            [data]: {
              hasFetched: true,
              data: response,
            },
          }));
        });
      }
    }
  }, [apiData]);
  // console.log(apiData);
  // ------------------------ api data on mount

  return (
    <>
      <NavBar />
      {overlayData}
      <Container>
        <Row className="createMealHeader">
          {recal != 0 ? (
            <>
              <h3>You are recalculating an old plan</h3>
              <p>You have 1 hour to replace your old plan</p>
            </>
          ) : (
            <h3>You are creating a new plan!</h3>
          )}
        </Row>
        <Row>
          <StepProgressBar
            page={activePage}
            onPageNumberClick={setActivePage}
          />
        </Row>
        <Row>
          {activePage < 4 ? (
            <CreateMealPlanContentv2
              pageNum={activePage}
              mealType={paramList[activePage][2]}
              setActivePage={setActivePage}
              recipes={apiData[activePage].data}
              selected={paramList[activePage][4]}
              selectedSetter={paramList[activePage][3]}
              bufferFlag={apiData[activePage].hasFetched}
            />
          ) : (
            <CreateMealPlanContentFinalise
              info={{
                Breakfast: {
                  data: breakfastSelected,
                  setter: setBreakfastSelected,
                },
                Lunch: { data: lunchSelected, setter: setLunchSelected },
                Dinner: { data: dinnerSelected, setter: setDinnerSelected },
              }}
              recal={recal}
            />
          )}
        </Row>
      </Container>
    </>
  );
}
