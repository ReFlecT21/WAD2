import { Button, Col, Container, Row } from "react-bootstrap";
import Loader from "./Loader";
import { RecpieCardV2, SelectedRecpieCardV2 } from "./RecipeCard";
import { useEffect, useState } from "react";
import { dbFoodMethods } from "../middleware/dbMethods";
import { useNavigate } from "react-router-dom";
import { FormDetails } from "../atoms/formAtom";
import { useAtom } from "jotai";
import Cookies from "js-cookie";
// import Lottie from "lottie-web";
import Lottie from "lottie-react";
import LoadingAnimationData from "../assets/loading.json"
import { backendMethods } from "../middleware/backendMethods";


export function CreateMealPlanContentv2({
  pageNum,
  mealType,
  setActivePage,
  recipes,
  selected,
  selectedSetter,
  bufferFlag
}) {
  // console.log(recipes);

  // const [buffer, setBuffer] = useState(!bufferFlag);


  return (
    <>
      {/* {pageNum} */}
      <Container>
        <Row className="stickyRow" style={{ marginBottom: "20px" }}>
          <Col xs={12} md={6} lg={6}>
            <div className="text-center text-md-left">
              <h1>Pick Your {mealType} Items!</h1>
            </div>
          </Col>
          <Col xs={12} md={6} lg={6}>
            <div
              style={{ textAlign: "center", marginBottom: "20px" }}
              className="text-center text-md-right"
            >
              <Button
                className="chooseBtn"
                onClick={() => setActivePage(pageNum - 1)}
                disabled={pageNum == 1 ? true : false}
              >
                Prev
              </Button>

              <span style={{ padding: "30px" }}></span>
              <Button
                className="chooseBtn"
                onClick={() => setActivePage(pageNum + 1)}
              >
                Next
              </Button>
            </div>
          </Col>
        </Row>

          {!bufferFlag ? (
            // <Row xs={12} style={{ display:"flex", alignItems:"center" }}>
            <Row style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              {/* <div style={{textAlign:"center"}}> */}
                <Lottie
                  animationData={LoadingAnimationData} // Your animation data
                  loop={true} // Set to true for looped animations
                  autoplay={true} // Set to true to play the animation automatically
                  style={{ width: "600px", height: "300px", objectFit:"cover", overflow:"hidden"}}
                />
              {/* </div> */}
            </Row>
          ) : (
            <>
              {recipes && recipes.length>0 ? (
                <Row className="mealCards" xs={3} md={3} lg={4}>
                {recipes.map((recipe) => (
                  <RecpieCardV2
                    key={recipe.id}
                    recipe={recipe}
                    setter={selectedSetter}
                    render={recipe.id in selected ? false : true}
                    />
                ))}
                </Row>
              ) : (
                <Row style={{textAlign:"center"}}>
                  <h4>No Meals Match Your Required Caloric Intake/Dietary Restrictions</h4>
                </Row>
              )}
            </>

          )}

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
      // console.log("send to db");
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


  const [countCart, setCountCart] = useState(0);

  useEffect(() => {
    if (countCart == 7) {
      setFlag((prev) => prev + 1);
      // navigate("/home");
    }
  }, [countCart]);


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
    
    setCountCart((prev) => prev + 1);
  };

  const handleFinalise = async () => {
    if (
      Object.keys(info["Breakfast"].data).length > 0 &&
      Object.keys(info["Lunch"].data).length > 0 &&
      Object.keys(info["Dinner"].data).length > 0
    ) {
      let IDs = [];

      if (recal == 0) {
        // console.log(info)
        // console.log("finalise meal plan");
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

          // await fetcherGET(
          //   "/foodAPI/getBulk/?",
          //   {
          //     ids: IDs.join(","),
          //   },
          //   handleShoppingCart,
          //   i,
          // );
          // IDs = [];

          await backendMethods.fetcherGET("getBulk/?", {ids: IDs.join(",")}, handleShoppingCart, i)
        }
      } else {
        // console.log("recal process");
        let exisitingMealPlan = JSON.parse(recal);
        // console.log(typeof exisitingMealPlan);
        
        if (exisitingMealPlan) {
          // console.log(exisitingMealPlan);

          for (const i in exisitingMealPlan) {
            // console.log(i);
            // check length of day in currMealPlan
            if (Object.keys(exisitingMealPlan[i]).length > 0) {
              for (const meal in exisitingMealPlan[i]) {
                // console.log(i, meal);
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

              // await fetcherGET(
              //   "/foodAPI/getBulk/?",
              //   {
              //     ids: IDs.join(","),
              //   },
              //   handleShoppingCart,
              //   i
              // );
              await backendMethods.fetcherGET("getBulk/?", {ids: IDs.join(",")}, handleShoppingCart, i)

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
              setCountCart((prev) => prev + 1);
            }
          }
        }
      }
    } else {
      alert("please select at least 1 dish for each meal type");
      setLoadFlag(false);
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
            height: "25vh",
          }}
        >
          <div style={{ textAlign: "center" }}>
            {/* <DotLoader
              loading={loadFlag}
              color="#1F5E4B"
              size={40}
              between={50}
            /> */}
            <Lottie
              animationData={LoadingAnimationData} // Your animation data
              loop={true} // Set to true for looped animations
              autoplay={true} // Set to true to play the animation automatically
              style={{ width: "700px", height: "700px" }}
            />
            {/* <h5 style={{ display: "block", margin: "30px" }}>
              Creating Meal Plan...
            </h5> */}
          </div>
        </div>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "50px",
            }}
          >
            <h1>Finalise Meal Plan</h1>
            <div style={{ textAlign: "right", marginTop: "20px " }}>
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
