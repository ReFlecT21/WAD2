import { useState } from "react";
import { Card, Button, Col, Row } from "react-bootstrap";
import { fetcher } from "../middleware/Fetcher";
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
                    className="buttonPrimary"
                    onClick={() =>
                      setOverlayData(<RecipeDetails id={recipe["id"]} />)
                    }
                  >
                    See Recipe
                  </Button>
                  <Button
                    className="buttonPrimary"
                    onClick={() =>
                      setter((prev) => ({
                        ...prev,
                        [recipe["id"]]: recipe["nutrition"]["nutrients"][0]["amount"]
                      }))
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

export function FinaliseRecipeCard({ recipe, selected=null }) {
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
                  className="buttonPrimary"
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
export function HomeRecipeCard({ recipe, selected=null }) {
  const [overlayData, setOverlayData] = useAtom(RecipeOverlay);

  // let width = window.innerWidth;
  // let cardDirection = {flexDirection:"row"}

  // if(width < 768){
  //   cardDirection = {}
  // }

  // useState(() => {
  //   const handleResize = () => {
  //     width = window.innerWidth;
  //   };
  //   window.addEventListener("resize", handleResize);

  // }, [width]);
  
  return (
    <Card style={{flexDirection:"row"}}>
      <Card.Img style={{objectFit:"contain", height:"auto", width:"200px"}} src={recipe["image"]} />
      <Card.Body>
          <Card.Title>Title Text</Card.Title>
          <Card.Text>
          Here's some fillllllller text
          </Card.Text>
          <div className="d-flex justify-content-between">
          <Button
            className="buttonPrimary"
            onClick={() =>
              setOverlayData(<RecipeDetails id={recipe["id"]} />)
            }
          >
            See Recipe
          </Button>
          </div>
      </Card.Body>
    </Card>
  );
}

// export default RecpieCard;
