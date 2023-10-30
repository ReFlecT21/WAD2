import { Col, Button, Row, Image } from "react-bootstrap";
import { useAtom } from "jotai";
import { RecipeOverlay } from "../atoms/recipeOverlay";
import { Modal, Box } from "@mui/material";
import { useState } from "react";
import { fetcher } from "../middleware/Fetcher";

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

  fetcher(
    "/foodAPI/getBulk/?",
    {
      ids: id["id"],
    },
    setResponse
  );

  // console.log(response);

  if (response?.length > 0) {
    response.forEach((recipe) => {

      let visited = [];
      let ingredients = [];
      let instructions = [];

      recipe?.extendedIngredients.forEach((ingre) => {
        if (visited.includes(`${recipe.id}${ingre.id}`) === false) {
          ingredients.push(<li key={`${recipe.id}${ingre.id}`}>{ingre["original"]}</li>);
          visited.push(`${recipe.id}${ingre.id}`);
        };
      });
      // console.log(recipe?.analyzedInstructions[0]);
      
      recipe?.analyzedInstructions[0]?.steps.forEach((steps) => {
        // console.log(steps);
        instructions.push(<li key={`${recipe.id}${steps.number}`}>{steps["step"]}</li>);
      });

      CardData.push(
        <div key={`${recipe.id}Details`}>
          <Row className="pt-0 ">
            <Col className="d-flex justify-content-end">
              <button className="cancelBtn" onClick={handleClose}>X</button>
            </Col>
          </Row>
          <Row style={{marginTop: "20px", marginBottom: "20px"}}>
            <Col className="recipeTitle col-8"> 
              <h1>{recipe["title"]}</h1>
            </Col>
            <Col className="recipeCalories col ">
              {/* <div>
                <h6>{recipe["nutrition"]["nutrients"][0]["name"]}</h6>
              </div> */}
                {recipe["nutrition"]["nutrients"][0]["amount"]} kCal
                
            </Col>
          </Row>
          <Row>
            <Image className="recipePic" src={recipe["image"]}></Image>
          </Row>
          <Row className="recipeDetails">
            <h3>Ingredients</h3>

            <ul><p>{ingredients}</p></ul>
          </Row>
          <Row>
            <h3>Instructions</h3>

            <ol><p>{instructions}</p></ol>
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
