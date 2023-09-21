import { Modal, Box } from "@mui/material"
import { useAtom } from "jotai";
import { RecipeOverlay } from "../atoms/recipeOverlay";
import React, { useState } from "react";
import { Stack, InputGroup, Form, Button} from "react-bootstrap";
import { fetcherPOST } from "./Fetcher";

export function ManualSearchComponent(){

    const [overlayData, setOverlayData] = useAtom(RecipeOverlay);
    const [open, setOpen] = useState(true);
    const handleClose = () => {
        setOpen(false);
        setOverlayData([]);
    };

    // FORM VALIDATION

    const [inputValue, setInputValue] = useState('');
    const [inputError, setInputError] = useState(null);
    const [searchData, setSearchData] = useState(null);
    
    function handleInputChange(event) {
        const value = event.target.value;
        setInputValue(value);
    }
    
    // console.log(inputValue)

    function handleSubmit(event) {
        event.preventDefault();
        if (inputValue.length >= 1) {
            console.log(inputValue)
            setInputError(null);
            
            // API CALL FOR SEARCH INPUT
            getData()

        } else {
          setInputError('You must type something!');
        }
        

        // HANDLE API RESPONSE
    }    
    
    function getData(){
        const body = {
            query: inputValue,
            include_subrecipe: true,
            use_raw_foods: false,
            line_delimited: true,
            claims: true,
            taxonomy: true,
            ingredient_statement: true,
        };
        console.log(body)
        
        fetcherPOST("/foodAPI/manualSearch", body, setSearchData);
    }

    if (searchData != null){
        console.log(searchData)

    }


    return (
        <div>
          <Modal
            open={true}
            onClose={handleClose}
            style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
          >
             <Box className="popup">
                <div className="popupChild">
                <h1>This is manualSearch</h1>
                    
                        <Form onSubmit={handleSubmit}>
                            <InputGroup className="mb-3">

                                <Form.Control
                                aria-label="Default"
                                aria-describedby="inputGroup-sizing-default"
                                value={inputValue}
                                onChange={handleInputChange}
                                />

                                <Button className="buttonPrimary" type="submit">Search</Button>
                            </InputGroup>

                            {inputError && <div style={{ color: 'red' }}>{inputError}</div>}
                        </Form>
                    <Stack direction="horizontal" gap={3}>

                    </Stack>
                </div>

             </Box>
          </Modal>
        </div>
      );


  }