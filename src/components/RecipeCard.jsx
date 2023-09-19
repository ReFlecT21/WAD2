import { Card, Button, Col, Row } from "react-bootstrap";

export function RecpieCard({recipe, setter = null}) {
    return (
      <Col key= {recipe["id"]}>
        <Card > 
          <Card.Img variant="top" src={recipe["image"]} className='img-overlay' />
          <Card.ImgOverlay>
            <Card.Body>
              <Row>
                <Col><Button href={recipe["spoonacularSourceUrl"]} target="_blank" rel="noopener noreferrer">See Recipe</Button></Col>
                <Col><Button onClick={()=>setter(oldArray => [...oldArray, recipe["id"]])}>Add to Array</Button></Col>
              </Row>
              <p></p>
              <p></p>
              <Card.Title>{recipe["title"]}</Card.Title>
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

export function FinaliseRecipeCard ({recipe, selected}){
  return (
    <Col key= {recipe["id"]}>
      <Card > 
        <Card.Img variant="top" src={recipe["image"]} className='img-overlay' />
        <Card.ImgOverlay>
          <Card.Body>
            <Row>
              <Col><Button href={recipe["spoonacularSourceUrl"]} target="_blank" rel="noopener noreferrer">See Recipe</Button></Col>
              {/* <Col><Button onClick={()=>setter(oldArray => [...oldArray, recipe["id"]])}>Add to Array</Button></Col> */}
            </Row>
            <p></p>
            <p></p>
            <Card.Title>{recipe["title"]}</Card.Title>
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