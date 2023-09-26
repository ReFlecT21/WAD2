import { useState } from "react";
import { Card, Button, Col, Row } from "react-bootstrap";
import { fetcher } from "./Fetcher";
import { RecipeDetails } from "./RecipeDetails";
import { useAtom } from "jotai";
import { RecipeOverlay } from "../atoms/recipeOverlay";

export function RecpieCard({ recipe, setter = null }) {
  const [overlayData, setOverlayData] = useAtom(RecipeOverlay);

  return (
    <Col key={recipe["id"]}>
      {/* {overlayData} */}
      <Card style={{ border: "0px", margin: "10px" }}>
        <Card.Img
          variant="top"
          src={recipe["image"]}
          className="img-overlay"
          style={{ borderRadius: "20px" }}
        />
        <Card.ImgOverlay>
          <Card.Body>
            <Row>
              {/* <Col><Button href={recipe["spoonacularSourceUrl"]} target="_blank" rel="noopener noreferrer">See Recipe</Button></Col> */}
              <Col>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Button
                    onClick={() =>
                      setOverlayData(<RecipeDetails id={recipe["id"]} />)
                    }
                  >
                    See Recipe
                  </Button>
                  <Button
                    onClick={() =>
                      setter((oldArray) => [...oldArray, recipe["id"]])
                    }
                  >
                    Add to Array
                  </Button>
                </div>
              </Col>
            </Row>
            <Card.Title style={{ marginTop: "10px" }}>
              {recipe["title"]}
            </Card.Title>
            <Card.Text>
              {/* <div className="recipeSummary" dangerouslySetInnerHTML={{__html: recipe["summary"]}}></div> */}
            </Card.Text>
          </Card.Body>
        </Card.ImgOverlay>
      </Card>
    </Col>
  );
}

export function FinaliseRecipeCard({ recipe, selected }) {
  const [overlayData, setOverlayData] = useAtom(RecipeOverlay);
  return (
    <Col key={recipe["id"]}>
      <Card>
        <Card.Img variant="top" src={recipe["image"]} className="img-overlay" />
        <Card.ImgOverlay>
          <Card.Body>
            <Row>
              <Col>
                <Button
                  onClick={() =>
                    setOverlayData(<RecipeDetails id={recipe["id"]} />)
                  }
                >
                  See Recipe
                </Button>
              </Col>
              {/* <Col><Button onClick={()=>setter(oldArray => [...oldArray, recipe["id"]])}>Add to Array</Button></Col> */}
            </Row>
            <Card.Title style={{ marginTop: "10px" }}>
              {recipe["title"]}
            </Card.Title>
            <Card.Text>
              {/* <div className="recipeSummary" dangerouslySetInnerHTML={{__html: recipe["summary"]}}></div> */}
            </Card.Text>
            {/* <Button href={recipe["spoonacularSourceUrl"]} target="_blank" rel="noopener noreferrer">See Recipe</Button>
            <Button onClick={()=>setSelected(oldArray => [...oldArray, recipe["id"]])}>Add to Array</Button> */}
          </Card.Body>
        </Card.ImgOverlay>
      </Card>
    </Col>
  );
}

// export default RecpieCard;
