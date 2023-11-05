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

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import currDayCalculator from "../middleware/currDayCalculator";


export function CurrentMealPlanV2({
  currMealPlan,
  currDisplayMealPlan,
  shoppingCart,
}) {
  const navigate = useNavigate();
  const navHome = () => navigate("/home");
  const navChoose = () => navigate("/choose");

  const [overlayData, setOverlayData] = useAtom(RecipeOverlay);

  const dayIndex = currDayCalculator(currDisplayMealPlan.CreatedAt);
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
        <div>
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
                  <Row
                    xs={1}
                    md={2}
                    lg={3}
                    style={{ margin: "10px", objectFit: "contain" }}
                    className="mealPlanContainer"
                  >
                    {["breakfast", "lunch", "dinner"].map((mealType) => (
                      <div key={`${day}-${mealType}`}>
                        {content.DisplayMealPlan[day]?.[mealType] ? (
                          Object.keys(
                            content.DisplayMealPlan[day][mealType]
                          ).map((recipe) => (
                            <MealPlanCard
                              className="myMealCard"
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
