import { useEffect, useState } from "react";
import { Card, Button, Col, Row } from "react-bootstrap";
import { fetcher } from "../middleware/Fetcher";
import { RecipeDetails } from "./RecipeDetails";
import { useAtom } from "jotai";
import { RecipeOverlay } from "../atoms/recipeOverlay";

export function RecpieCardV2({ recipe, setter = null , render}) {
  const [overlayData, setOverlayData] = useAtom(RecipeOverlay);

  const [buttonState, setButtonState] = useState(render);
  const [buttonText, setButtonText] = useState("Select");
  
  useEffect(() => {
    if (buttonState === true) {
      setButtonText("Select");
    } else {
      setButtonText("Selected");
    }
  }, []);
  
  const handleButtonClick = () => {
      if (buttonState === true) {
        setButtonState(false)
        setButtonText("Selected");
      } else {
        setButtonText("Select");
      }
  };

  return (
    // <div style={buttonState? {
    //   // position: "relative",
    //   // background: "rgba(0, 0, 0, 0.6)", /* Grey overlay with some transparency */
    //   // zIndex: 999,
    //   // top: 0,
    //   // left: 0,
    //   // width: "100%",
    //   // height: "100%",
    //   // pointerEvents: "auto",
    // }: {}}>
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
                    onClick={() =>{
                      setter((prev) => ({
                        ...prev,
                        [recipe["id"]]: recipe
                      }))

                      handleButtonClick()

                    }}
                    disabled={!buttonState}
                  >
                    {buttonText}
                  </Button>
                </div>
              </Col>
            </Row>
            <Card.Title style={{ marginTop: "10px" }}>
              {recipe["title"]}
            </Card.Title>
            <Card.Text>
            </Card.Text>
          </Card.Body>
        </Card.ImgOverlay>
      </Card>
    // </div>
    // <p>V2</p>
  )
}

export function RecpieCard({ recipe, setter = null }) {
  const [overlayData, setOverlayData] = useAtom(RecipeOverlay);

  return (
    <Col key={recipe["id"]}>
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
                    Select Meal
                  </Button>
                </div>
              </Col>
            </Row>
            <Card.Title style={{ marginTop: "10px" }}>
              {recipe["title"]}
            </Card.Title>
            <Card.Text>
            </Card.Text>
          </Card.Body>
        </Card.ImgOverlay>
      </Card>
    </Col>
  );
}

export function SelectedRecpieCardV2({recipe, setter}) {
  const [overlayData, setOverlayData] = useAtom(RecipeOverlay);

  // console.log(recipe)
  // console.log(setter)
  return (
    <>
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
                        setter((prev) => {
                          const updatedState = { ...prev };
                          delete updatedState[recipe["id"]];
                          return updatedState;
                        })

                      }
                    >
                      Remove
                    </Button>
                  </div>
                </Col>
              </Row>
              <Card.Title style={{ marginTop: "10px" }}>
                {recipe["title"]}
              </Card.Title>
              <Card.Text>
              </Card.Text>
            </Card.Body>
          </Card.ImgOverlay>
        </Card>
      </> 
    
  )
}
export function SelectedMealCard ({recipe, selected=null, setter=null, mealType}) {
  const [overlayData, setOverlayData] = useAtom(RecipeOverlay);
  const [response, setResponse] = useState(null);

  fetcher(
    "/foodAPI/getBulk/?",
    {
      ids: recipe,
    },
    setResponse
  );

  const res= [];

  if (response?.length > 0 ){
    response.forEach((recipe) => {
      // console.log(recipe)
      res.push(
        <Col key={recipe["id"]}>
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
                          onClick={() => {
                            // console.log(selected);
                            const updatedSelected = { ...selected };

                            // Check if the meal type exists and the recipe ID exists in it
                            if (updatedSelected[mealType.toLowerCase()] && updatedSelected[mealType.toLowerCase()][recipe.id]) {
                              // console.log(updatedSelected[mealType.toLowerCase()][recipe.id]);
                              delete updatedSelected[mealType.toLowerCase()][recipe.id];
                              // Remove the recipe ID from the meal type
                            }

                            // Update the state with the modified copy
                            setter(updatedSelected);
                            // console.log(selected);
                          }}
                      >
                          Remove Meal
                      </Button>
                      </div>
                  </Col>
                  </Row>
                  <Card.Title style={{ marginTop: "10px" }}>
                  {recipe["title"]}
                  </Card.Title>
                  <Card.Text>
                  </Card.Text>
              </Card.Body>
              </Card.ImgOverlay>
          </Card>
        </Col>
      )
    });
  }


  return (
    <>
    {res}
    </>
  )
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
