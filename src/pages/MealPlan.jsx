import { Button, Container, Row, Col } from "react-bootstrap";
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
    
    
    for (const day in currMealPlan.mealPlan) {
      
      const dayData = [null, null, null];
      for (const mealType in currMealPlan.mealPlan[day]) {
      
        if (mealType == "breakfast"){
          dayData[0] =  <div><h3>{mealType}</h3><MealPlanCard recipe={Object.keys(currMealPlan.mealPlan[day][mealType])[0]}/></div>
        }
        if (mealType == "lunch"){
          dayData[1] =   <div><h3>{mealType}</h3><MealPlanCard recipe={Object.keys(currMealPlan.mealPlan[day][mealType])[0]}/></div>
        }
        if (mealType == "dinner"){
          dayData[2] =   <div><h3>{mealType}</h3><MealPlanCard recipe={Object.keys(currMealPlan.mealPlan[day][mealType])[0]}/></div>
        }
        
        // Object.keys(currMealPlan.mealPlan[day][mealType])[0]

      }

      var d = new Date(currMealPlan.CreatedAt);
      d.setDate(d.getDate()+ parseInt(day))
      display.push(
        <>
          <div style={{ border:"1px solid black"}}>
            <h1>{weekday[d.getDay()]}, {d.toLocaleDateString() }</h1> 
            <Row xs={1} md={2} lg={3}>
              {dayData}
            </Row>
            {/* <div>{dayData}</div> */}
          </div>
        </>
      )



      
    }
  
    // for (let i=0; i<7; i++){ 
    //   // i is the day number 
    //   ["breakfast", "lunch", "dinner"].forEach((meal) => {
    //     currMealPlan.push(<p>{i}, {meal}</p>)
    //   //   <Button onClick={
    //   //     method(i, meal)
    //   //   }></Button>
    //   })
  
    // }
    
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
              {display}
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
