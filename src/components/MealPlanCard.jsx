import { useState } from "react";
import { Card, Button, Col, Row } from "react-bootstrap";
import { fetcher } from "../middleware/Fetcher";
import { RecipeDetails } from "./RecipeDetails";
import { useAtom } from "jotai";
import { FinaliseRecipeCard, HomeRecipeCard, RecpieCard } from "./RecipeCard";
import { isMobile } from "react-device-detect";

export function MealPlanCard({ recipe, setter = null }) {
    // console.log("mealplancard")
    const [response, setResponse] = useState(null);

    const toSend = []

    fetcher(
      "/foodAPI/getBulk/?",
      {
        ids: recipe,
      },
      setResponse
    );
    // console.log(response)

    if(response){
        response.forEach(recipe => {
            toSend.push(
            <div key={recipe.id}>
                <FinaliseRecipeCard recipe={recipe}/>
            </div>
            )
        })
    }   

    return (
        <>
            {toSend}
        </>
    )

}
export function MealPlanCardHome({ recipe, setter = null }) {
    // console.log("mealplancard")
    const [response, setResponse] = useState(null);

    const toSend = []

    fetcher(
      "/foodAPI/getBulk/?",
      {
        ids: recipe,
      },
      setResponse
    );
    // console.log(response)

    if(response){
        response.forEach(recipe => {

            toSend.push(
                // <HomeRecipeCard recipe={recipe} />
                <FinaliseRecipeCard recipe={recipe} key={recipe.id}/>
            )
            // if (isMobile){
            //     toSend.push(
            //         // <HomeRecipeCard recipe={recipe} />
            //         <FinaliseRecipeCard recipe={recipe} />
            //     )
            // } else {
            //     toSend.push(
            //         <HomeRecipeCard recipe={recipe} />
            //         // <FinaliseRecipeCard recipe={recipe} />
            //     )

            // }
        })
    }   

    return (
        <>
            {toSend}
        </>
    )

}
