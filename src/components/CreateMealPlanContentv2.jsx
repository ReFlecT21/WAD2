import { Button, Col, Container, Row } from "react-bootstrap";
import Loader from "./Loader";
import { RecpieCardV2, SelectedRecpieCardV2 } from "./RecipeCard";
import { useEffect, useState } from "react";
import { dbFoodMethods } from "../middleware/dbMethods";
import { useNavigate } from "react-router-dom";
import { fetcher, fetcherGET } from "../middleware/Fetcher";
import { DotLoader } from "react-spinner-overlay";
import { FormDetails } from "../atoms/formAtom";
import { useAtom } from "jotai";
import Cookies from "js-cookie";

export function CreateMealPlanContentv2({
  pageNum,
  mealType,
  setActivePage,
  recipes,
  selected,
  selectedSetter,
}) {
  // console.log(recipes);

  return (
    <>
      {/* {pageNum} */}
      <Container>
        <Row className="stickyRow" style={{marginBottom: "20px"}}>
          <Col xs={12} md={6} lg={6} >
            <div className="text-center text-md-left" >

              <h1>Pick Your {mealType} Items!</h1>
            </div>
          </Col>
          <Col  xs={12} md={6} lg={6}> 
            <div style={{textAlign: "center", textAlign: "right", marginBottom: "20px"}} className="text-center text-md-right" >

              <Button 
                className="chooseBtn" 
                onClick={() => setActivePage(pageNum - 1)}
              >
                Prev
              </Button>
              

              <span style={{padding:"30px"}}></span>
              <Button
                className="chooseBtn" 
                onClick={() => setActivePage(pageNum + 1)}
              >
                Next
              </Button>
            </div>
          </Col>
        </Row>

        <Row className="mealCards" xs={3} md={3} lg={4}>
          {recipes ? (
            recipes.map((recipe) => (
              <RecpieCardV2 
                key={recipe.id}
                recipe={recipe}
                setter={selectedSetter}
                render={recipe.id in selected ? false : true}
              />
            ))
          ) : (
            <Loader />
          )}
        </Row>
      </Container>
    </>
  );
}

export function CreateMealPlanContentFinalise({ info, recal }) {
  const navigate = useNavigate();
  const [loadFlag, setLoadFlag] = useState(false);
  const [formData, setFormData] = useAtom(FormDetails);
  const [mealPlan, setMealPlan] = useState({});
  const [mealPlanCopy, setMealPlanCopy] = useState({});
  const [shoppingCart, setShoppingCart] = useState({});
  const [flag, setFlag] = useState(0);
  const handleNavigation = (path) => {
    navigate(path);
    setTimeout(() => {
      window.location.reload();
    }, 1000); // waits for 1 second before reloading
  };

  useEffect(() => {
    if (
      Object.keys(mealPlan).length !== 0 &&
      Object.keys(mealPlanCopy).length !== 0 &&
      Object.keys(shoppingCart).length !== 0
    ) {
      console.log("send to db");
      setLoadFlag(true);
      // console.log(mealPlan);
      // console.log(mealPlanCopy);
      // console.log(shoppingCart);

      if (recal == 0) {
        let x = dbFoodMethods.createMealplan(
          mealPlan,
          mealPlanCopy,
          shoppingCart,
          Cookies.get("calories"),
          formData
        );
      } else {
        let x = dbFoodMethods.recalMealplan(
          mealPlan,
          mealPlanCopy,
          shoppingCart,
          Cookies.get("calories")
        );
      }
      // console.log(mealPlan);
      // console.log(mealPlanCopy);

      Cookies.remove("calories");
      Cookies.remove("recal");

      if (Cookies.get("allergies")) {
        Cookies.remove("allergies");
      }

      handleNavigation("/home");
      // setTimeout(()=> {
      //     navigate("/home");
      //    }, 1500);
    }

    // }, [shoppingCart]);
  }, [flag]);

  // useEffect(() => {
  //     if (flag >0){
  //         navigate("/home");
  //     }
  // }, [flag]);

  const handleShoppingCart = async (res, dayIdx) => {
    // console.log(res, dayIdx);
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

    if (dayIdx == 7) {
      setFlag((prev) => prev + 1);
      // navigate("/home");
    }
  };

  const handleFinalise = async () => {
    if (
      Object.keys(info["Breakfast"].data).length > 0 &&
      Object.keys(info["Lunch"].data).length > 0 &&
      Object.keys(info["Dinner"].data).length > 0
    ) {
      let IDs = [];

      if (recal == 0) {
        console.log("finalise meal plan");
        for (let i = 1; i < 8; i++) {
          ["Breakfast", "Lunch", "Dinner"].forEach(async (meal) => {
            let randomDish = Object.keys(info[meal].data)[
              Math.floor(Math.random() * Object.keys(info[meal].data).length)
            ];
            let recipe = info[meal].data[randomDish];

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
            });

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
            });
          });

          await fetcherGET(
            "/foodAPI/getBulk/?",
            {
              ids: IDs.join(","),
            },
            handleShoppingCart,
            i,
            7
          );
          IDs = [];
        }
      } else {
        console.log("recal process");
        let exisitingMealPlan = JSON.parse(recal);
        console.log(exisitingMealPlan);
        console.log(typeof exisitingMealPlan);

        if (exisitingMealPlan) {
          for (const i in exisitingMealPlan) {
            // console.log(i);
            // check length of day in currMealPlan
            if (Object.keys(exisitingMealPlan[i]).length > 0) {
              for (const meal in exisitingMealPlan[i]) {
                // console.log(meal);
                let randomDish = Object.keys(
                  info[`${meal.charAt(0).toUpperCase() + meal.slice(1)}`].data
                )[
                  Math.floor(
                    Math.random() *
                      Object.keys(
                        info[`${meal.charAt(0).toUpperCase() + meal.slice(1)}`]
                          .data
                      ).length
                  )
                ];
                let recipe =
                  info[`${meal.charAt(0).toUpperCase() + meal.slice(1)}`].data[
                    randomDish
                  ];

                IDs.push(recipe.id);

                setMealPlan((prev) => {
                  const updated = {
                    ...prev,
                    [i]: {
                      ...prev[i],
                      [meal.toLowerCase()]: {
                        [recipe.id]:
                          recipe["nutrition"]["nutrients"][0]["amount"],
                      },
                    },
                  };
                  return updated;
                });
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
                });
              }

              await fetcherGET(
                "/foodAPI/getBulk/?",
                {
                  ids: IDs.join(","),
                },
                handleShoppingCart,
                i
              );

              IDs = [];
            } else {
              setMealPlan((prev) => {
                const updated = {
                  ...prev,
                  [i]: {},
                };
                return updated;
              });
              setMealPlanCopy((prev) => {
                const updated = {
                  ...prev,
                  [i]: {},
                };
                return updated;
              });
              setShoppingCart((prev) => {
                const updated = {
                  ...prev,
                  [i]: {},
                };
                return updated;
              });
            }
          }
        }
      }
    } else {
      alert("please select at least 1 dish for each meal type");
    }
  };

  return (
    <>
      {loadFlag ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "60vh",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <DotLoader
              loading={loadFlag}
              color="#1F5E4B"
              size={40}
              between={50}
            />
            <h5 style={{ display: "block", margin: "30px" }}>
              Creating Meal Plan...
            </h5>
          </div>
        </div>
      ) : (
        <>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop:"50px"}}>
            <h1>Finalise Meal Plan</h1>
            <div style={{ textAlign: "right", marginTop:"20px "}}>
              <Button
                className="chooseBtn"
                onClick={async () => {
                  setLoadFlag(true);
                  await handleFinalise();
                  // navigate("/home");
                }}
              >
                Finalise Plan
              </Button>
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
      )}
    </>
  );
}
