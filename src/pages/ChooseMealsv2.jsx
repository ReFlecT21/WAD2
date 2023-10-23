import { Container, Row, Button} from "react-bootstrap";
import React, { useState } from "react";
import { NavBar } from "../components";
import StepProgressBar from "../components/StepProgressBar";


export default function ChooseMealsV2() {
    const [activePage, setActivePage] = useState(1);

    const [buttonState, setButtonState] = useState("Select Meals");

    const handleButtonClick = () => {
        if (buttonState === "Select Meals") {
            setButtonState("Selected");
        } else {
            setButtonState("Select Meals");
        }
    };

    return (
        <>
            <NavBar />
            <Container>
                <Row>
                <StepProgressBar
                    page={activePage}
                    onPageNumberClick={setActivePage}
                />
                </Row>
                <Row>
                    <h1>Choose Meals v2</h1>
                </Row>

                <Button
                  className="buttonPrimary"
                  onClick={
                    handleButtonClick
                  }
                >
                    {buttonState}
                </Button>
        

            </Container>
        </>
    )
}