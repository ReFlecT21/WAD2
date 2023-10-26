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
    const [response, setResponse] = useState(null);
    const [shoppingCart, setShoppingCart] = useState({});

    useEffect(() => {
      // console.log(plan1);
      // console.log(plan2);
      if (
          Object.keys(mealPlan).length !== 0 &&
          Object.keys(mealPlanCopy).length !== 0 &&
          Object.keys(shoppingCart).length !== 0
          ) {
              console.log("send to db");
              // dbFoodMethods.createMealplan(mealPlan, mealPlanCopy, IDs);
              // localStorage.removeItem("calories");
              // localStorage.removeItem("allergies");
              // navigate("/home");   
              console.log(response);
              console.log(shoppingCart);  
          }




  // }, [shoppingCart]);
  }, [mealPlan, mealPlanCopy]);

  const populateCart = (res) => {
    if (res?.length > 0) {
      console.log("populating")
      console.log(res);
      res.forEach((recipe) => {
        recipe.extendedIngredients.forEach((ingre) => {
          setShoppingCart((prev) => ({
            ...prev,
            [ingre.aisle]: {
              ...prev[ingre.aisle],
              [ingre.id]: {
                name: ingre.name,
                amount: ingre.measures.metric.amount,
                unit: ingre.measures.metric.unitShort,
              }
            },
          }));
        });
      });

      console.log(shoppingCart);
    }
  }

  const createCart = async () => {
    console.log("shopping cart ")

    // loop through display meal plan instead creating IDs
    if (IDs.length > 0) {
      await fetcherGET(
        "/foodAPI/getBulk/?",
        {
          ids: IDs.join(","),
        },
        setResponse
        );
        console.log(response)
        populateCart(response)
      }
  }
    // useEffect(() => {
    //   // console.log(IDs)
    //   createCart()
      
    // }, [IDs]);


    const handleFinalise = async () => {
        if (
            Object.keys(info["Breakfast"].data).length > 0 && 
            Object.keys(info["Lunch"].data).length > 0 && 
            Object.keys(info["Dinner"].data).length > 0
        ){
            console.log("finalise meal plan");

            if (!recal){

                for (let i=1; i<8; i++){
                    ["Breakfast", "Lunch", "Dinner"].forEach((meal) => {
                        let randomDish = Object.keys(info[meal].data)[
                            Math.floor(
                            Math.random() * Object.keys(info[meal].data).length
                            )
                        ];
                        let recipe = info[meal].data[randomDish];
                        // console.log(recipe); 
                        // sum += value;

                        // setIDs((prev) => [...prev, recipe.id]);
    
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
                        // setMealPlan((prev) => ({
                        //     ...prev,
                        //     [i]: {
                        //     ...prev[i],
                        //         [meal.toLowerCase()]: {
                        //             [recipe.id]: recipe["nutrition"]["nutrients"][0]["amount"],
                        //         },
                        //     },
                        // }));
    
                        // setMealPlanCopy((prev) => ({
                        //     ...prev,
                        //     [i]: {
                        //         ...prev[i],
                        //             [meal.toLowerCase()]: {
                        //                 [recipe.id]: 0,
                        //         },
                        //     },
                        // }));
                    })
    
                }

                // sendToDB(mealPlan, mealPlanCopy);
                // IDs.forEach((id) => {});
                // handleShoppingCart()
                // createCart()

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
                          await createCart()
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
