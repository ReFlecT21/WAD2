import React, { useEffect, useState } from "react";
import { fetcherPOST } from "../middleware/Fetcher";
import { NavBar } from "../components";
import { Row, Col, Button, Stack } from "react-bootstrap";
import { Box } from "@mui/material";
import { useAtom } from "jotai";
import { RecipeOverlay } from "../atoms/recipeOverlay";
import { Modal } from "@mui/material";
import { ManualSearchComponent } from "../components/ManualSearchInput";


import Spline from '@splinetool/react-spline';
import {
  collection,
  doc,
  getDoc,
  setDoc,
  addDoc,
  query,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { db, auth } from "../../firebase";
import getMealPlan from "../middleware/getMealPlan";
import { MealPlanCard, MealPlanCardHome } from "../components/MealPlanCard";
import { isMobile } from "react-device-detect";
import { dbFoodMethods } from "../middleware/dbMethods";




const HomePage = () => {
  const [overlayData, setOverlayData] = useAtom(RecipeOverlay);
  const [currMealPlan, setCurrMealPlan] = useState(null);

  // const body = {
  //   query: "prata",
  //   include_subrecipe: true,
  //   use_raw_foods: false,
  //   line_delimited: true,
  //   claims: true,
  //   taxonomy: true,
  //   ingredient_statement: true,
  // };
  // const [data, setData] = useState(null);

  // fetcherPOST("/foodAPI/manualSearch", body, setData);

  // console.log(data);

  useEffect(() => {
    const fetchData = async () => {
      // const userId = auth.currentUser.email;
      // setCurrMealPlan(await getMealPlan(userId));
      await dbFoodMethods.init();
      
      setCurrMealPlan(await dbFoodMethods.getDisplayMealPlan());
    };

    fetchData();
  }, []);

  var todayMealDisplay = []
  var todayMeal = []
  // console.log(currMealPlan)
  var currDay = 0;
  
  if (currMealPlan?.DisplayMealPlan) {
    var currDay = new Date(Date.now()).getDate() - new Date(currMealPlan.CreatedAt).getDate() +1;
    
    // FOR TESTING PURPOSES ONLY (NEED TO +1 )

    // console.log(currDay)
    // console.log(new Date(currMealPlan.CreatedAt).getDate())
    
    
  //   todayMeal = currMealPlan["DisplayMealPlan"][currDay];
  //   // console.log(todayMeal)

  //   for (const mealType in todayMeal){
  //     // console.log(todayMeal[mealType])
  //     todayMealDisplay.push(
  //       <div key={mealType}>
  //         <MealPlanCardHome recipe={Object.keys(todayMeal[mealType])[0]} />
  //         {/* <div>
  //           <h3>{mealType}</h3>
  //           <p>{todayMeal[mealType]}</p>
  //         </div> */}
  //       </div>
  //     )
  //   }
  // } else {
  //   todayMealDisplay.push(
  //     <div key="noMeal">
  //       <h3>No Meal Plan</h3>
  //     </div>
  //   )
  }



  return (
    <>
      <NavBar />
      {overlayData}
      <Row xs={1} md={3}>
        {/* <Col>
          <spline-viewer url="https://prod.spline.design/TGgKuiS6HyavoK5J/scene.splinecode" events-target="global" logo="No"></spline-viewer>
        </Col> */}
        <Col md={8}>
          {/* <Stack gap={2} >  */}
            <div className="neuphormicBox">
              <div style={{display:"flex", justifyContent:"space-between"}}>
                <h1>{currDay === 0 ? ("Tomorrow's"):("Today's")}  Meal</h1>
                <Button
                  className="buttonPrimary"
                  href="/mealplan"
                >See meal plan</Button>
              </div>

              <Row xs={1} md={3} lg={3}>
                {/* {todayMealDisplay} */}
                {console.log(currMealPlan)}
                {/* {console.log(currMealPlan["DisplayMealPlan"]["1"]["breakfast"])} */}

                {currMealPlan ? (
                  <>
                    {currMealPlan.DisplayMealPlan[currDay] ? (
                      <>
                        {["breakfast", "lunch", "dinner"].map((mealType)=>(
                          <Col key={`${mealType}home`}>
                            {currMealPlan.DisplayMealPlan[currDay][mealType][Object.keys(currMealPlan.DisplayMealPlan[currDay][mealType])[0]] ? (                              
                              <h4>{mealType} completed!</h4>
                              ):(<h4>{mealType}</h4>)}
                              {/* {console.log(currMealPlan.DisplayMealPlan[currDay][mealType][Object.keys(currMealPlan.DisplayMealPlan[currDay][mealType])[0]])} */}
                            <MealPlanCardHome recipe={Object.keys(currMealPlan.DisplayMealPlan[currDay][mealType])[0]} />
                          </Col>

                        ))}
                      </>
                    ):(
                      <>
                        {["breakfast", "lunch", "dinner"].map((mealType)=>(
                          <Col key={`${mealType}home`}>
                            {currMealPlan.DisplayMealPlan[currDay][mealType][Object.keys(currMealPlan.DisplayMealPlan[currDay][mealType])[0]] ? (  
                              <h4>{mealType}</h4>
                            ):(<h4>{mealType} completed!</h4>)}
                            <MealPlanCardHome recipe={Object.keys(currMealPlan.DisplayMealPlan[currDay+1][mealType])[0]} />
                          </Col>

                        ))}
                      </>
                    )}
                  </>
                ):(<h4>No Meal Plan</h4>)}


                {/* {currMealPlan?.DisplayMealPlan ? (
                  <>
                    {["breakfast", "lunch", "dinner"].map((mealType)=>(
                      <Col key={`${mealType}home`}>
                        {Object.keys(currMealPlan.DisplayMealPlan[currDay][mealType])[0] ? (
                          <h4>{mealType} completed!</h4>
                        ):(<h4>{mealType}</h4>)}
                        <MealPlanCardHome recipe={Object.keys(currMealPlan.DisplayMealPlan[currDay][mealType])[0]} />
                      </Col>

                    ))}
                  </>
                ):(<></>)} */}
              </Row>
              {/* <h3>Breakfast</h3>
              <h3>Lunch</h3>
              <h3>Dinner</h3>
              <p>LOREM ipsum</p> */}
            </div>
          {/* </Stack> */}
        </Col>
          <Col>
            <div className="neuphormicBox">
              <Stack gap={2}>
                <Button className="homePageBtn">Scan</Button>
                <Button className="homePageBtn" onClick={() => setOverlayData(<ManualSearchComponent />)}>Manual Search</Button>
              </Stack>
            </div>
          </Col>
      </Row> 
    </>
  );
};

export default HomePage;
