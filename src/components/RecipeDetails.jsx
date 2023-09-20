import { Col, Button, Row, Image } from "react-bootstrap"
import { useAtom } from "jotai"
import { RecipeOverlay } from "../atoms/recipeOverlay"
import { Modal, Box } from '@mui/material';
import { useState } from "react";
import { fetcher } from "../Fetcher";

export function RecipeDetails(id,){
    let CardData = []

    const [overlayData, setOverlayData] = useAtom(RecipeOverlay)

    const [open, setOpen] = useState(true);
    // const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setOverlayData([])
    };       

    const [response, setResponse] = useState(null)

    fetcher(
        "/foodAPI/getBulk/?",
        {
        ids: id["id"]
        },
        setResponse
    );

    console.log(response);

    if (response?.length >0){
        response.forEach(recipe=>{
            let ingredients = [];
            let instructions = [];
    
            recipe["extendedIngredients"].forEach(ingre => {
                ingredients.push(
                    <li>{ingre["original"]}</li>
                )
            })

            recipe["analyzedInstructions"][0]["steps"].forEach(steps => {
                instructions.push(
                    <li>{steps["step"]}</li>
                )
            })

            CardData.push(
                <>
                    <Row >
                        <Col>
                            <h1>{recipe["title"]}</h1>
                        </Col>
                        <Col style={{textAlign:"right"}}>
                            <h3>{recipe["nutrition"]["nutrients"][0]["name"]}</h3>
                            <h3>{recipe["nutrition"]["nutrients"][0]["amount"]}</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Image style={{padding:'0px'}} src={recipe['image']}></Image>
                    </Row>
                    <Row>
                        <h3>Ingredients</h3>
                        
                        <ul>{ingredients}</ul>
                    </Row>
                    <Row>
                        <h3>Instructions</h3>
                        
                        <ol>{instructions}</ol>
                    </Row>
                </>
            )
        })
    }
    
    return (    

        <div>
            <Modal
                open={true}
                onClose={handleClose}
                style={{backgroundColor: 'rgba(0, 0, 0, 0.2)'}}
            >
                <Box className="popup">
                    {CardData}
                </Box>
                
            </Modal>
        </div>

    )
}

