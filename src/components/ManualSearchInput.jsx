import { Modal, Box } from "@mui/material"
import { useAtom } from "jotai";
import { RecipeOverlay } from "../atoms/recipeOverlay";
import React, { useState } from "react";
import { Stack, InputGroup, Form, Button, Card, Row, Col, Image} from "react-bootstrap";
import { fetcher, fetcherGET, fetcherPOST } from "../getters/Fetcher";

// CHILD MODAL
function ChildModal(foodname) {
    const [searchData, setSearchData] = useState(null);
    const [ChildModalopen, setChildModalOpen] = React.useState(false);
    const handleClose = () => {
        setChildModalOpen(false);
    };

    const APIres= [];

    if (searchData != null){
        searchData["foods"].forEach(food => {
            APIres.push(
                <>
                    <p>{food["food_name"]}</p>
                    <p>{food["nf_calories"]}</p>
                    <p>{food["nf_cholesterol"]}</p>
                </>
            )
        });
    }

    return (
      <React.Fragment>
        <Button className="manualSelectBtn" onClick={()=>{
            setChildModalOpen(true)

            const body = {
              query: foodname["food_name"],
              include_subrecipe: true,
              use_raw_foods: false,
              line_delimited: true,
              claims: true,
              taxonomy: true,
              ingredient_statement: true,
            };

            fetcherPOST("/foodAPI/manualSearch", body, setSearchData);
        }}>Select</Button>
        <Modal
          open={ChildModalopen}
          onClose={handleClose}
        >
          <Box className="popup popUpclass">
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <Button className="buttonPrimary" onClick={handleClose}>Back</Button>
                    <Button className="buttonPrimary" onClick={null}>Confirm</Button>
                </div>
                <br />
            <h2>Details of Dish:</h2>
            {APIres}
          </Box>
        </Modal>
      </React.Fragment>
    );
  }

export function ManualSearchComponent(){

    const instantSearchRes = [];

    const [overlayData, setOverlayData] = useAtom(RecipeOverlay);
    const [open, setOpen] = useState(true);
    const handleClose = () => {
        setOpen(false);
        setOverlayData([]);
    };

    // FORM VALIDATION

    const [inputValue, setInputValue] = useState('');
    const [inputError, setInputError] = useState(null);
    const [instantData, setInstantData] = useState(null);
    
    function handleInputChange(event) {
        const value = event.target.value;
        setInputValue(value);

        fetcherGET(
            "/foodAPI/instantSearch/?",
            {
                query:value
            },
            setInstantData
        )
    }
    
    // console.log(inputValue)

    function handleSubmit(event) {
        event.preventDefault();
        if (inputValue.length >= 1) {
            console.log(inputValue)
            setInputError(null);
            
            // API CALL FOR SEARCH INPUT
            // getData()
            

        } else {
          setInputError('You must type something!');
        }
        

    }    

    // ------------------------------------------------------------------------------------
    // this is handling instantSearch endpoint
    if (instantData != null){
        console.log(instantData)

        instantData["common"].forEach(food => {
            instantSearchRes.push(
                <Col>
                    {/* <Card className="text-center" onClick={null} style={{ border: "0px", margin: "10px" }}> */}
                    <Stack 
                    direction="horizontal" 
                    style={{ border: "0px", margin: "10px" , textAlign:"center"}} 
                    onClick={null}
                    >
                        <Image className=" img-overlay-small"  style={{margin:"5px"}} src={food["photo"]["thumb"]} rounded />
                        <div>
                            <h5>{food["food_name"]}</h5>
                            <ChildModal food_name={food["food_name"]}/>
                        </div>
                    </Stack>
                </Col>
            )
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
                    <br /><br /><br /><br />

                    <h1>Manual Search</h1>
                    
                        <Form onSubmit={handleSubmit}>
                            <InputGroup className="mb-3 manualSearchBar">

                                <Form.Control
                                aria-label="Default"
                                aria-describedby="inputGroup-sizing-default"
                                value={inputValue}
                                onChange={handleInputChange}
                                placeholder="Search a dish!"
                                />
                            </InputGroup>

                            {inputError && <div style={{ color: 'red' }}>{inputError}</div>}
                        </Form>
                    {/* <Stack direction="vertical" gap={2}> */}
                        {instantSearchRes && 
                            <Row xs={1} md={3} className="g-4">
                                {instantSearchRes}
                            </Row>
                        }
                    {/* </Stack> */}
                </div>
             </Box>
          </Modal>
        </div>
      );
  }