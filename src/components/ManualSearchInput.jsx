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

// CONFIRM MODAL
function ConfirmModal() {
  const [searchData, setSearchData] = useState(null);
  const [ConfirmModalopen, setConfirmModalOpen] = useState(false);
  const handleClose = () => {
    setConfirmModalOpen(false);
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
            <Button className="buttonPrimary" onClick={null}>
              Add
            </Button>
            <Button className="buttonPrimary" onClick={null}>
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
const food = [];
function ChildModal(foodArray) {
  const [searchData, setSearchData] = useState({});
  const [ChildModalopen, setChildModalOpen] = useState(false);
  const handleClose = () => {
    setChildModalOpen(false);
  };

  const APIres = [];

  if (Object.keys(searchData).length !== 0) {
    console.log(searchData);
    Object.keys(searchData).forEach((key) => {
      searchData[key]["foods"].forEach((food) => {
        console.log(food);
        APIres.push(
          <>
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
                <p>Total Carbohydrates: {food["nf_total_carbohydrate"]}</p>
                <p>Cholesterol: {food["nf_cholesterol"]}</p>
              </Col>
            </Row>
          </>
        );
      });
    });
  }

  return (
    <React.Fragment>
      <Button
        className="buttonPrimary"
        onClick={() => {
          setChildModalOpen(true);
          const food_array = foodArray.food_Array;
          const fetchPromises = food_array.map((food) => {
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
            <ConfirmModal />
          </div>
          {/* <h2>Text in a child modal</h2> */}
          <div
            style={{
              display: "block",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {APIres}
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export function ManualSearchComponent() {
  const instantSearchRes = [];

  const [overlayData, setOverlayData] = useAtom(RecipeOverlay);
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
    setOverlayData([]);
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
    console.log(foodArray);
  }, [foodArray]);
  // ------------------------------------------------------------------------------------
  // this is handling instantSearch endpoint
  if (instantData != null) {
    console.log(instantData);

    instantData["common"].forEach((food) => {
      instantSearchRes.push(
        <Col>
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
      <Modal
        open={true}
        onClose={handleClose}
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        <Box className="popup">
          <div className="text-center">
            <h1>This is manualSearch</h1>
            <ChildModal food_Array={foodArray} />

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
