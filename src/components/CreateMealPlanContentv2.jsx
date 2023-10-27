import { Button, Col, Container, Row } from "react-bootstrap";
import Loader from "./Loader";
import { RecpieCardV2, SelectedRecpieCardV2 } from "./RecipeCard";
import { useEffect, useState } from "react";
import { dbFoodMethods } from "../middleware/dbMethods";
import { useNavigate } from "react-router-dom";
import { fetcher, fetcherGET } from "../middleware/Fetcher";

export function CreateMealPlanContentv2({pageNum, mealType, setActivePage, recipes, selected, selectedSetter}) {

    return (
        <>
        {/* {pageNum} */}
          <Container>
            <Row className="">
              <Col>
                <h1>Pick Your {mealType} Items!</h1>
              </Col>
              <Col>
                <div style={{ textAlign: "right" }}>
                  <Button
                    className="buttonPrimary"
                    onClick={() => setActivePage(pageNum - 1)}
                  >
                    Prev Page
                  </Button>
                  <Button
                    className="buttonPrimary"
                    onClick={() => setActivePage(pageNum + 1)}
                  >
                    Next Page
                  </Button>
                </div>
              </Col>
            </Row>

            <Row xs={1} md={2} lg={3}>
                {recipes ? (
                    recipes.map((recipe) => (
                        <RecpieCardV2 key={recipe.id} recipe={recipe} setter={selectedSetter} render={recipe.id in selected ? false : true }/>
                    )))
                :(<Loader />)}
                {/* <Loader /> */}
            </Row>
          </Container>
        </>
      );

}

export function CreateMealPlanContentFinalise({info, recal}){
    const navigate = useNavigate();

    const [mealPlan, setMealPlan] = useState({});
    const [mealPlanCopy, setMealPlanCopy] = useState({});
    
    // shopping cart content
    // const [IDs, setIDs] = useState([]);
    // const [response, setResponse] = useState(null);
    const [shoppingCart, setShoppingCart] = useState({});
    
    const [flag, setFlag] = useState(0);

    useEffect(() => {
      // console.log(plan1);
      // console.log(plan2);
      if (
          Object.keys(mealPlan).length !== 0 &&
          Object.keys(mealPlanCopy).length !== 0 &&
          Object.keys(shoppingCart).length !== 0
          ) {
              console.log("send to db");
              dbFoodMethods.createMealplan(mealPlan, mealPlanCopy, shoppingCart);
              localStorage.removeItem("calories");
              localStorage.removeItem("allergies");
              navigate("/home");

              // console.log(response);
              // console.log(shoppingCart);  
              // console.log(mealPlan);
              // console.log(mealPlanCopy);
          }

    }, [flag]);
  // }, [mealPlan, mealPlanCopy, shoppingCart]);
  // }, [mealPlan, mealPlanCopy]);

  // const sendToDB = async () => {
  //   // if (
  //   //   Object.keys(mealPlan).length !== 0 &&
  //   //   Object.keys(mealPlanCopy).length !== 0 &&
  //   //   Object.keys(shoppingCart).length !== 0
  //   //   ) {
  //         console.log("send to db");
  //         // dbFoodMethods.createMealplan(mealPlan, mealPlanCopy, IDs);
  //         // localStorage.removeItem("calories");
  //         // localStorage.removeItem("allergies");
  //         // navigate("/home");   
  //         // console.log(response);
  //         console.log(shoppingCart);  
  //         console.log(mealPlan);  
  //         console.log(mealPlanCopy);  
  //     // }
  // }

    var dayIdx = 0


    const handleShoppingCart = async (res) => {
        // console.log(res);
        await res.forEach((recipe) => {

            setShoppingCart((prev) => {
                const updated = { ...prev };
        
                recipe.extendedIngredients.forEach((ingre) => {
                    const { aisle, id, name, measures } = ingre;
                    const amount = measures.metric.amount;
        
                    if (!updated[dayIdx]) {
                        updated[dayIdx] = {}; // Create dayIdx if it doesn't exist
                    }
        
                    if (!updated[dayIdx][aisle]) {
                        updated[dayIdx][aisle] = {}; // Create aisle if it doesn't exist
                    }
        
                    if (!updated[dayIdx][aisle][id]) {
                        updated[dayIdx][aisle][id] = {
                            name,
                            unit: measures.metric.unitShort,
                            amount,
                            completed: false,
                        };
                    } else {
                        // If the ingredient already exists, update the amount
                        updated[dayIdx][aisle][id].amount += amount;
                    }
                });
        
                return updated;
            });
        });
        dayIdx += 1;

        if (dayIdx === 7) {
            setFlag(1);
        }
    }


    const handleFinalise = async () => {
        if (
            Object.keys(info["Breakfast"].data).length > 0 && 
            Object.keys(info["Lunch"].data).length > 0 && 
            Object.keys(info["Dinner"].data).length > 0
        ){
            console.log("finalise meal plan");

            let IDs = [];
            // let counter =  0
            if (!recal){

                for (let i=1; i<8; i++){
                    ["Breakfast", "Lunch", "Dinner"].forEach(async (meal) => {
                        let randomDish = Object.keys(info[meal].data)[
                            Math.floor(
                            Math.random() * Object.keys(info[meal].data).length
                            )
                        ];
                        let recipe = info[meal].data[randomDish];
                        // console.log(recipe); 
                        // sum += value;

                        // setIDs((prev) => [...prev, recipe.id]);
                        IDs.push(recipe.id);
    
                        setMealPlan((prev) => {
                            const updated = {
                                ...prev,
                                [i]: {
                                  ...prev[i],
                                  [meal.toLowerCase()]: {
                                    [recipe.id]: recipe["nutrition"]["nutrients"][0]["amount"],
                                  },
                                },
                              };
                              return updated;
                        })
                        setMealPlanCopy((prev) => {
                            const updated = {
                                ...prev,
                                [i]: {
                                  ...prev[i],
                                  [meal.toLowerCase()]: {
                                    [recipe.id]: 0,
                                  },
                                },
                              };
                              return updated;
                        })
                    })
                  
                    await fetcherGET(
                      "/foodAPI/getBulk/?",
                      {
                        // ids: recipe.id,
                        ids: IDs.join(",")
                      },
                      handleShoppingCart
                    );
                    IDs = []

                }

                
            } else {
                
            }

        } else {
            alert("please select at least 1 dish for each meal type");
        }

    }


    return (
        <>
            <div style={{display:"flex", justifyContent:"space-between"}}>
                <h1>Finalise Meal Plan</h1>
                <div style={{textAlign:"right"}}>
                    <Button 
                        className="buttonPrimary"
                        onClick={async () => {
                          await handleFinalise()
                          // await createCart()
                        }}
                    >Finalise Plan</Button>
                </div>
            </div>
            {["Breakfast", "Lunch", "Dinner"].map((mealType) => (
                <div key={mealType}>
                    <h3>{mealType}</h3>
                    {Object.keys(info[mealType].data).length > 0 ? (
                        <Row xs={1} md={2} lg={3}>
                            {Object.keys(info[mealType].data).map((recipe) => (
                                // console.log(recipe),
                                <SelectedRecpieCardV2
                                    
                                    key={info[mealType].data[recipe].id} 
                                    recipe={info[mealType].data[recipe]}
                                    setter={info[mealType].setter}
                                />

                            ))}
                        </Row>
                    ) : (
                        <p>Please select at least 1 dish for {mealType}!</p>
                    )}
                </div>
            ))}
        </>
    )
}
