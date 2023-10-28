import { Modal, Box } from "@mui/material";
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
} from "react-bootstrap";
import { fetcher, fetcherGET, fetcherPOST } from "../middleware/Fetcher";
import { dbFoodMethods } from "../middleware/dbMethods";
import { useNavigate } from "react-router-dom";
import { RecalAtom } from "../atoms/recal";
import Cookies from "js-cookie";

// CONFIRM MODAL
function ConfirmModal({ foodDetails, day_Index, Meal_Type }) {
    const navigate = useNavigate();
    // const [recal, setRecal] = useAtom(RecalAtom);

    const [ConfirmModalopen, setConfirmModalOpen] = useState(false);
    const handleClose = () => {
        setConfirmModalOpen(false);
    };

    const handleAdd = async () => {
        let res = await dbFoodMethods.completeMeal(
            day_Index,
            Meal_Type,
            foodDetails
        );
        return res;
    };
    const handleRecal = async () => {
        const expirationTimeInHours = 1;
        const expirationDate = new Date(
        new Date().getTime() + expirationTimeInHours * 60 * 60 * 1000
        );

        let res = await dbFoodMethods.completeMeal(
            day_Index,
            Meal_Type,
            foodDetails
        );
        Cookies.set("recal", true, { expires: expirationDate });
        // setRecal(true);
        
        navigate("/input");

        
    };

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
    <React.Fragment>
    <Button
        className="buttonPrimary"
        onClick={() => {
        setConfirmModalOpen(true);
        }}
    >
        Confirm
    </Button>

    <Modal open={ConfirmModalopen} onClose={handleClose}>
        <Box className="popup">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button className="buttonPrimary" onClick={handleClose}>
            Back
            </Button>
            <Button className="buttonPrimary" onClick={handleAdd}>
            Add
            </Button>
            <Button className="buttonPrimary" onClick={handleRecal}>
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

function ChildModal({ food_Array, dayIndex, MealType }) {
const [searchData, setSearchData] = useState({});
const [ChildModalopen, setChildModalOpen] = useState(false);
const [foodDetailsArrays, setFoodDetailsArrays] = useState([]);

const handleClose = () => {
    setChildModalOpen(false);
};
const [added, setAdded] = useState([]);

useEffect(() => {
    if (searchData) {
    let newFoodDetailsArrays = []; // Initialize an empty array to store the arrays of food details
    Object.keys(searchData).forEach((key) => {
        searchData[key]["foods"].forEach((food) => {
        let foodDetails = []; // Initialize an array for each set of food details
        // Add the food details to the array in the order you specified
        foodDetails.push(food.photo.highres);
        foodDetails.push(food["food_name"]);
        foodDetails.push(food["nf_calories"]);
        foodDetails.push(food["nf_protein"]);
        foodDetails.push(food["nf_total_fat"]);
        foodDetails.push(food["nf_total_carbohydrate"]);
        foodDetails.push(food["nf_cholesterol"]);
        // Add the array of food details to the new array
        newFoodDetailsArrays.push(foodDetails);
        });
    });
    setFoodDetailsArrays(newFoodDetailsArrays);
    console.log(dayIndex); // Update the state with the new array of arrays
    }
}, [searchData]);

function handleRemove(key, food) {
    // Remove the food item from searchData
    const newSearchData = { ...searchData };
    const index = newSearchData[key]["foods"].indexOf(food);
    if (index > -1) {
    newSearchData[key]["foods"].splice(index, 1);
    }

    // Update the state with the new searchData
    setSearchData(newSearchData);
}

return (
    <React.Fragment>
    <Button
        className="buttonPrimary"
        onClick={() => {
        setChildModalOpen(true);

        console.log(food_Array);
        const fetchPromises = food_Array.map((food) => {
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
        });
        Promise.all(fetchPromises)
            .then((data) => {
            setSearchData((prevData) => ({ ...prevData, ...data }));
            })
            .catch((error) => console.error(error));
        }}
    >
        confirm
    </Button>

    <Modal open={ChildModalopen} onClose={handleClose}>
        <Box className="popup">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button className="buttonPrimary" onClick={handleClose}>
            Back
            </Button>
            {/* <Button className="buttonPrimary" onClick={null}>Confirm</Button> */}
            <ConfirmModal
            foodDetails={foodDetailsArrays}
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
                {Object.keys(searchData).map((key) => {
                return (
                    <div key={key}>
                    {/* <h2>{key}</h2> */}
                    {searchData[key]["foods"].map((food) => {
                        return (
                        <div key={food + key}>
                            <Row>
                            <Col>
                                <img
                                style={{ width: "100%" }}
                                src={food.photo.highres}
                                alt=""
                                />
                            </Col>
                            <Col>
                                <h2>{food["food_name"]}</h2>
                                <p>Calories: {food["nf_calories"]}</p>
                                <p>Total Protein: {food["nf_protein"]}</p>
                                <p>Total Fats: {food["nf_total_fat"]}</p>
                                <p>
                                Total Carbohydrates:{" "}
                                {food["nf_total_carbohydrate"]}
                                </p>
                                <p>Cholesterol: {food["nf_cholesterol"]}</p>
                            </Col>
                            </Row>
                            {/* Add a remove button */}
                            <button onClick={() => handleRemove(key, food)}>
                            Remove
                            </button>
                        </div>
                        );
                    })}
                    </div>
                );
                })}
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

export function ManualSearchComponent(props) {
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

function handleSubmit(event) {
    event.preventDefault();
    if (inputValue.length >= 1) {
    console.log(inputValue);
    setInputError(null);

    // API CALL FOR SEARCH INPUT
    // getData()
    } else {
    setInputError("You must type something!");
    }
}
const [foodArray, setFoodArray] = useState([]);
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
            onClick={() => {
            setSelectedMeal("breakfast");
            setMealModalOpen(false);
            }}
        >
            Breakfast
        </Button>
        <Button
            onClick={() => {
            setSelectedMeal("lunch");
            setMealModalOpen(false);
            }}
        >
            Lunch
        </Button>
        <Button
            onClick={() => {
            setSelectedMeal("dinner");
            setMealModalOpen(false);
            }}
        >
            Dinner
        </Button>
        </Box>
    </Modal>
    <Modal
        open={selectedMeal !== ""}
        onClose={handleClose}
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
    >
        <Box className="popup">
        <div className="text-center">
            <h1>This is manualSearch</h1>
            <ChildModal
            food_Array={foodArray}
            dayIndex={props.currDay}
            MealType={selectedMeal}
            />

            <Form onSubmit={handleSubmit}>
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
            {/* </Stack> */}
        </div>
        </Box>
    </Modal>
    </div>
);
}
