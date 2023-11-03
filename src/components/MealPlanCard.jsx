import { useState } from "react";
import { Card, Button, Col, Row } from "react-bootstrap";
import { fetcher, fetcherGET } from "../middleware/Fetcher";
import { RecipeDetails } from "./RecipeDetails";
import { useAtom } from "jotai";
import { FinaliseRecipeCard, HomeRecipeCard, RecpieCard, RecpieCardMealPlan, RecpieCardV2 } from "./RecipeCard";
import { isMobile } from "react-device-detect";
import Loader from "./Loader";

export function MealPlanCard({ recipe, setter = null, render=true, day, mealType, dayIndex, currMealPlan, currDisplayMealPlan }) {
    // console.log(setTrigger)
    const [response, setResponse] = useState(null);
    // console.log(recipe)
    
    fetcher(
      "/foodAPI/getBulk/?",
      {
        ids: recipe,
      },
      setResponse
    );

    return (
        <>
          {response ? (
            response.map((recipe) => (
              <div key={recipe.id}>
                {render ? (
                  <h4>{mealType}</h4>
                ): (
                  <h4>{mealType} completed</h4>
                )}
                <RecpieCardMealPlan
                    key={recipe.id}
                    recipe={recipe}
                    setter={setter}
                    render={render}
                    day={day}
                    mealType={mealType}
                    dayIndex={dayIndex}
                    currMealPlan={currMealPlan}
                    currDisplayMealPlan={currDisplayMealPlan}
                    
                />
              </div>
            ))
          ) : (
            <Loader />
          )}
        </>
      );
      

}
export function MealPlanCardHome({ recipe, setter = null }) {
    // console.log("mealplancard")
    const [response, setResponse] = useState(null);

    fetcher(
      "/foodAPI/getBulk/?",
      {
        ids: recipe,
      },
      setResponse
    );

    return (
        <>
            {response? (
                response.map(recipe => (
                    <FinaliseRecipeCard recipe={recipe} key={recipe.id}/>
                ))
            ) : (
                <Loader />
            )
            }
        </>
    )

}
