import { Box } from "@mui/material";
import React, { useState } from "react";
import { Button, Modal, Row } from "react-bootstrap";


export function ShoppingCartPopUp({shoppingCart}) {

    const [ShoppingCartModal, setShoppingCartModal] = useState(false);
    const handleClose = () => {
        setShoppingCartModal(false);
    };


    return (
        <React.Fragment>
            <Button
                className="buttonPrimary"
                onClick={() => {
                    console.log("open shopping cart modal")
                    setShoppingCartModal(true);
                }}
            >
                Confirm
            </Button>

            <Modal open={ShoppingCartModal} onClose={handleClose}>
                <Box className="popup">
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <Button className="buttonPrimary" onClick={handleClose}>
                        Back
                    </Button>
                </div>

                <div
                    style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    }}
                >
                    <h2>shopping cart modal</h2>
                </div>
                </Box>
            </Modal>
        </React.Fragment>
    );
}

export function ShoppingCart({shoppingCart}) {
    console.log(shoppingCart)
    return (
        <>
            <h1>Shopping Cart</h1>

            {Object.keys(shoppingCart.shoppingCart).map((day)=>(
                <div key={day}>
                    <h4>{day}</h4>
                    <Row xs={1} md={2}>

                        {Object.keys(shoppingCart.shoppingCart[day]).map((ingre)=>(
                            <p key={day+ingre}>{ingre}</p>
                        ))}
                    </Row>
                </div>
                // console.log(ingreType)
                ))}
        </>
    );
}