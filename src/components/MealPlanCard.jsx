import { useState } from "react";
import { Card, Button, Col, Row } from "react-bootstrap";
import { fetcher } from "../getters/Fetcher";
import { RecipeDetails } from "./RecipeDetails";
import { useAtom } from "jotai";
import { FinaliseRecipeCard, RecpieCard } from "./RecipeCard";

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
    console.log(response)

    if(response){
        response.forEach(recipe => {
            toSend.push(
            <>
                <FinaliseRecipeCard recipe={recipe} />
            </>
            )
        })
    }   

    return (
        <>
            {toSend}
        </>
    )

}
