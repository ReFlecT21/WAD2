import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { Container, Row } from 'react-bootstrap'

import PageOne from "./components/createMealComponents/PageOne";
import PageTwo from "./components/createMealComponents/PageTwo";
import PageThree from "./components/createMealComponents/PageThree";
import PageFour from "./components/createMealComponents/PageFour";
import StepProgressBar from './components/createMealComponents/StepProgressBar.jsx'

export default function Choosemeals() {
  const [page, setPage] = useState('pageone')

  const nextPage = (page) => {
    setPage(page);
  };

  const nextPageNumber = (pageNumber) => {
    switch (pageNumber) {
      case "1":
        setPage('pageone');
        break;
      case "2":
        setPage('pagetwo');
        break;
      case "3":
        setPage('pagethree');
        break;
      case "4":
        alert("Ooops! Seems like you did not fill the form.");
        break;
      default:
        setPage('1');
    }
  };

  return (
    <>
      <div className="CreateMealPlan">
        <Logo />
        <StepProgressBar page={page} onPageNumberClick={nextPageNumber} />
        {
          {
            pageone: <PageOne onButtonClick={nextPage} />,
            pagetwo: <PageTwo onButtonClick={nextPage} />,
            pagethree: <PageThree onButtonClick={nextPage} />,
            pagefour: <PageFour />,
          }[page]
        }
      </div>
    </>
  );
}

// export default Choosemeals


