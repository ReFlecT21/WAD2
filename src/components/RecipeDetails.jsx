import { Col, Button, Row, Image } from "react-bootstrap";
import { useAtom } from "jotai";
import { RecipeOverlay } from "../atoms/recipeOverlay";
import { Modal, Box } from "@mui/material";
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBowlFood } from "@fortawesome/free-solid-svg-icons";
import { faListOl } from "@fortawesome/free-solid-svg-icons";
import { backendMethods } from "../middleware/backendMethods";


export function RecipeDetails(id) {
  let CardData = [];

  const [overlayData, setOverlayData] = useAtom(RecipeOverlay);

  const [open, setOpen] = useState(true);
  // const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setOverlayData([]);
  };

  const [response, setResponse] = useState(null);

  // fetcher(
  //   "/foodAPI/getBulk/?",
  //   {
  //     ids: id["id"],
  //   },
  //   setResponse
  // );
  backendMethods.fetcher("getBulk/?", {ids: id["id"]}, setResponse)
  // console.log(response);

  if (response?.length > 0) {
    response.forEach((recipe) => {
      // console.log(recipe);

      let visited = [];
      let ingredients = [];
      let instructions = [];

      recipe?.extendedIngredients.forEach((ingre) => {
        if (visited.includes(`${recipe.id}${ingre.id}`) === false) {
          ingredients.push(<li key={`${recipe.id}${ingre.id}`}>{ingre["original"]}</li>);
          visited.push(`${recipe.id}${ingre.id}`);
        };
      });
      // console.log(recipe);
      
      recipe?.analyzedInstructions[0]?.steps.forEach((steps) => {
        // console.log(steps);
        instructions.push(<li key={`${recipe.id}${steps.number}`}>{steps["step"]}</li>);
      });

      CardData.push(
        <div key={`${recipe.id}Details`}>
          <Row style={{ padding: "0", marginTop: "5px", marginBottom: "20px", marginLeft:"0px", marginRight:"0px"}}>
            <Col > 
            <div style={{display:"flex", justifyContent:"end"}}>
              <button style={{display:"flex", alignItems: "center"}} className="cancelBtn" onClick={handleClose}>X</button>
            </div>
            </Col>
          </Row>
          <Row>
            <Col  md={12} lg={7}>
              <div>
                <Image className="recipePic" src={recipe["image"]}></Image>
              </div>
            </Col>
            <Col md={12} lg={5}>
            <div>
              <h3 className="recipeTitle">{recipe["title"]}</h3>

              <div className="recipeInfo">

                <h6>{recipe["nutrition"]["nutrients"][0]["name"]}: {recipe["nutrition"]["nutrients"][0]["amount"]} {recipe["nutrition"]["nutrients"][0]["unit"]}</h6>

                {recipe["nutrition"]["nutrients"][8]["name"] == "Protein" ? <h6>{recipe["nutrition"]["nutrients"][8]["name"]}: {recipe["nutrition"]["nutrients"][8]["amount"]} {recipe["nutrition"]["nutrients"][1]["unit"]}</h6> : <></>}

                <h6>{recipe["nutrition"]["nutrients"][1]["name"]}: {recipe["nutrition"]["nutrients"][1]["amount"]} {recipe["nutrition"]["nutrients"][1]["unit"]}</h6>
                <h6>{recipe["nutrition"]["nutrients"][3]["name"]}: {recipe["nutrition"]["nutrients"][3]["amount"]} {recipe["nutrition"]["nutrients"][3]["unit"]}</h6>
              </div>
            </div>
            </Col>
             
          </Row>
          <Row className="recipeDetails">
  
            <h3><FontAwesomeIcon
                  icon={faBowlFood}
                />  Ingredients</h3>

            <ul>{ingredients}</ul>
          </Row>
         
          <Row className="recipeDetails">
            <h3><FontAwesomeIcon
                  icon={faListOl}
                />  Instructions</h3>

            <ol>{instructions}</ol>
          </Row>

          <Row>
            <Col className="d-flex justify-content-center align-items-center">
              <button className="chooseBtn" onClick={handleClose}>Done</button>
            </Col>
          </Row>
        </div>
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
        <Box className="popup">{CardData}</Box>
      </Modal>
    </div>
  );
}

export function ManualDetails({foods}) {
  const [open, setOpen] = useState(true);
  const [overlayData, setOverlayData] = useAtom(RecipeOverlay);
  // const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setOverlayData([]);
  };

  // console.log(foods);

  return (
    <div>
      <Modal
        open={true}
        onClose={handleClose}
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        <Box className="popup">
          <Row style={{ padding: "0", marginTop: "5px", marginBottom: "20px", marginLeft:"0px", marginRight:"0px"}}>
            <Col > 
              <div style={{display:"flex", justifyContent:"end"}}>
                <button style={{display:"flex", alignItems: "center"}} className="cancelBtn" onClick={handleClose}>X</button>
              </div>
            </Col>
          </Row>

          <Row>
            {foods.map((food, index) => (
              <Col xs={12} lg={5} key={index+food.food_name}>
                <div>
                  <h3 className="recipeTitle">{food.food_name}</h3>

                  <div className="recipeInfo">
                    <h6>Quantity: {food.quantity}</h6>
                    <h6>Calories: {food.calories}</h6>
                    <h6>Protein: {food.protein}</h6>
                    <h6>Fats: {food.fat}</h6>
                    <h6>Carbohydrates: {food.carbs}</h6>
                  </div>
                </div>
                </Col>
            )) }
          </Row>
        </Box>
      </Modal>
    </div>
  );
}
