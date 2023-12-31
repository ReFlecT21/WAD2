// import {  } from "@mui/material";
import {
  Modal,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
} from "@mui/material";

import { useAtom } from "jotai";
import { RecipeOverlay } from "../atoms/recipeOverlay";
import React, { useEffect, useState } from "react";
import {
  Stack,
  InputGroup,
  Form,
  Button,
  Card,
  Row,
  Col,
  Image,
  Tabs,
  Tab,
} from "react-bootstrap";
import { dbFoodMethods } from "../middleware/dbMethods";
import { useNavigate } from "react-router-dom";
import { RecalAtom } from "../atoms/recal";
import Cookies from "js-cookie";

import styled from "styled-components";
import { Scan } from "./scan";
import BasicPopover from "./ManualSearchInstructions";
import PageNotification from "./PageNotification";
import { backendMethods } from "../middleware/backendMethods";

// CONFIRM MODAL
function ConfirmModal({ foodDetails, day_Index, Meal_Type }) {
  // console.log(foodDetails);
  const [recal, setRecal] = useState(false);
  const [reload, setReload] = useState(false);
  const [overlayData, setOverlayData] = useAtom(RecipeOverlay);
  const navigate = useNavigate();

  const [ConfirmModalopen, setConfirmModalOpen] = useState(false);
  const handleClose = () => {
    setConfirmModalOpen(false);
  };

  const handleAdd = async () => {
    if (day_Index == 0) {
      dbFoodMethods.oddManualInput(foodDetails);
    } else {
      let res = await dbFoodMethods.completeMeal(
        day_Index,
        Meal_Type,
        foodDetails
      );
      setReload(true);
      return res;
    }
  };
  const handleRecal = async () => {
    // console.log(day_Index);

    if (day_Index == 0) {
      dbFoodMethods.oddManualInput(foodDetails);
    } else {
      dbFoodMethods
        .completeMeal(day_Index, Meal_Type, foodDetails)
        .then(async (res) => {
          // console.log(res);
          if (res.Plan) {
            const expirationTimeInHours = 1;
            const expirationDate = new Date(
              new Date().getTime() + expirationTimeInHours * 60 * 60 * 1000
            );
            // let remainingCal = await dbFoodMethods.getRemainingCalories(res);
            let remainingCal = () => {
              let countMeals = 0;
              for (const day in res.Plan) {
                for (const mealType in res.Plan[day]) {
                  countMeals += 1;
                }
              }
              // console.log(countMeals);

              return parseInt(Math.floor((res.cal / countMeals) * 3));
            };
            // console.log(remainingCal());

            if (remainingCal() > 999) {
              Cookies.set("recal", JSON.stringify(res.Plan), {
                expires: expirationDate,
              });
              Cookies.set("calories", remainingCal(), {
                expires: expirationDate,
              });
              setOverlayData([]);
              navigate("/choose");
            } else {
              alert(
                "You can only recalculate if you have at least 1000 calories per day left"
              );
            }
          }
        });
    }
  };

  const recalRedirect = async () => {
    const expirationTimeInHours = 1;
    const expirationDate = new Date(
      new Date().getTime() + expirationTimeInHours * 60 * 60 * 1000
    );
    let remainingCal = await dbFoodMethods.getRemainingCalories();

    if (remainingCal > 999) {
      Cookies.set("recal", 1, { expires: expirationDate });
      Cookies.set("calories", remainingCal, { expires: expirationDate });
      setOverlayData([]);
      navigate("/choose");
    } else {
      alert(
        "You can only recalculate if you have at least 1000 calories per day left"
      );
    }
  };

  useEffect(() => {
    if (reload) {
      window.location.reload();
    }
  }, [reload]);

  return (
    // console.log(foodDetails),
    <React.Fragment>
      <Button
        className="buttonPrimary"
        style={{ width: "100px" }}
        onClick={() => {
          setConfirmModalOpen(true);
        }}
      >
        Confirm
      </Button>

      <Modal open={ConfirmModalopen} onClose={handleClose}>
        <Box className="popup">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button className="chooseBtn" onClick={handleClose}>
              Back
            </Button>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "85px",
            }}
          >
            <h2>Are you sure?</h2>
            {}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              marginTop: "30px",
            }}
          >
            <Button className="chooseBtn" onClick={handleAdd}>
              Add
            </Button>

            <Button
              className="chooseBtn"
              onClick={async () => {
                await handleRecal();
                // await recalRedirect()
              }}
            >
              Replan
            </Button>
          </div>
          <div style={{ textAlign: "center", marginTop: "50px" }}>
            <p style={{ color: "#1F5E4B" }}>
              You will be replacing your Day {day_Index} {Meal_Type}. <br /> By
              replanning, you will reselect your meals for the rest of the week.
            </p>
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

// CHILD MODAL

function ChildModal({
  food_Array,
  dayIndex,
  MealType,
  setFoodArray,
  setCount,
}) {
  // console.log(dayIndex );

  const [searchData, setSearchData] = useState({});
  const [ChildModalopen, setChildModalOpen] = useState(false);
  const [foodDetailsArrays, setFoodDetailsArrays] = useState([]);

  const handleClose = () => {
    setFoodArray([]);
    setChildModalOpen(false);
  };
  const [added, setAdded] = useState([]);

  const createFoodDetails = () => {
    if (searchData) {
      let newFoodDetailsArrays = []; // Initialize an empty array to store the arrays of food details
      Object.keys(searchData).forEach((key) => {
        // searchData[key].forEach((food) => {
        let foodDetails = {}; // Initialize an array for each set of food details

        foodDetails["food_name"] = searchData[key]["food_name"];
        foodDetails["calories"] = searchData[key]["nf_calories"];
        foodDetails["protein"] = searchData[key]["nf_protein"];
        foodDetails["fat"] = searchData[key]["nf_total_fat"];
        foodDetails["carbs"] = searchData[key]["nf_total_carbohydrate"];
        foodDetails["quantity"] = searchData[key]["quantity"];

        // Add the array of food details to the new array
        newFoodDetailsArrays.push(foodDetails);
        // });
      });
      // console.log(newFoodDetailsArrays);
      return newFoodDetailsArrays;
    } else {
      alert("error");
    }
  };

  function handleRemove(key, food) {
    const newSearchData = { ...searchData };

    if (key > -1) {
      delete newSearchData[key];
      setCount((prevCount) => prevCount - 1);
    }

    setSearchData(newSearchData);
  }

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <React.Fragment>
      <Button
        className="buttonPrimary"
        style={{ width: "100px" }}
        onClick={() => {
          // if(food_Array.length == 0){
          //     // alert("Please add at least one food item");
          //     // return
          // } else {
          setChildModalOpen(true);

          // console.log(food_Array);
          const fetchPromises = food_Array.map((food) => {
            if (food instanceof Object) {
              // console.log(food);
              return new Promise((resolve, reject) => {
                resolve(food);
              });
            } else {
              const body = {
                query: food,
                include_subrecipe: true,
                use_raw_foods: false,
                line_delimited: true,
                claims: true,
                taxonomy: true,
                ingredient_statement: true,
              };

              // return fetcherPOST("/foodAPI/manualSearch", body);
              return backendMethods.fetcherPOST("manualSearch", body);
            }
          });
          Promise.all(fetchPromises)
            .then((data) => {
              // console.log(data);
              data.forEach((food, index) => {
                if (food?.foods) {
                  // console.log(food.foods);
                  food.foods[0]["quantity"] = 1;
                  setSearchData((prevData) => ({
                    ...prevData,
                    [index]: food.foods[0],
                  }));
                } else {
                  // console.log(food);
                  food["quantity"] = 1;
                  setSearchData((prevData) => ({ ...prevData, [index]: food }));
                }
              });
            })
            .catch((error) => console.error(error));

          // }
        }}
      >
        Confirm
      </Button>
      {/* {console.log(searchData)} */}
      <Modal open={ChildModalopen} onClose={handleClose}>
        <Box className="popup">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              className="buttonPrimary"
              style={{ width: "100px" }}
              onClick={handleClose}
            >
              Back
            </Button>

            <ConfirmModal
              foodDetails={createFoodDetails()}
              day_Index={dayIndex}
              Meal_Type={MealType}
            />
          </div>
          <div
            style={{
              display: "block",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {searchData ? (
              <div>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Qty</TableCell>
                        <TableCell>Food Name</TableCell>
                        {width > 499 ? (
                          <>
                            <TableCell>Calories</TableCell>
                          </>
                        ) : (
                          <></>
                        )}
                        {width > 964 ? (
                          <>
                            <TableCell>Total Protein</TableCell>
                            <TableCell>Total Fats</TableCell>
                            <TableCell>Total Carbohydrates</TableCell>
                          </>
                        ) : (
                          <></>
                        )}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Object.keys(searchData).map((key) => {
                        return (
                          // console.log(searchData[key]),

                          <TableRow key={key}>
                            <TableCell>
                              <Form.Control
                                type="number"
                                style={{ width: "60px" }}
                                value={
                                  searchData[key]?.["quantity"]
                                    ? searchData[key]["quantity"]
                                    : ""
                                }
                                onChange={(e) => {
                                  const newQuantity = parseInt(
                                    e.target.value,
                                    10
                                  );
                                  setSearchData({
                                    ...searchData,
                                    [key]: {
                                      ...searchData[key],
                                      quantity: newQuantity,
                                    },
                                  });
                                }}
                              />
                            </TableCell>
                            <TableCell>
                              {searchData[key]["food_name"]}
                            </TableCell>
                            {width > 499 ? (
                              <>
                                <TableCell>
                                  {searchData[key]["nf_calories"]}
                                </TableCell>
                              </>
                            ) : (
                              <></>
                            )}

                            {width > 964 ? (
                              <>
                                <TableCell>
                                  {searchData[key]["nf_protein"]}
                                </TableCell>
                                <TableCell>
                                  {searchData[key]["nf_total_fat"]}
                                </TableCell>
                                <TableCell>
                                  {searchData[key]["nf_total_carbohydrate"]}
                                </TableCell>
                              </>
                            ) : (
                              <></>
                            )}

                            <TableCell>
                              <Button
                                className="buttonPrimary"
                                onClick={() =>
                                  handleRemove(key, searchData[key])
                                }
                              >
                                {width > 824 ? "Remove" : "Del"}
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            ) : (
              <h2>loading</h2>
            )}
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export function ManualSearchComponent({ currDay, showNotification }) {
  const instantSearchRes = [];
  const [mealModalOpen, setMealModalOpen] = useState(true);
  const [overlayData, setOverlayData] = useAtom(RecipeOverlay);
  const [selectedMeal, setSelectedMeal] = useState("");
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
    setMealModalOpen(false);
    setOverlayData([]);
    setSelectedMeal("");
  };

  // FORM VALIDATION

  const [inputValue, setInputValue] = useState("");
  const [inputError, setInputError] = useState(null);
  const [instantData, setInstantData] = useState(null);

  const [count, setCount] = useState(0);
  const [foodArray, setFoodArray] = useState([]);

  function handleInputChange(event) {
    const value = event.target.value;
    setInputValue(value);

    backendMethods.fetcherGET(
      "instantSearch/?",
      { query: value },
      setInstantData
    );
  }

  async function checkValidMeal(mealType) {
    let res = await dbFoodMethods.getMealPlan();
    // console.log(currDay);

    // console.log(res.mealPlan[props.currDay][mealType]);
    if (res.mealPlan[currDay][mealType] != undefined) {
      setSelectedMeal(mealType);
      setMealModalOpen(false);
    } else {
      alert(`You cannot add ${mealType} again!`);
    }
  }

  useEffect(() => {}, [foodArray]);
  // ------------------------------------------------------------------------------------

  if (instantData != null) {
    // console.log(instantData);

    instantData["common"].forEach((food) => {
      instantSearchRes.push(
        <Col key={food.food_name}>
          <Stack
            direction="horizontal"
            style={{ border: "0px", margin: "10px", textAlign: "center" }}
            onClick={null}
          >
            <Image
              className="img-overlay-small"
              style={{ margin: "5px" }}
              src={food["photo"]["thumb"]}
              rounded
            />
            <div>
              <h5>{food["food_name"]}</h5>

              <Button
                className="buttonPrimary"
                onClick={() => {
                  setCount((prevCount) => prevCount + 1);
                  showNotification("Food item has been added!");
                  setFoodArray((prevFoodArray) => [
                    ...prevFoodArray,
                    food["food_name"],
                  ]);
                }}
              >
                {" "}
                Select{" "}
              </Button>
            </div>
          </Stack>
        </Col>
      );
    });
  }

  const [scanData, setScanData] = useState({
    calories: { value: 0, flag: false },
    carbs: { value: 0, flag: false },
    fat: { value: 0, flag: false },
    protein: { value: 0, flag: false },
  });

  // console.log(scanData);

  return (
    <div>
      <Modal open={mealModalOpen} onClose={handleClose}>
        <Box
          className="popup"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <h1>Select a meal</h1>
            <br />
            <Row>
              <Col>
                <Button
                  className="buttonPrimary"
                  style={{ marginTop: "10px", marginBottom: "10px" }}
                  onClick={() => {
                    checkValidMeal("breakfast");
                  }}
                >
                  Breakfast
                </Button>
              </Col>
              <Col>
                <Button
                  className="buttonPrimary"
                  style={{ marginTop: "10px", marginBottom: "10px" }}
                  onClick={() => {
                    checkValidMeal("lunch");
                  }}
                >
                  Lunch
                </Button>
              </Col>
              <Col>
                <Button
                  className="buttonPrimary"
                  style={{ marginTop: "10px", marginBottom: "10px" }}
                  onClick={() => {
                    checkValidMeal("dinner");
                  }}
                >
                  Dinner
                </Button>
              </Col>
            </Row>
          </div>
        </Box>
      </Modal>
      <Modal
        open={selectedMeal !== ""}
        onClose={handleClose}
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        <Box className="popup">
          <div className="text-center">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "15px",
              }}
            >
              <BasicPopover />

              <h5>Number of items added: {count}</h5>

              <ChildModal
                food_Array={foodArray}
                dayIndex={currDay}
                MealType={selectedMeal}
                setFoodArray={setFoodArray}
                setCount={setCount}
              />
            </div>
            <Tabs
              style={{ backgroundColor: "", color: "" }}
              defaultActiveKey="search"
              id="uncontrolled-tab-example"
              className="mb-3"
              fill
            >
              <Tab
                eventKey="search"
                title={"Manual Search"}
                className="custom-tab-title"
              >
                <Form>
                  <InputGroup className="mb-3">
                    <Form.Control
                      style={{ borderRadius: "20px" }}
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      value={inputValue}
                      onChange={handleInputChange}
                      placeholder="type something!"
                    />
                  </InputGroup>

                  {inputError && (
                    <div style={{ color: "red" }}>{inputError}</div>
                  )}
                </Form>
                {instantSearchRes && (
                  <Row xs={1} md={3} className="g-4">
                    {instantSearchRes}
                  </Row>
                )}
              </Tab>
              <Tab eventKey="scan" title={"Manually Type or Scan"}>
                <Form onSubmit={(event) => event.preventDefault()}>
                  <InputGroup className="mb-3">
                    <Row xs={1} md={2}>
                      <Col md={12}>
                        <h5>Food Name</h5>
                        <Form.Control
                          style={{ marginBottom: "15px", borderRadius: "20px" }}
                          id="manual_foodName"
                          aria-label="name"
                          aria-describedby="inputGroup-sizing-default"
                          placeholder="What are you eating?"
                        />
                      </Col>

                      <div>
                        <h5>Calories</h5>
                        <Form.Control
                          style={{ marginBottom: "15px", borderRadius: "20px" }}
                          type="number"
                          id="manual_calories"
                          aria-label="name"
                          aria-describedby="inputGroup-sizing-default"
                          placeholder="Kcal"
                          value={scanData.calories.value}
                          onChange={(e) => {
                            // Update the state variable when the input changes
                            setScanData((prev) => ({
                              ...prev,
                              calories: { value: e.target.value },
                            }));
                          }}
                        />
                      </div>

                      <div>
                        <h5>Protein</h5>
                        <Form.Control
                          style={{ marginBottom: "15px", borderRadius: "20px" }}
                          type="number"
                          id="manual_protein"
                          aria-label="name"
                          aria-describedby="inputGroup-sizing-default"
                          placeholder="grams"
                          value={scanData.protein.value}
                          onChange={(e) => {
                            setScanData((prev) => ({
                              ...prev,
                              protein: { value: e.target.value },
                            }));
                          }}
                        />
                      </div>

                      <div>
                        <h5>Fat</h5>
                        <Form.Control
                          style={{ marginBottom: "15px", borderRadius: "20px" }}
                          type="number"
                          id="manual_fat"
                          aria-label="name"
                          aria-describedby="inputGroup-sizing-default"
                          placeholder="grams"
                          value={scanData.fat.value}
                          onChange={(e) => {
                            // Update the state variable when the input changes
                            setScanData((prev) => ({
                              ...prev,
                              fat: { value: e.target.value },
                            }));
                          }}
                        />
                      </div>

                      <div>
                        <h5>Carbs</h5>
                        <Form.Control
                          style={{ borderRadius: "20px" }}
                          type="number"
                          id="manual_carbs"
                          aria-label="name"
                          aria-describedby="inputGroup-sizing-default"
                          placeholder="grams"
                          value={scanData.carbs.value}
                          onChange={(e) => {
                            // Update the state variable when the input changes
                            setScanData((prev) => ({
                              ...prev,
                              carbs: { value: e.target.value },
                            }));
                          }}
                        />
                      </div>
                    </Row>
                  </InputGroup>
                  <div
                    style={{ display: "flex", justifyContent: "space-evenly" }}
                  >
                    <Scan setScanData={setScanData} scanData={scanData} />
                    <Button
                      // type="submit"
                      className="chooseBtn"
                      style={{ width: "200px", height: "50px", margin: "0px" }}
                      onClick={(event) => {
                        event.preventDefault(); // Prevent default form submission
                        if (
                          document
                            .getElementById("manual_foodName")
                            .value.trim() === "" ||
                          document
                            .getElementById("manual_calories")
                            .value.trim() === "" ||
                          document
                            .getElementById("manual_protein")
                            .value.trim() === "" ||
                          document.getElementById("manual_fat").value.trim() ===
                            "" ||
                          document
                            .getElementById("manual_carbs")
                            .value.trim() === ""
                        ) {
                          alert("Please fill in all fields"); // Show an error message
                        } else {
                          setCount((prevCount) => prevCount + 1);
                          let temp = {
                            food_name:
                              document.getElementById("manual_foodName").value,
                            nf_calories:
                              document.getElementById("manual_calories").value,
                            nf_protein:
                              document.getElementById("manual_protein").value,
                            nf_total_fat:
                              document.getElementById("manual_fat").value,
                            nf_total_carbohydrate:
                              document.getElementById("manual_carbs").value,
                          };
                          setFoodArray((prevFoodArray) => [
                            ...prevFoodArray,
                            temp,
                          ]);

                          showNotification("Food item has been added!");
                        }
                      }}
                    >
                      Add
                    </Button>
                  </div>

                  {inputError && (
                    <div style={{ color: "red" }}>{inputError}</div>
                  )}
                </Form>
              </Tab>
            </Tabs>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
