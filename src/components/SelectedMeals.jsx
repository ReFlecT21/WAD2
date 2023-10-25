// import React, { useState, useEffect } from "react";
// import { fetcher } from "../middleware/Fetcher";

// import { Card, Button, Container, Row, Col, Tabs, Tab } from "react-bootstrap";
// import { SelectedMealCard } from "./RecipeCard";

// import { useAtom } from "jotai";
// import { SelectedMeals } from "../atoms/selectedMeals";
// import { RecipeOverlay } from "../atoms/recipeOverlay";

// export function SelectedMealsDisplay () {

//     const [selected, setSelected] = useAtom(SelectedMeals);
//     const [overlayData, setOverlayData] = useAtom(RecipeOverlay);

//     console.log("selected");
//     console.log(selected);
//     return (
//         <>
//             {overlayData}
//             <h1>Selected Meals</h1>
//             {["Breakfast", "Lunch", "Dinner"].map((mealType) => (
//                 <div key={mealType}>
//                     <h3>{mealType}</h3>
//                     {Object.keys(selected[mealType.toLowerCase()]).length > 0 ? (
//                         <Row xs={1} md={2} lg={3}>
//                             {Object.keys(selected[mealType.toLowerCase()]).map((recipeID) => (
//                                 // console.log(recipeID),
//                                 <SelectedMealCard
//                                     recipe={recipeID}
//                                     selected={selected}
//                                     setter={setSelected}
//                                     mealType={mealType}
//                                 />

//                             ))}
//                         </Row>
//                     ) : (
//                         <p>Please select at least 1 dish for {mealType}!</p>
//                     )}
//                 </div>
//             ))}
//         </>
//     );
    
// }