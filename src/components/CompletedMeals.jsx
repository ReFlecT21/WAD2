import React from "react";
import { MealPlanCardHome } from "./MealPlanCard";
import { FinaliseRecipeCard } from "./RecipeCard";
import { Card } from "react-bootstrap";


export function CompletedMeals({completed}) {
    // console.log(completed.Completed)
    const display = []

    var idx = 0

    Object.keys(completed.Completed).forEach((day) => {
        Object.keys(completed.Completed[day]).forEach((mealType) => {
            if (!Array.isArray(completed.Completed[day][mealType])){
                // console.log(completed.Completed[day][mealType])
                Object.keys(completed.Completed[day][mealType]).forEach((recipe) => {
                    display.push(<MealPlanCardHome key={`${recipe}completedPage${idx}`} recipe={recipe} />)
                })
            } else {
                // for manual input content
                console.log(completed.Completed[day][mealType])
            }
            idx += 1
        })
    })

    return (
        <>
            {display}
        </>
    )
}

export function CompletedMealsV2({completed}) {
    console.log(completed.Completed)

    const InnerText = ({foods}) => {
        console.log(foods)
        return(
            <p>hi</p>
        )
    }

    return (
        <>
        {Object.keys(completed.Completed).map((day) => (
            <div key={day}>
                {Object.keys(completed.Completed[day]).map((mealType) => (
                    <React.Fragment>
                        {!Array.isArray(completed.Completed[day][mealType]) ? (<>
                            {Object.keys(completed.Completed[day][mealType]).map((recipe) => (
                                <MealPlanCardHome key={`${recipe}completedPage`} recipe={recipe} />
                            ))}
                        </>) : (<>
                            <Card>
                                <Card.Body>
                                    <Card.Title>{mealType}</Card.Title>
                                    <InnerText foods={completed.Completed[day][mealType]} />
                                </Card.Body>
                            </Card>
                        </>)}
                    </React.Fragment>
                ))}

            </div>
        ))}
        </>
    )
}
// {Object.keys(completed.Completed[day][mealType]).map((recipe) => (
//     <FinaliseRecipeCard key={`${recipe}completedPage`} recipe={recipe} />
// ))}