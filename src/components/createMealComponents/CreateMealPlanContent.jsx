import React, { useState, useEffect } from 'react';

import { Card, Button, Container, Row, Col  } from 'react-bootstrap';

import StepProgressBar from './StepProgressBar';
import { fetcher } from '../../Fetcher';

// const RenderPages = {
//   render1: 
// }


const CreateMealPages = {
  1: async function (setPageNo, hasFetched, data, setApiData){


    function dataSetter(){
      const [data, setData] = useState(null)

      fetcher("/foodAPI/search/?",{
        type:"breakfast"
      })
        .then(res => setData(res))

      setApiData = setApiData({
        1:{
          hasFetched: true,
          data: data
        }
      })
      console.log(data)

      return data

    }

    function Renderpage() {
      
      if (!hasFetched){
        dataSetter()
      }
      
      // fetcher("/foodAPI/random/?",{
      //   tags:"breakfast"
      // })
      //   .then(res => setData(res))

      // fetcher("/foodAPI/search/?",{
      //   type:"breakfast"
      // })
      //   .then(res => setData(res))
      // console.log(data)
    

      // if (!hasFetched) {
      //   fetcher("/foodAPI/search/?",{
      //     type:"breakfast"
      //   })
      //     .then(res => setData(res))
      //   hasFetched = true;
      //   console.log(data)
      // }
      
      
      
      // useEffect(() => {
        //   fetcher("/foodAPI/search/?",{
          //     type:"breakfast"
          //   })
          //     .then(res => setData(res))
          // }, []) 
      console.log(data)
      
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
            <Row>
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="https://spoonacular.com/recipeImages/782585-312x231.jpg" />
                <Card.Body>
                  <Card.Title>Title</Card.Title>
                  <Card.Text>description</Card.Text>
                  <Button href="" target="_blank" rel="noopener noreferrer">See Recipe</Button>
                  <Button onClick="">Add to Array</Button>
                </Card.Body>
              </Card>
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
      
      fetcher("/foodAPI/random/?",{
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
