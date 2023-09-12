import React, { useState, useEffect } from 'react';
import "./PageOne.css";

import { Container, Row  } from 'react-bootstrap';

import StepProgressBar from './StepProgressBar';

const CreateMealPages = {
  1: async function (setPageNo){
    return (
      <>
        <h2>This Is Page One</h2>
        <h3>working on this now</h3>
        <button onClick={() => setPageNo(2)}>Next Page</button>
      </>
    );
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

        <StepProgressBar page={activePage} onPageNumberClick={setActivePage} /> {/* Move the StepProgressBar here */}
        {currPage}
      </div>
    </>
  );
}
