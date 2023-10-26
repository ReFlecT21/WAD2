import { MealPlanCardHome } from "./MealPlanCard";
import { FinaliseRecipeCard } from "./RecipeCard";


export default function CompletedMeals({completed}) {
    // console.log(completed.Completed)
    const display = []

    Object.keys(completed.Completed).forEach((day) => {
        Object.keys(completed.Completed[day]).forEach((mealType) => {
            if (typeof completed.Completed[day][mealType] === "object"){
                Object.keys(completed.Completed[day][mealType]).forEach((recipe) => {
                    display.push(<MealPlanCardHome key={`${recipe}completedPage`} recipe={recipe} />)
                })
            } else {
                // for manual input content
                console.log(completed.Completed[day][mealType])
            }
        })
    })

    return (
        <>
            {display}
        </>
    )
    // return (
    //     <>
    //         <h1>Completed Meals</h1>
    //         {Object.keys(completed.Completed).map((day) => (
    //             <div key={`${recipe}completedPage`}>
    //                 {Object.keys(completed.Completed[day]).map((mealType) => (
    //                     <div>
    //                         {Object.keys(completed.Completed[day][mealType]).map((recipe) => (
    //                             <div>
    //                                 <MealPlanCardHome key={`${recipe}completedPage`} recipe={recipe} />
    //                             </div>
                            
    //                         ))}
    //                     </div>
    //                 )) }
    //             </div>
    //         )
    //         )}
    //     </>
    // );
}