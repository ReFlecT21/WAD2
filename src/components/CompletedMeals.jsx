import React from "react";
import { MealPlanCard, MealPlanCardHome } from "./MealPlanCard";
import { FinaliseRecipeCard, ManualInputCard } from "./RecipeCard";
import { Card, Col, Row } from "react-bootstrap";
import currDayCalculator from "../middleware/currDayCalculator";


export function CompletedMeals({completed, currMealPlan, currDisplayMealPlan}) {
    // console.log(completed.Completed)
    const display = []
    
    const dayIndex = currDayCalculator(completed.CreatedAt)+5


    Object.keys(completed.Completed).forEach((day) => {
        Object.keys(completed.Completed[day]).forEach((mealType) => {
            if (!Array.isArray(completed.Completed[day][mealType])){
                // console.log(completed.Completed[day][mealType])
                Object.keys(completed.Completed[day][mealType]).forEach((recipe) => {
                    // console.log()
                    display.push(<MealPlanCard 
                        className="myMealCard"

                        key={`${recipe}completedPage${day}`} 
                        recipe={recipe} 
                        render={true}
                        day={dayIndex}
                        mealType={mealType}
                        dayIndex={dayIndex}
                        currMealPlan={currMealPlan}
                        currDisplayMealPlan={currDisplayMealPlan}
                        mealTypeRender={false}
                        foodItem={completed.Completed[day][mealType]}
                    />)
                })
            } else {
                // for manual input content
                // console.log(completed.Completed[day][mealType])
                // Object.keys(completed.Completed[day][mealType]).forEach((recipe) => {
                    // console.log(completed.Completed[day][mealType])
                    display.push(<ManualInputCard  className="myMealCard" key={`completedPage${day}${mealType}`} foods={completed.Completed[day][mealType]}/>)
                // })
            }

        })
    })
        return (
            <>
                {display}
            </>
        )
        // return (
        //     <Row xs={1} md={2} lg={3}>
        //         {Object.keys(completed.Completed).map((day, dayIndex) => (
        //             <Col key={`recipe-${dayIndex}`}>
        //                 {Object.keys(completed.Completed[day]).map((mealType) => (
        //                     <Col key={`recipe-${dayIndex}-${mealType}`}>
        //                         {!Array.isArray(completed.Completed[day][mealType]) ? (
        //                         <>
        //                             {Object.keys(completed.Completed[day][mealType]).map((recipe) => (
        //                                 <MealPlanCardHome key={`recipe-${dayIndex}-${mealType}-${recipe}-card`} recipe={recipe} />
        //                             ))}
        //                         </>
        //                         ) : (
        //                         <div>

        //                         </div>
        //                         )}
        //                     </Col>
        //                 ))}
        //             </Col>
        //         ))}
        //     </Row>
        // )
}
export function CompletedMealsManual({completed}) {
    // console.log(completed.Completed)
    const display = []


    Object.keys(completed.Completed).forEach((day) => {
        Object.keys(completed.Completed[day]).forEach((mealType) => {
            if (Array.isArray(completed.Completed[day][mealType])){
                // console.log(completed.Completed[day][mealType])
                Object.keys(completed.Completed[day][mealType]).forEach((recipe) => {
                    // console.log(completed.Completed[day][mealType][recipe])
                    // display.push(<MealPlanCardHome key={`${recipe}completedPage${day}`} recipe={recipe} />)
                })
            } 

        })
    })
        return (
            <>
                {display}
            </>
        )
        // return (
        //     <Row xs={1} md={2} lg={3}>
        //         {Object.keys(completed.Completed).map((day, dayIndex) => (
        //             <Col key={`recipe-${dayIndex}`}>
        //                 {Object.keys(completed.Completed[day]).map((mealType) => (
        //                     <Col key={`recipe-${dayIndex}-${mealType}`}>
        //                         {!Array.isArray(completed.Completed[day][mealType]) ? (
        //                         <>
        //                             {Object.keys(completed.Completed[day][mealType]).map((recipe) => (
        //                                 <MealPlanCardHome key={`recipe-${dayIndex}-${mealType}-${recipe}-card`} recipe={recipe} />
        //                             ))}
        //                         </>
        //                         ) : (
        //                         <div>

        //                         </div>
        //                         )}
        //                     </Col>
        //                 ))}
        //             </Col>
        //         ))}
        //     </Row>
        // )
}

export function CompletedMealsV2({completed}) {
    // console.log(completed.Completed)

    const InnerText = ({foods}) => {
        // console.log(foods)
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