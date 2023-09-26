import React, { useState, useEffect } from "react";

import { Card, Button, Container, Row, Col } from "react-bootstrap";

import StepProgressBar from "./StepProgressBar";
import { fetcher } from "./Fetcher";
import { pageDataGetter } from "./pageDataGetter";
import { FinaliseRecipeCard, RecpieCard } from "./RecipeCard";
import Loader from "./Loader";
import NavBar from "./NavBar";
import { useAtom } from "jotai";
import { RecipeOverlay } from "../atoms/recipeOverlay";
import { MealPlan } from "../atoms/mealPlan";

import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";


const CreateMealPages = {
  1: async function (
    setPageNo,
    hasFetched,
    data,
    setApiData,
    selected,
    setSelected,
    setOverlayData,
    currCal,
  ) {
    function Renderpage() {
      let CardData = [];

      let bfastCalories = currCal*0.3

      if (!hasFetched) {
        const [response, setResponse] = useState(null);
        pageDataGetter("breakfast, morning meal, brunch", bfastCalories, setResponse);
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



      const [currSel, setCurrSel] = useState([])

      if (data !== null) {
        data.forEach((recipe) => {
          CardData.push(<RecpieCard recipe={recipe} setter={setCurrSel} />);
        });
      }

      if (currSel.length> 0){
        setSelected((prev) => ({
          ...prev,
          breakfast: currSel,
        }))
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
                  <Button onClick={() => setPageNo(2)}>Next Page</Button>
                </div>
              </Col>
            </Row>

            <Row xs={1} md={2} lg={3}>
              {
                CardData.length > 0 
                ? CardData 
                : <Loader />
              }
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
    currCal,
  ) {
    function Renderpage() {
      let CardData = [];

      let lunchCals = currCal*0.5

      if (!hasFetched) {
        const [response, setResponse] = useState(null);

        pageDataGetter("lunch, side dish, main course, main dish, dinner", lunchCals, setResponse);

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

      
      const [currSel, setCurrSel] = useState([])

      if (data !== null) {
        data.forEach((recipe) => {
          CardData.push(<RecpieCard recipe={recipe} setter={setCurrSel} />);
        });
      }

      if (currSel.length> 0){
        setSelected((prev) => ({
          ...prev,
          lunch: currSel,
        }))
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
              {
                CardData.length > 0 
                ? CardData 
                : <Loader />
              }
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
    currCal,
  ) {
    function Renderpage() {
      let CardData = [];

      let dinnerCals = currCal*0.2

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

      

      const [currSel, setCurrSel] = useState([])

      if (data !== null) {
        data.forEach((recipe) => {
          CardData.push(<RecpieCard recipe={recipe} setter={setCurrSel} />);
        });
      }

      if (currSel.length> 0){
        setSelected((prev) => ({
          ...prev,
          dinner: currSel,
        }))
      }

      console.log(selected)



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
              {
                CardData.length > 0 
                ? CardData 
                : <Loader />
              }
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

  4: async function (                                 //create randomiser function
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


      let CardData = [];
      
      if (selected.breakfast.length > 0 && selected.lunch.length > 0 && selected.dinner.length > 0) {
        // console.log(selected)
        
        for (const meal in selected){
          const [response, setResponse] = useState(null);
          
          let mealcards = []

          fetcher(
            "/foodAPI/getBulk/?",
            {
              ids: selected[meal].join(),
            },
            setResponse
          );

          if (response?.length > 0) {
            response.forEach((recipe) => {
              mealcards.push(
                <FinaliseRecipeCard recipe={recipe} selected={selected} />
              );
            });

            let mealdata= <><h3>{meal}</h3><Row xs={1} md={2} lg={3}>{mealcards}</Row><br></br></>
            CardData.push(mealdata)
          }
        }

        // console.log(response);


      }
      Math.random()

      return (
        <>
          <Container>
            <Row>
              <Col>
                <h2>Finalise Your Items!</h2>
              </Col>
              <Col>
                <div style={{ textAlign: "right" }}>
                  <Button onClick={() => 
                  
                  {
                    for (let i = 0; i < 6; i++) {
                      for (const meal in selected){
                        // console.log(selected[meal][Math.floor(Math.random() * selected[meal].length)])
                        let randomDish = selected[meal][Math.floor(Math.random() * selected[meal].length)];
                        setMealPlan((oldArray) => [...oldArray, randomDish])
                      }
                    }
                    navigate('/home')
                  }             
                  
                  }>Next Page</Button>
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
  const weekly_cal = 14000    
  const daily_cal = weekly_cal/7           

  const [mealPlan, setMealPlan] = useAtom(MealPlan);
  const [overlayData, setOverlayData] = useAtom(RecipeOverlay);

  const [activePage, setActivePage] = useState(1);
  const [currPage, setCurrPage] = useState(null);
  const [selected, setSelected] = useState({
    breakfast:[],
    lunch:[],
    dinner:[],
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
        daily_cal
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
