import { 
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box, Collapse, IconButton, 
    Paper, 
    Table, TableBody, TableCell, 
    TableContainer, 
    TableHead,
    TableRow,
    Typography} from "@mui/material";
import React, { useEffect, useState } from "react";

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { Button } from 'react-bootstrap';
import { dbFoodMethods } from '../middleware/dbMethods';
import { ExpandMore } from "@mui/icons-material";


function CustomRow({flag, buttonTxt, rowStyle, ingreType, ingre, ingreID, shoppingCart, setNumOutstanding=null, day, isMobile=false}) {
    const [checked, setChecked] = React.useState(flag);
    const [buttonText, setButtonText] = React.useState(buttonTxt);
    const [selectStyle, setSelectStyle] = React.useState(rowStyle);

    // setNumItems((prev) => prev + 1);
    // if (!checked) {
    //     setNumOutstanding((prev) => prev + 1);
    // } 

    const completeItem = async() => {
        
        if (checked) {
            setChecked(false);
            setButtonText("Buy");
            setSelectStyle({});
            // console.log(shoppingCart.shoppingCart[dayIndex][ingreType][ingreID].completed)
            shoppingCart.shoppingCart[day][ingreType][ingreID].completed = false;
            if (setNumOutstanding) {

                setNumOutstanding((prev) => prev + 1);
            }
            await dbFoodMethods.updateShoppingCart(shoppingCart.shoppingCart);
        } else {
            setChecked(true);
            setButtonText("Bought");
            setSelectStyle({backgroundColor:"#bcddd5", });
            // console.log(shoppingCart.shoppingCart[dayIndex][ingreType][ingreID].completed)
            shoppingCart.shoppingCart[day][ingreType][ingreID].completed = true;
            if (setNumOutstanding) {

                setNumOutstanding((prev) => prev - 1);
            }
            // console.log(shoppingCart.shoppingCart[dayIndex][ingreType][ingreID].completed)
            await dbFoodMethods.updateShoppingCart(shoppingCart.shoppingCart);
        }
        
    }

    return (
        <TableRow key={ingreType+ingre} style={selectStyle }>
            {isMobile ? (<></>) : (<TableCell style={{fontFamily:"Nunito Sans"}} >{ingreType}</TableCell>)}
            <TableCell style={{fontFamily:"Nunito Sans"}}>{ingre.name}</TableCell>
            <TableCell style={{fontFamily:"Nunito Sans"}} align="right">{ingre.amount}</TableCell>
            <TableCell style={{fontFamily:"Nunito Sans"}} align="right">{ingre.unit}</TableCell>
            <TableCell style={{fontFamily:"Nunito Sans"}} align="right">
                <Button 
                    className='buttonPrimary'
                    
                    onClick={completeItem} 
                    style={{width:"80px",padding:"10px"}}
                >{buttonText}</Button>
            </TableCell>
        </TableRow>
    )
}

function InnerTable({dayCart, title, shoppingCart, dayIndex, day}) {
    const [open, setOpen] = React.useState(false);
    const [numItems, setNumItems] = React.useState(0);
    const [numOutstanding, setNumOutstanding] = React.useState(0);

    useEffect(() => {
        let tempNumItems = 0;
        let tempNumOutstanding = 0;
        for (const ingreType in dayCart) {
            for (const ingre in dayCart[ingreType]) {
                tempNumItems += 1;
                if (!dayCart[ingreType][ingre].completed) {
                    tempNumOutstanding += 1;
                }
            }
        }
        setNumItems(tempNumItems);
        setNumOutstanding(tempNumOutstanding);

    }, []);

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell component="th" scope="row" style={{fontSize:"30px", fontFamily:"Nunito sans", fontWeight:"bold", color:"#205E4B", backgroundColor:"white"}}>
                    {title}
                </TableCell>
                <TableCell style={{fontSize:"20px", fontFamily:"Nunito sans",fontWeight:"bold", color:"#205E4B", backgroundColor:"white"}}>{numItems}</TableCell>
                <TableCell style={{fontSize:"20px", fontFamily:"Nunito sans",fontWeight:"bold", color:"#205E4B", backgroundColor:"white"}}>{numOutstanding}</TableCell>
                <TableCell style={{ backgroundColor:"white"}}>
                    <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => setOpen(!open)}
                    >
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box sx={{ margin: 1 }}>
                        {/* <Typography variant="h5" gutterBottom component="div">
                            Cart for today
                        </Typography> */}
                        <Typography variant="h8" gutterBottom component="div" style={{fontSize:"20px", fontFamily:"Nunito Sans" ,textAlign:"center"}}>
                            Check off what you have bought!
                            You can click the button again if you have made a mistake.
                        </Typography>
                        <Table size="small" aria-label="purchases">
                            <TableHead>
                                <TableRow style={{ backgroundColor:"#1F5E4B", height:"60px" }}>
                                    <TableCell style={{fontSize:"20px", fontFamily:"Nunito Sans", color:"white"}}>Aisle</TableCell>
                                    <TableCell style={{fontSize:"20px", fontFamily:"Nunito Sans", color:"white"}}>Item name</TableCell>
                                    <TableCell style={{fontSize:"20px", fontFamily:"Nunito Sans", color:"white"}} align="right">Quantity</TableCell>
                                    <TableCell style={{fontSize:"20px", fontFamily:"Nunito Sans", color:"white"}} align="right">Unit</TableCell>
                                    <TableCell style={{fontSize:"20px", fontFamily:"Nunito Sans", color:"white"}} align="right">Bought?</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody style={{ backgroundColor:"#e4f3ef", fontFamily:"Nunito Sans" }}>
                                {Object.keys(dayCart).length > 0 ? (
                                    <>
                                        {Object.keys(dayCart).sort().map((ingreType)=>(
                                            <React.Fragment key={dayIndex+ingreType}>
                                                {Object.keys(dayCart[ingreType]).map((ingre)=>(
                                                    
                                                    <CustomRow 
                                                        key={dayIndex+ingreType+ingre}
                                                        flag={dayCart[ingreType][ingre].completed}
                                                        buttonTxt = {dayCart[ingreType][ingre].completed ? "Bought" : "Buy"}
                                                        rowStyle = {dayCart[ingreType][ingre].completed ? {backgroundColor:"grey"} : {}}
                                                        ingreType={ingreType}
                                                        ingre = {dayCart[ingreType][ingre]}
                                                        ingreID = {ingre}
                                                        shoppingCart = {shoppingCart}
                                                        setNumOutstanding = {setNumOutstanding}
                                                        day = {day}
                                                    />
                                                ))}
                                            </React.Fragment>
            
                                        ))}
                                    
                                    </>

                                ) : (
                                    <TableRow><TableCell>No items for today</TableCell></TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </Box>
                </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}


export function ShoppingCart({shoppingCart}) {
    // console.log(shoppingCart)

    const dayIndex = new Date(Date.now()).getDate() - new Date(shoppingCart.CreatedAt).getDate(); // +1 not suppose to be there  this is for testing
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const d = new Date(shoppingCart.CreatedAt);

    const weekday = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];



    return (
        <>
            {shoppingCart ? (<TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                <TableRow>
                    <TableCell style={{fontSize:"20px", fontFamily:"Nunito sans" , color:"#205E4B"}}>Day</TableCell>
                    <TableCell style={{fontSize:"20px", fontFamily:"Nunito sans", color:"#205E4B"}}>Number of items</TableCell>
                    <TableCell style={{fontSize:"20px", fontFamily:"Nunito sans", color:"#205E4B"}}>Number of outstanding items</TableCell>
                    <TableCell />
                </TableRow>
                </TableHead>
                <TableBody>
                {Object.keys(shoppingCart.shoppingCart).map((day)=>(
                    
                    <InnerTable 
                        key={day}
                        dayCart = {shoppingCart.shoppingCart[day]}
                        title={`${new Date(d.getTime() + (parseInt(day) * 24 * 60 * 60 * 1000))
                            .toLocaleDateString('en-GB', options)}, ${weekday[new Date(d.getTime() + (parseInt(day) * 24 * 60 * 60 * 1000))
                            .getDay()]}`}
                        shoppingCart = {shoppingCart}
                        dayIndex = {dayIndex}
                        day = {day}
                    />

                ))}

                </TableBody>
            </Table>
        </TableContainer>) : (<h1>Shopping Cart is empty</h1>)}
        </>
    );
}

export function ShoppingCartMobile({shoppingCart}) {
    // console.log("ShoppingCartMobile")
    // console.log(shoppingCart)

    const dayIndex = new Date(Date.now()).getDate() - new Date(shoppingCart.CreatedAt).getDate(); // +1 not suppose to be there  this is for testing
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const d = new Date(shoppingCart.CreatedAt);

    const weekday = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    // use accordions similar to CurrentMealPlanV2 with the inner table inside the dropdown
    const [accordionDisplay, setExpanded] = useState(dayIndex);

    // var accordionDisplay = dayIndex
    const changeAccordionDisplay = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
      };
    
    return (
        <React.Fragment>
            {Object.keys(shoppingCart.shoppingCart).map((day)=>(
                <Accordion key={day} expanded={accordionDisplay == day} onChange={changeAccordionDisplay(day)} > 
                    <AccordionSummary
                            expandIcon={<ExpandMore />}
                        >
                        <h3>
                            {new Date(d.getTime() + (parseInt(day) * 24 * 60 * 60 * 1000))
                            .toLocaleDateString('en-GB', options)}, {weekday[new Date(d.getTime() + (parseInt(day) * 24 * 60 * 60 * 1000))
                            .getDay()]}
                        </h3>
                    </AccordionSummary>

                    <AccordionDetails>
                        <Table>
                            <TableHead>
                                <TableRow style={{ backgroundColor:"#1F5E4B", height:"60px" }}>
                                    <TableCell style={{fontFamily:"Nunito Sans", color:"white"}}>Item name</TableCell>
                                    <TableCell style={{fontFamily:"Nunito Sans", color:"white"}} align="right">Quantity</TableCell>
                                    <TableCell style={{fontFamily:"Nunito Sans", color:"white"}} align="right">Unit</TableCell>
                                    <TableCell style={{fontFamily:"Nunito Sans", color:"white"}}>Bought?</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {Object.keys(shoppingCart.shoppingCart[day]).length >0 ? (
                                    <>
                                        {Object.keys(shoppingCart.shoppingCart[day]).map((ingreType)=>(
                                            Object.keys(shoppingCart.shoppingCart[day][ingreType]).map((ingre)=>(
                                                <CustomRow 
                                                    key={dayIndex+ingreType+ingre}
                                                    flag={shoppingCart.shoppingCart[day][ingreType][ingre].completed}
                                                    buttonTxt = {shoppingCart.shoppingCart[day][ingreType][ingre].completed ? "Bought" : "Buy"}
                                                    rowStyle = {shoppingCart.shoppingCart[day][ingreType][ingre].completed ? {backgroundColor:"grey"} : {}}
                                                    ingreType={ingreType}
                                                    ingre = {shoppingCart.shoppingCart[day][ingreType][ingre]}
                                                    ingreID = {ingre}
                                                    shoppingCart = {shoppingCart}
                                                    day = {day}
                                                    isMobile = {true}
                                                />
                                            ))
                                        ))}
                                    </>
                                ) : (<TableRow><TableCell>No items for today</TableCell></TableRow>)}



                                {/* <CustomRow 
                                    key={dayIndex+ingreType+ingre}
                                    flag={dayCart[ingreType][ingre].completed}
                                    buttonTxt = {dayCart[ingreType][ingre].completed ? "Bought" : "Buy"}
                                    rowStyle = {dayCart[ingreType][ingre].completed ? {backgroundColor:"grey"} : {}}
                                    ingreType={ingreType}
                                    ingre = {dayCart[ingreType][ingre]}
                                    ingreID = {ingre}
                                    shoppingCart = {shoppingCart}
                                    setNumOutstanding = {setNumOutstanding}
                                    day = {day}
                                /> */}
                            </TableBody>
                        </Table>
                    </AccordionDetails>
                </Accordion>
            ))}
        </React.Fragment>
    )    

}

