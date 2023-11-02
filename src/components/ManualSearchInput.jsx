// import {  } from "@mui/material";
import { Modal, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from '@mui/material';

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
import { fetcher, fetcherGET, fetcherPOST } from "../middleware/Fetcher";
import { dbFoodMethods } from "../middleware/dbMethods";
import { useNavigate } from "react-router-dom";
import { RecalAtom } from "../atoms/recal";
import Cookies from "js-cookie";

import styled from 'styled-components';
import { Scan } from "./scan";
import BasicPopover from "./ManualSearchInstructions";
import PageNotification from "./PageNotification";




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
            dbFoodMethods.oddManualInput(foodDetails)
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
            dbFoodMethods.oddManualInput(foodDetails)

        } else {
            dbFoodMethods.completeMeal(
                day_Index,
                Meal_Type,
                foodDetails
            ) .then(async (res) => {
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
                    }
                    // console.log(remainingCal());
                        
                    if (remainingCal() > 999){
                        Cookies.set("recal", JSON.stringify(res.Plan), { expires: expirationDate });
                        Cookies.set("calories", remainingCal(), { expires: expirationDate });
                        setOverlayData([]);
                        navigate("/choose");
                    } else {
                        alert("You can only recalculate if you have at least 1000 calories per day left")
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
            
        if (remainingCal > 999){
            Cookies.set("recal", 1, { expires: expirationDate });
            Cookies.set("calories", remainingCal, { expires: expirationDate });
            setOverlayData([]);
            navigate("/choose");
        } else {
            alert("You can only recalculate if you have at least 1000 calories per day left")
        }
    }

    useEffect(() => {
        if (reload) {
            window.location.reload();
        }
    }, [reload]);

    // useEffect(() => {
    //     const callback = async () => {
    //         const expirationTimeInHours = 1;
    //         const expirationDate = new Date(
    //         new Date().getTime() + expirationTimeInHours * 60 * 60 * 1000
    //         );
    //         let remainingCal = await dbFoodMethods.getRemainingCalories();
                
    //         if (remainingCal > 999){
    //             Cookies.set("recal", 1, { expires: expirationDate });
    //             Cookies.set("calories", remainingCal, { expires: expirationDate });
    //             setOverlayData([]);
    //             navigate("/choose");
    //         } else {
    //             alert("You can only recalculate if you have at least 1000 calories per day left")
    //         }
    //     }

    //     if (recal) {
    //         callback();
    //     }
    // }, [recal]);

// user to manual select meal type
// check whether plan still exists
// if plan exists, you cannot eat this
// if plan does not exists, you can eat this

// Show to him how much he is over or under for that plan by comparing manually added cal to the current day meal type cal
// Recal or ADD
// if recal,
// minus off manually added cals from weekly calories before sending remaining cals to recal

// if add,
// add into added array
// delete current day meal type
// display plan must change to 1 for that meal type

return (
    console.log(foodDetails),
    <React.Fragment>
    <Button
        className="chooseBtn"
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
            <Button className="chooseBtn" onClick={handleAdd}>
            Add
            </Button>
            <Button className="chooseBtn" onClick={async ()=>{
                await handleRecal()
                // await recalRedirect()
                }}>
            Recal
            </Button>
        </div>
        
        <div
            style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            }}
        >
            <h2>Confrim modal</h2>
            {}
        </div>
        </Box>
    </Modal>
    </React.Fragment>
);
}

// CHILD MODAL

function ChildModal({ food_Array, dayIndex, MealType, setFoodArray, setCount }) {
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

                // foodDetails.push(searchData[key]["food_name"]);
                // foodDetails.push(parseFloat(searchData[key]["nf_calories"]));
                // foodDetails.push(parseFloat(searchData[key]["nf_protein"]));
                // foodDetails.push(parseFloat(searchData[key]["nf_total_fat"]));
                // foodDetails.push(parseFloat(searchData[key]["nf_total_carbohydrate"]));
                // foodDetails.push(searchData[key]?.photo.highres ? searchData[key].photo.highres : "");
                // foodDetails.push(searchData[key]["nf_cholesterol"]);

                // Add the array of food details to the new array
                newFoodDetailsArrays.push(foodDetails);
                // });
            });
            // console.log(newFoodDetailsArrays);
            return newFoodDetailsArrays;
        } else {
            alert("error")
        }
    };

    function handleRemove(key, food) {
        // Remove the food item from searchData
        const newSearchData = { ...searchData };
        // console.log(key);
        // console.log(newSearchData);
        // const index = newSearchData[key].indexOf(food);
        if (key > -1) {
            // newSearchData[key].splice(index, 1);
            delete newSearchData[key];
            setCount((prevCount) => prevCount - 1);
        }

        // Update the state with the new searchData
        setSearchData(newSearchData);
    }

    const [width, setWidth] = useState(window.innerWidth);
  
    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []); 
    

    return (
        <React.Fragment>
        <Button
            className="buttonPrimary"
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
                
                            return fetcherPOST("/foodAPI/manualSearch", body);
                        }
                    });
                    Promise.all(fetchPromises)
                        .then((data) => {
                            // console.log(data);
                            data.forEach((food, index) => {
                                if (food?.foods){
                                    // console.log(food.foods);
                                    food.foods[0]["quantity"] = 1;
                                    setSearchData((prevData) => ({ ...prevData, [index]:food.foods[0] }));
                                } else {
                                    // console.log(food);  
                                    food["quantity"] = 1;
                                    setSearchData((prevData) => ({ ...prevData, [index]:food }));
                                }
    
                            });
                        })
                        .catch((error) => console.error(error));

                // }

            }}
        >
            confirm
        </Button>
        {/* {console.log(searchData)} */}
        <Modal open={ChildModalopen} onClose={handleClose}>
            <Box className="popup">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button className="buttonPrimary" onClick={handleClose}>
                Back
                </Button>
                {/* <Button className="buttonPrimary" onClick={null}>Confirm</Button> */}
                <ConfirmModal
                // foodDetails={foodDetailsArrays}
                foodDetails={createFoodDetails()}
                day_Index={dayIndex}
                Meal_Type={MealType}
                />
            </div>
            {/* <h2>Text in a child modal</h2> */}
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
                            ):(<></>)}
                            {width > 824 ? (
                                <>
                                    <TableCell>Total Protein</TableCell>
                                    <TableCell>Total Fats</TableCell>
                                    <TableCell>Total Carbohydrates</TableCell>
                                </>
                            ):(<></>)}
                            
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
                                                    style={{width:"60px"}}
                                                    value={searchData[key]?.["quantity"] ? searchData[key]["quantity"]: ""}
                                                    onChange={(e) => {
                                                        const newQuantity = parseInt(e.target.value, 10);
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
                                            <TableCell>{searchData[key]["food_name"]}</TableCell>
                                            {width > 499 ? (
                                                <>
                                                    <TableCell>{searchData[key]["nf_calories"]}</TableCell>
                                                </>
                                            ):(<></>)}
                                            
                                            {width > 824 ? (
                                                <>
                                                    <TableCell>{searchData[key]["nf_protein"]}</TableCell>
                                                    <TableCell>{searchData[key]["nf_total_fat"]}</TableCell>
                                                    <TableCell>{searchData[key]["nf_total_carbohydrate"]}</TableCell>
                                                </>
                                            ):(<></>)}
                                           
                                            <TableCell>
                                                <Button className="buttonPrimary" onClick={() => handleRemove(key, searchData[key])}>{width > 824 ? ("Remove"):("Del")}</Button>
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

export function ManualSearchComponent({currDay, showNotification}) {

    const instantSearchRes = [];
    const [mealModalOpen, setMealModalOpen] = useState(true);
    const [overlayData, setOverlayData] = useAtom(RecipeOverlay);
    const [selectedMeal, setSelectedMeal] = useState("");
    const [open, setOpen] = useState(true);
    const handleClose = () => {
        setOpen(false);
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

        fetcherGET(
        "/foodAPI/instantSearch/?",
        {
            query: value,
        },
        setInstantData
        );
    }

    // console.log(inputValue)

    // function handleSubmit(event) {
    //     event.preventDefault();
    //     if (inputValue.length >= 1) {
    //     console.log(inputValue);
    //     setInputError(null);

    //     // API CALL FOR SEARCH INPUT
    //     // getData()
    //     } else {
    //     setInputError("You must type something!");
    //     }
    // }

    async function checkValidMeal (mealType){
        let res = await dbFoodMethods.getMealPlan();

        // console.log(res.mealPlan[props.currDay][mealType]);
        if (res.mealPlan[currDay][mealType] != undefined){
            setSelectedMeal(mealType);
            setMealModalOpen(false);
        } else {
            alert(`You cannot add ${mealType} again!`)
        }
    }
    
    
    useEffect(() => {
        // console.log(foodArray);
    }, [foodArray]);
    // ------------------------------------------------------------------------------------
    // this is handling instantSearch endpoint
    if (instantData != null) {
        // console.log(instantData);

        instantData["common"].forEach((food) => {
        instantSearchRes.push(
            <Col key={food.food_name}>
            {/* <Card className="text-center" onClick={null} style={{ border: "0px", margin: "10px" }}> */}
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
                {/* <ChildModal food_name={food["food_name"]} /> */}
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
                    select{" "}
                </Button>
                </div>
            </Stack>
            </Col>
        );
        });
    }


    return (
        <div>
        <Modal open={mealModalOpen} onClose={() => setMealModalOpen(false)}>
            <Box className="popup">
            <h1>Select a meal</h1>
            <Button
                className='buttonPrimary'
                onClick={() => {
                    checkValidMeal("breakfast")
                }}
            >
                Breakfast
            </Button>
            <Button
                className='buttonPrimary'
                onClick={() => {
                    checkValidMeal("lunch")
                }}
            >
                Lunch
            </Button>
            <Button
                className='buttonPrimary'
                onClick={() => {
                    checkValidMeal("dinner")
                }}
            >
                Dinner
            </Button>
            {/* <Button
                onClick={() => {
                setSelectedMeal("snack");
                setMealModalOpen(false);
                }}
            >
                Snack
            </Button> */}
            </Box>
        </Modal>
        <Modal
            open={selectedMeal !== ""}
            onClose={handleClose}
            style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
            <Box className="popup">
                
            <div className="text-center">
                <div style={{display:"flex", justifyContent:"space-between"}}>
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
                style={{backgroundColor:"", color:""}}
                defaultActiveKey="search"
                id="uncontrolled-tab-example"
                className="mb-3"
                fill
                >
                <Tab eventKey="search" title={"Manual Search"} className="custom-tab-title">

                    <Form>
                    <InputGroup className="mb-3">
                        <Form.Control
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="type something!"
                        />
                    </InputGroup>

                    {inputError && <div style={{ color: "red" }}>{inputError}</div>}
                    </Form>
                    {/* <Stack direction="vertical" gap={2}> */}
                    {instantSearchRes && (
                    <Row xs={1} md={3} className="g-4">
                        {instantSearchRes}
                    </Row>
                    )}
                </Tab>
                <Tab eventKey="scan" title={"Manually Type or Scan"}>
                    {/* <Scan /> */}

                    {/* <Form onSubmit={handleSubmit}> */}
                    <Form onSubmit={event => event.preventDefault()}>
                    <InputGroup className="mb-3">

                        <Row xs={1} md={2}>
                            {/* <div style={{display:"block", width:"100%"}}> */}
                            <Col md={12}>
                            <h5>Food Name</h5>
                            <Form.Control
                            id="manual_foodName"
                            aria-label="name"
                            aria-describedby="inputGroup-sizing-default"
                            placeholder="What are you eating?"
                            />
                            </Col>
                            {/* </div> */}

                            <div>
                                <h5>Calories</h5>
                                <Form.Control
                                id="manual_calories"
                                aria-label="name"
                                aria-describedby="inputGroup-sizing-default"
                                placeholder="Kcal"
                                />
                            </div>

                            <div>
                                <h5>Protein</h5>
                                <Form.Control
                                id="manual_protein"
                                aria-label="name"
                                aria-describedby="inputGroup-sizing-default"
                                placeholder="grams"
                                />
                            </div>

                            <div>
                                <h5>Fat</h5>
                                <Form.Control
                                id="manual_fat"
                                aria-label="name"
                                aria-describedby="inputGroup-sizing-default"
                                placeholder="grams"
                                />
                            </div>

                            <div>
                                <h5>Carbs</h5>
                                <Form.Control
                                id="manual_carbs"
                                aria-label="name"
                                aria-describedby="inputGroup-sizing-default"
                                placeholder="grams"
                                />
                            </div>
                        </Row>
                        
                    </InputGroup>
                    <Scan/>
                    <Button
                        // type="submit"
                        className="buttonPrimary"
                        onClick={(event) => {
                            event.preventDefault(); // Prevent default form submission
                            if (document.getElementById("manual_foodName").value.trim() === '' ||
                                document.getElementById("manual_calories").value.trim() === '' ||
                                document.getElementById("manual_protein").value.trim() === '' ||
                                document.getElementById("manual_fat").value.trim() === '' ||
                                document.getElementById("manual_carbs").value.trim() === '') 
                                {
                                alert("Please fill in all fields"); // Show an error message
                            } else {
                                setCount((prevCount) => prevCount + 1);
                                let temp = {
                                    "food_name":document.getElementById("manual_foodName").value, 
                                    "nf_calories":document.getElementById("manual_calories").value, 
                                    "nf_protein":document.getElementById("manual_protein").value, 
                                    "nf_total_fat":document.getElementById("manual_fat").value, 
                                    "nf_total_carbohydrate":document.getElementById("manual_carbs").value, 
                                };
                                setFoodArray((prevFoodArray) => [
                                    ...prevFoodArray,
                                    temp
                                ]);
                                // console.log(showNotification)
                                // setInputError("")
                                showNotification("Food item has been added!");
                            }
                            
                        }}
                    >Add</Button>

                    {inputError && <div style={{ color: "red" }}>{inputError}</div>}
                    </Form>

                </Tab>
                </Tabs>


            </div>
            </Box>
        </Modal>
        </div>
    );
}
