import React, { useState, useEffect } from 'react';

import { Card, Button, Container, Row, Col  } from 'react-bootstrap';

import StepProgressBar from './StepProgressBar';
import { fetcher } from '../Fetcher';
import { pageDataGetter } from './pageDataGetter';



const CreateMealPages = {
  1: async function (setPageNo, hasFetched, data, setApiData){
    
    function Renderpage() {

      let CardData = [];
      
      if (!hasFetched){
        // pageDataGetter("breakfast")
        pageDataGetter("breakfast").then(res => data = res["results"])
        // pageDataGetter("breakfast").then(res => console.log(res))

        // data
        //   .then(res => {
        //   setApiData(prevApiData => ({
        //       ...prevApiData,
        //       [1]: {
        //         hasFetched: true,
        //         data: res
        //       }
        //     }));
        //   })
        // data = getdata("breakfast")

        setApiData(prevApiData => ({
          ...prevApiData,
          [1]: {
            hasFetched: true,
            data: data
          }
        }));

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
                <h2>Pick Your Breakfast Items!</h2>
                <h3>working on this now</h3>
              </Col>
              <Col>
                <button onClick={() => setPageNo(2)}>Next Page</button>
              </Col>
            </Row>

            <Row xs={1} md={2} className="g-4">
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
  2: async function (setPageNo){
    function Renderpage() {
      const [data, setData] = useState(null)
      
      fetcher("/foodAPI/search/?",{
        tags:"lunch, side dish"
      })
        .then(res => setData(res))
      console.log(data)
      return (
        <>
          <Container>
            <Row>
              <Col>
                <h2>Pick Your Lunch Items!</h2>
                <h3>working on this now</h3>
              </Col>
              <Col>
                <button onClick={() => setPageNo(3)}>Next Page</button>
              </Col>
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
  3: async function (setPageNo){
    return (
      <>
        <h2>This Is Page Three</h2>
        <button onClick={() => setPageNo(4)}>Next Page</button>
      </>
    );
  },
  4: async function (setPageNo){
    return (
      <>
        <h2>This Is Page Four</h2>
        <button onClick={() => setPageNo(1)}>Next Page</button>
      </>
    );
  },

} 


export default function CreateMealContent() {
  const [activePage, setActivePage] = useState(1);
  const [currPage, setCurrPage] = useState(null);
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
