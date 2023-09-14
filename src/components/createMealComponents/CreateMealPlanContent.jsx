import React, { useState, useEffect } from 'react';

import { Container, Row, Col  } from 'react-bootstrap';

import StepProgressBar from './StepProgressBar';

// import { fetcher } from '../../Fetcher';

const CreateMealPages = {
  getData: async function getData(){

    const [data, setData] = useState(null);

    useEffect(() => {
      fetch('/foodAPI/search', {
        body:{
          type:"breakfast",
        }
      })
        .then(res => res.json())
        .then(data => setData(data))
        .catch(error => console.log(error));
    }, []);

    return data
  },

  1: async function (setPageNo){

    function Renderpage() {
      const [data, setData] = useState(null)
      CreateMealPages.getData()
        .then(res => setData(res))
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
          </Container>
        </>
      );
    }
  
    return (
      <>
        <Renderpage />
      </>
    );

    // return (
    //   <>
    //   <Container>
    //     <Row>
    //       <Col>
    //         <h2>Pick Your Breakfast Items!</h2>
    //         <h3>working on this now</h3>
    //       </Col>
    //       <Col>
    //         <button onClick={() => setPageNo(2)}>Next Page</button>
    //       </Col>
    //     </Row>
    //   </Container>
    //   </>
    // );
  },
  2: async function (setPageNo){
    return (
      <>
        <h2>This Is Page Two</h2>
        <button onClick={() => setPageNo(3)}>Next Page</button>
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

  useEffect(() => {
    async function fetchPageData() {
      const pageData = await CreateMealPages[activePage](setActivePage);
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
