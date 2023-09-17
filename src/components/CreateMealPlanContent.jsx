import React, { useState, useEffect } from 'react';

import { Card, Button, Container, Row, Col  } from 'react-bootstrap';

import StepProgressBar from './StepProgressBar';
import { fetcher } from '../Fetcher';
import { pageDataGetter } from './pageDataGetter';



const CreateMealPages = {
  1: async function (setPageNo, hasFetched, data, setApiData, setSelected){
    
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
            <Col key= {recipe["id"]}>
              <Card > 
                <Card.Img variant="top" src={recipe["image"]} />
                <Card.Body>
                  <Card.Title>{recipe["title"]}</Card.Title>
                  <Card.Text>
                    <div className="recipeSummary" dangerouslySetInnerHTML={{__html: recipe["summary"]}}></div>
                  </Card.Text>
                  <Row>
                    <Col><Button href={recipe["spoonacularSourceUrl"]} target="_blank" rel="noopener noreferrer">See Recipe</Button></Col>
                    <Col><Button onClick={()=>setSelected(oldArray => [...oldArray, recipe["id"]])}>Add to Array</Button></Col>
                  </Row>
                  {/* <Button href={recipe["spoonacularSourceUrl"]} target="_blank" rel="noopener noreferrer">See Recipe</Button>
                  <Button onClick={()=>setSelected(oldArray => [...oldArray, recipe["id"]])}>Add to Array</Button> */}
                </Card.Body>
              </Card>
            </Col>
          )
        })
      }

      
      

      return (
        <>
          <Container>
            <Row className={'d-flex justify-content-between'}>
              <Col>
                <h2>Pick Your Breakfast Items!</h2>
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


  2: async function (setPageNo, hasFetched, data, setApiData, setSelected){
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
            <Col key= {recipe["id"]}>
              <Card>
                <Card.Img variant="top" src={recipe["image"]} />
                <Card.Body>
                  <Card.Title>{recipe["title"]}</Card.Title>
                  <Card.Text>
                    <div className="recipeSummary" dangerouslySetInnerHTML={{__html: recipe["summary"]}}></div>
                    {/* {recipe["summary"]} */}
                  </Card.Text>
                  <Row>
                    <Col><Button href={recipe["spoonacularSourceUrl"]} target="_blank" rel="noopener noreferrer">See Recipe</Button></Col>
                    <Col><Button onClick={()=>setSelected(oldArray => [...oldArray, recipe["id"]])}>Add to Array</Button></Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
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

  3: async function (setPageNo, hasFetched, data, setApiData, setSelected){
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
            <Col key= {recipe["id"]}>
              <Card>
                <Card.Img variant="top" src={recipe["image"]} />
                <Card.Body>
                  <Card.Title>{recipe["title"]}</Card.Title>
                  <Card.Text>
                    <div className="recipeSummary" dangerouslySetInnerHTML={{__html: recipe["summary"]}}></div>
                    {/* {recipe["summary"]} */}
                  </Card.Text>
                  <Row>
                    <Col><Button href={recipe["spoonacularSourceUrl"]} target="_blank" rel="noopener noreferrer">See Recipe</Button></Col>
                    <Col><Button onClick={()=>setSelected(oldArray => [...oldArray, recipe["id"]])}>Add to Array</Button></Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
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

  4: async function (setPageNo, hasFetched, data, setApiData, setSelected){
    return (
      <>
        <h2>This Is Page Four</h2>
        <Button onClick={() => setPageNo(1)}>Next Page</Button>
      </>
    );
  },

} 


export default function CreateMealContent() {
  const [activePage, setActivePage] = useState(1);
  const [currPage, setCurrPage] = useState(null);
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
