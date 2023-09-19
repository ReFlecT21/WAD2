import React, { useState, useEffect } from 'react';

import { Card, Button, Container, Row, Col  } from 'react-bootstrap';

import StepProgressBar from './StepProgressBar';
import { fetcher } from '../Fetcher';
import { pageDataGetter } from './pageDataGetter';

// import "./CreateMealPlanContent.css";
import {FinaliseRecipeCard, RecpieCard} from './RecipeCard';
import NavBar from '../NavBar';



const CreateMealPages = {
  1: async function (setPageNo, hasFetched, data, setApiData, selected, setSelected){
    
    function Renderpage() {

      let CardData = [];
      
      if (!hasFetched){

        const [response, setResponse] = useState(null)

        pageDataGetter("breakfast", setResponse)

        setApiData(prevApiData => ({
          ...prevApiData,
          1: {
            hasFetched: true,
            data: response
          }
        }))

        data = response
        
      }

      console.log(data)

      if (data !== null){
        data.forEach(recipe=>{
          CardData.push(
            <RecpieCard recipe={recipe} setter={setSelected}/>
          )
        })
      }

      
      

      return (
        <>
          <Container>
            <Row className=''>
              <Col>
                <h2>Pick Your Breakfast Items!</h2>
                <h3>working on this now</h3>
              </Col>
              <Col className='.justify-content-end'>
                <Button onClick={() => setPageNo(2)}>Next Page</Button>
              </Col>
            </Row>

            <Row xs={1} md={3} >
              {CardData.length > 0
                ? CardData
                :<p>Loading</p>
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


  2: async function (setPageNo, hasFetched, data, setApiData, selected, setSelected){
    function Renderpage() {

      let CardData = [];
      
      if (!hasFetched){

        const [response, setResponse] = useState(null)

        pageDataGetter("breakfast", setResponse)

        setApiData(prevApiData => ({
          ...prevApiData,
          2: {
            hasFetched: true,
            data: response
          }
        }))

        data = response
        
      }

      console.log(data)

      if (data !== null){
        data.forEach(recipe=>{
          CardData.push(
            <RecpieCard recipe={recipe} setter={setSelected}/>
          )
        })
      }


      return (
        <>
          <Container>
            <Row>
              <Col>
                <h2>Pick Your Lunch Items!</h2>
                <h3>working on this now</h3>
              </Col>
              <Col>
                <Button onClick={() => setPageNo(3)}>Next Page</Button>
              </Col>
            </Row>
            <Row xs={1} md={3} className="g-4">
              {CardData.length > 0
                ? CardData
                :<p>Loading</p>
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

  3: async function (setPageNo, hasFetched, data, setApiData, selected, setSelected){
    function Renderpage() {

      let CardData = [];
      
      if (!hasFetched){

        const [response, setResponse] = useState(null)

        pageDataGetter("breakfast", setResponse)

        setApiData(prevApiData => ({
          ...prevApiData,
          3: {
            hasFetched: true,
            data: response
          }
        }))

        data = response
        
      }

      console.log(data)

      if (data !== null){
        data.forEach(recipe=>{
          CardData.push(
            <RecpieCard recipe={recipe} setter={setSelected}/>
          )
        })
      }
      

      return (
        <>
          <Container>
            <Row>
              <Col>
                <h2>Pick Your Dinner Items!</h2>
                <h3>working on this now</h3>
              </Col>
              <Col>
                <Button onClick={() => setPageNo(2)}>Next Page</Button>
              </Col>
            </Row>

            <Row xs={1} md={3} className="g-4">
              {CardData.length > 0
                ? CardData
                :<p>Loading</p>
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

  4: async function (setPageNo, hasFetched, data, setApiData, selected, setSelected ){
    function Renderpage() {
      let CardData = [];
      
      if (selected.length >0 ){
        // console.log(selected)
        const [response, setResponse] = useState(null)

        fetcher(
          "/foodAPI/getBulk/?",
          {
          ids: selected.join()
          },
          setResponse
        );

        // console.log(response);

        if (response?.length >0){
          response.forEach(recipe=>{
            CardData.push(
              <FinaliseRecipeCard recipe={recipe} selected={selected} />
            )
          })
        }
      }
      

      return (
        <>
          <Container>
            <Row>
              <Col>
                <h2>Finalise Your Items!</h2>
                <h3>working on this now</h3>
              </Col>
              <Col>
                <Button onClick={() => setPageNo(2)}>Confirm!</Button>
              </Col>
            </Row>

            <Row xs={1} md={3} className="g-4">
              {CardData.length > 0
                ? CardData
                :<p>Please choose at least 1 meal</p>
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
}


export default function CreateMealContent() {
  const [activePage, setActivePage] = useState(1);
  const [currPage, setCurrPage] = useState(null);
  // const [selected, setSelected] = useState([637792, 633830])
  const [selected, setSelected] = useState([])
  const [apiData, setApiData] = useState(
    {
      1: {
      hasFetched: false,
      data: null
      },
      2: {
      hasFetched: false,
      data: null
      },
      3: {
      hasFetched: false,
      data: null
      },
      4: {
      hasFetched: false,
      data: null
      },

    }
  );

  useEffect(() => {
    async function fetchPageData() {
      const pageData = await CreateMealPages[activePage](
        setActivePage, 
        apiData[activePage].hasFetched,
        apiData[activePage].data,
        setApiData,
        selected,
        setSelected,
        );
      setCurrPage(pageData);
    }

    fetchPageData();
  }, [activePage]);
  
  return (
    <>
      <div>
        <Container>
          <Row >
            <StepProgressBar page={activePage} onPageNumberClick={setActivePage} /> 
          </Row>

        </Container>
        {currPage}
      </div>
    </>
  );
}
