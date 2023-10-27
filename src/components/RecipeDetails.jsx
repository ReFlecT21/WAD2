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
      console.log(recipe);

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
          <Row>
            <Col>
              <h1>{recipe["title"]}</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <Image style={{ padding: "0px" }} src={recipe["image"]}></Image>
            </Col>
            <Col >
              <h4>{recipe["nutrition"]["nutrients"][0]["name"]}: {recipe["nutrition"]["nutrients"][0]["amount"]}</h4>
              <h4>{recipe["nutrition"]["nutrients"][8]["name"]}: {recipe["nutrition"]["nutrients"][8]["amount"]}</h4>
              <h4>{recipe["nutrition"]["nutrients"][1]["name"]}: {recipe["nutrition"]["nutrients"][1]["amount"]}</h4>
              <h4>{recipe["nutrition"]["nutrients"][3]["name"]}: {recipe["nutrition"]["nutrients"][3]["amount"]}</h4>

            </Col>
          </Row>
          <Row>
            <h3>Ingredients</h3>

            <ul>{ingredients}</ul>
          </Row>
          <Row>
            <h3>Instructions</h3>

            <ol>{instructions}</ol>
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
