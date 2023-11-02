import { Button, Container, Row, Col, Tab, Tabs } from "react-bootstrap";
import { MealPlanCard } from "../components/MealPlanCard";
import Fallback from "../pages/Fallback";

import { ErrorBoundary } from "react-error-boundary";
import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";

import { useAtom } from "jotai";
import { RecipeOverlay } from "../atoms/recipeOverlay";

import getMealPlan from "../middleware/getMealPlan";
import getDisplayMealPlan from "../middleware/getDisplayMealPlan";
import { fetcher } from "../middleware/Fetcher";
import { dbFoodMethods } from "../middleware/dbMethods";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import currDayCalculator from "../middleware/currDayCalculator";
// import { ShoppingCartPopUp } from "./ShoppingCart";

export function CurrentMealPlanV2({
  currMealPlan,
  currDisplayMealPlan,
  shoppingCart,
}) {
  const navigate = useNavigate();
  const navHome = () => navigate("/home");
  const navChoose = () => navigate("/choose");

  const [overlayData, setOverlayData] = useAtom(RecipeOverlay);

  const dayIndex = currDayCalculator(currDisplayMealPlan.CreatedAt) + 7;
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  const d = new Date(currDisplayMealPlan.CreatedAt);

  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const [content, setContent] = useState(currDisplayMealPlan);
  const [accordionDisplay, setExpanded] = useState(dayIndex);

  // var accordionDisplay = dayIndex
  const changeAccordionDisplay = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      {content ? (
        <div >
          {Object.keys(content.DisplayMealPlan).map((day) => (
            <Accordion
              key={day}
              expanded={accordionDisplay == day}
              onChange={changeAccordionDisplay(day)}
            >
              <AccordionSummary expandIcon={<ExpandMore />}>
                <h2 className="accordionText">
                  {new Date(
                    d.getTime() + parseInt(day) * 24 * 60 * 60 * 1000
                  ).toLocaleDateString("en-GB", options)}
                  ,{" "}
                  {
                    weekday[
                      new Date(
                        d.getTime() + parseInt(day) * 24 * 60 * 60 * 1000
                      ).getDay()
                    ]
                  }
                </h2>
              </AccordionSummary>
              <AccordionDetails>
                {Object.keys(content.DisplayMealPlan[day]).length == 0 ? (
                  <p> No meals planned for this day </p>
                ) : (
                  <Row xs={1} md={2} lg={3}  style={{margin:"10px"}}>
                    {["breakfast", "lunch", "dinner"].map((mealType) => (
                      <div key={`${day}-${mealType}`}>
                        {content.DisplayMealPlan[day]?.[mealType] ? (
                          Object.keys(
                            content.DisplayMealPlan[day][mealType]
                          ).map((recipe) => (
                            <MealPlanCard
                              key={`${recipe.id}card`}
                              recipe={recipe}
                              render={
                                content.DisplayMealPlan[day][mealType][
                                  recipe
                                ] == 0
                                  ? true
                                  : false
                              }
                              day={day}
                              mealType={mealType}
                              dayIndex={dayIndex}
                              currMealPlan={currMealPlan}
                              currDisplayMealPlan={currDisplayMealPlan}
                            />
                          ))
                        ) : (
                          <>
                            <h4>{mealType}</h4>
                            <p>No meals planned</p>
                          </>
                        )}
                      </div>
                    ))}
                  </Row>
                )}
                {/* <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                malesuada lacus ex, sit amet blandit leo lobortis eget.
                            </Typography> */}
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      ) : (
        <p> error </p>
      )}
    </>
  );
}

// export function CurrentMealPlan() {

//   const navigate = useNavigate();
//   const navHome = () => navigate("/home");
//   const navChoose = () => navigate("/choose");

//   const [currMealPlan, setCurrMealPlan] = useState(null);
//   const [currDisplayMealPlan, setCurrDisplayMealPlan] = useState(null);
//   const [overlayData, setOverlayData] = useAtom(RecipeOverlay);

//   var dayIndex = null;

//   useEffect(() => {

//     const fetchData = async () => {
//       await dbFoodMethods.init();
//       setCurrMealPlan(await dbFoodMethods.getMealPlan());
//       setCurrDisplayMealPlan(await dbFoodMethods.getDisplayMealPlan());
//     };

//     fetchData();
//   }, []);

//   // after successfully retrieving current meal plan

//   const display = [];
//   const weekday = [
//     "Sunday",
//     "Monday",
//     "Tuesday",
//     "Wednesday",
//     "Thursday",
//     "Friday",
//     "Saturday",
//   ];

//   useEffect(() => {
//     console.log(currMealPlan);
//     console.log(currDisplayMealPlan);

//   }, [currDisplayMealPlan]);

//   function populateDisplay(day, mealType, dayIndex){
//     return (
//       <div key={`${day}${mealType}`}>
//         <Row xs={2} md={2} lg={2}>
//           <Col>
//             <h4 style={{ margin: "0px" }}>{mealType}</h4>
//             {/* <p>{Object.keys(currDisplayMealPlan.DisplayMealPlan[day][mealType])[0]}</p> */}
//           </Col>
//           <Col>
//             <Button
//               className="buttonPrimary"
//               onClick={() => {
//                 // check: if the current day he is on, the meal type has been completed
//                 // if completed: block adding
//                 // "breakfast": currDisplayMealPlan.DisplayMealPlan[day][mealType]
//                 // else: add to count of completed meals, call delete from db, call add meal to db
//                 console.log("clicking completed");
//                 const clickFunc = async () => {
//                   await dbFoodMethods.completeMeal(
//                       dayIndex,
//                       mealType,
//                       currMealPlan.mealPlan[day][mealType]
//                   );
//                   window.location.reload(false)

//                 }
//                 clickFunc();
//               }}

//               style={ currDisplayMealPlan.DisplayMealPlan[day][mealType][Object.keys(currDisplayMealPlan.DisplayMealPlan[day][mealType])[0]] ?
//                 {pointerEvents: 'none', cursor: 'not-allowed'} : {cursor: 'pointer'}}
//             >
//               Completed
//             </Button>
//           </Col>
//         </Row>
//         <MealPlanCard
//           recipe={Object.keys(currDisplayMealPlan.DisplayMealPlan[day][mealType])[0]}
//         />
//       </div>
//     )
//   }

//   if (currDisplayMealPlan) {

//     // console.log(currDisplayMealPlan)
//     // console.log(Date.now())
//     // dayIndex = Math.floor((Date.now() - currDisplayMealPlan.CreatedAt) / (1000 * 3600 * 24));
//     dayIndex = new Date(Date.now()).getDate() - new Date(currDisplayMealPlan.CreatedAt).getDate() + 1; // +1 not suppose to be there  this is for testing

//     // console.log(dayIndex);

//     for (const day in currDisplayMealPlan.DisplayMealPlan) {
//       const dayData = [null, null, null];

//       for (const mealType in currDisplayMealPlan.DisplayMealPlan[day]) {
//         if (mealType == "breakfast") {
//           dayData[0] = populateDisplay(day, mealType, dayIndex);
//         }
//         else if (mealType == "lunch") {
//           dayData[1] = populateDisplay(day, mealType, dayIndex);
//         }
//         else if (mealType == "dinner") {
//           dayData[2] = populateDisplay(day, mealType, dayIndex);
//         }

//       }

//       var d = new Date(currDisplayMealPlan.CreatedAt);
//       d.setDate(d.getDate() + parseInt(day));
//       display.push(
//         <div key={day}>
//           <Accordion.Item eventKey={day}>
//             <Accordion.Header>
//               <h3 style={{ margin: "0px" }}>
//                 {d.toLocaleDateString()}, {weekday[d.getDay()]}
//               </h3>
//             </Accordion.Header>
//             <Accordion.Body>
//               <Row xs={1} md={2} lg={3}>
//                 {dayData}
//               </Row>
//             </Accordion.Body>
//           </Accordion.Item>
//         </div>
//       );
//     }
//   }

//   return (
//     <>
//         <Accordion defaultActiveKey={["1"]} alwaysOpen>
//             {display}
//         </Accordion>
//     </>
//   );
// }
