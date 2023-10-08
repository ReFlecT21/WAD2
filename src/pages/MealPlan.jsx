import { Button, Container, Row, Col, Accordion } from "react-bootstrap";
import Fallback from "./Fallback";
import { ErrorBoundary } from "react-error-boundary";
import { NavBar } from "../components";
import getMealPlan from "../getters/getMealPlan";
import { auth } from "../../firebase";
import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { fetcher } from "../getters/Fetcher";
import { MealPlanCard } from "../components/MealPlanCard";
import { RecipeOverlay } from "../atoms/recipeOverlay";
import { useAtom } from "jotai";

export default function MealPlan() {
  const navigate = useNavigate();
  const navHome = () => navigate('/home');
  const navChoose = () => navigate('/choose');

  const [currMealPlan, setCurrMealPlan] = useState(null)
  const [overlayData, setOverlayData] = useAtom(RecipeOverlay);

  var defaultActiveKey = null


  useEffect(() => {
    const fetchData = async () => {
      const userId = auth.currentUser.email;
      setCurrMealPlan(await getMealPlan(userId));
    };
    
    fetchData();
  }, []);

  
  // after successfully retrieving current meal plan
  const display = [];
  const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  
  if (currMealPlan){
    console.log(currMealPlan);
    // d.setDate(d.getDate() + 1)
    // console.log( d )

    defaultActiveKey = Object.keys(currMealPlan.mealPlan)[0]
    
    
    for (const day in currMealPlan.mealPlan) {
      
      const dayData = [null, null, null];
      for (const mealType in currMealPlan.mealPlan[day]) {
      
        if (mealType == "breakfast"){
          dayData[0] =  
            <div>
              <Row xs={2} md={2} lg={2}>
                <Col>
                <h4 style={{margin:"0px",}}>{mealType}</h4>
                </Col>
                <Col>
                <Button>Hello</Button>
                </Col>
              </Row>
              <MealPlanCard recipe={Object.keys(currMealPlan.mealPlan[day][mealType])[0]}/>
            </div>
        }
        if (mealType == "lunch"){
          dayData[1] =   <div><h4>{mealType}</h4><MealPlanCard recipe={Object.keys(currMealPlan.mealPlan[day][mealType])[0]}/></div>
        }
        if (mealType == "dinner"){
          dayData[2] =   <div><h4>{mealType}</h4><MealPlanCard recipe={Object.keys(currMealPlan.mealPlan[day][mealType])[0]}/></div>
        }
        
        // Object.keys(currMealPlan.mealPlan[day][mealType])[0]

      }

      var d = new Date(currMealPlan.CreatedAt);
      d.setDate(d.getDate()+ parseInt(day))
      display.push(
        <>
          <Accordion.Item eventKey={day}>
            <Accordion.Header><h3 style={{margin:"0px"}}>{d.toLocaleDateString()}, {weekday[d.getDay()]}</h3></Accordion.Header>
              <Accordion.Body>
                <Row xs={1} md={2} lg={3}>
                  {dayData}
                </Row>
              </Accordion.Body>
          </Accordion.Item>
        </>
      )
      
    }

  }



  return (
    <>
      <NavBar />
      {/* <h1 style={{ textAlign: "center" }}>This is Current Meal Plan</h1> */}
      <ErrorBoundary FallbackComponent={Fallback}>
        {overlayData}
        {
          currMealPlan!=null ? (
            <Container>
              {/* {display} */}
              <Accordion defaultActiveKey={['1']} alwaysOpen>
                {display}
              </Accordion>
            </Container>
          ) : (
            <>

              <h1>Create A Meal Plan With Us First!</h1>
              <Button onClick={navChoose}>
              {/* <Button> */}
                Create Meal Plan!
              </Button>

            </>
          )
        }
      </ErrorBoundary>
    </>
  );
}
