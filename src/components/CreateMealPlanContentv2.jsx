import { Button, Col, Container, Row } from "react-bootstrap";
import Loader from "./Loader";
import { RecpieCardV2, SelectedRecpieCardV2 } from "./RecipeCard";

export function CreateMealPlanContentv2({pageNum, mealType, setActivePage, recipes, selected, selectedSetter}) {

    return (
        <>
        {pageNum}
          <Container>
            <Row className="">
              <Col>
                <h1>Pick Your {mealType} Items!</h1>
              </Col>
              <Col>
                <div style={{ textAlign: "right" }}>
                  <Button
                    className="buttonPrimary"
                    onClick={() => setActivePage(pageNum - 1)}
                  >
                    Prev Page
                  </Button>
                  <Button
                    className="buttonPrimary"
                    onClick={() => setActivePage(pageNum + 1)}
                  >
                    Next Page
                  </Button>
                </div>
              </Col>
            </Row>

            <Row xs={1} md={2} lg={3}>
                {recipes ? (
                    recipes.map((recipe) => (
                        <RecpieCardV2 key={recipe.id} recipe={recipe} setter={selectedSetter} render={recipe.id in selected ? false : true }/>
                    )))
                :(<Loader />)}
                {/* <Loader /> */}
            </Row>
          </Container>
        </>
      );

}

export function CreateMealPlanContentFinalise(
    // breakfastSelected, 
    // lunchSelected, 
    // dinnerSelected, 
    // breakfastSelectedSetter, 
    // lunchSelectedSetter, 
    // dinnerSelectedSetter 
    {info}
){

    // console.log(info)
    // console.log(info["Breakfast"].data)
    // console.log(info["Breakfast"].setter)
    return (
        <>
            <h1>Finalise Meal Plan</h1>
            {["Breakfast", "Lunch", "Dinner"].map((mealType) => (
                <div key={mealType}>
                    <h3>{mealType}</h3>
                    {Object.keys(info[mealType].data).length > 0 ? (
                        <Row xs={1} md={2} lg={3}>
                            {info[mealType].data.map((recipe) => (
                                // console.log(recipe),
                                <SelectedRecpieCardV2 
                                    recipe={recipe}
                                    setter={info[mealType].setter}
                                />

                            ))}
                        </Row>
                    ) : (
                        <p>Please select at least 1 dish for {mealType}!</p>
                    )}
                </div>
            ))}
        </>
    )
}
