import { 
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


function CustomRow({flag, buttonTxt, rowStyle, ingreType, ingre, ingreID, shoppingCart, dayIndex}) {
    const [checked, setChecked] = React.useState(flag);
    const [buttonText, setButtonText] = React.useState(buttonTxt);
    const [selectStyle, setSelectStyle] = React.useState(rowStyle);

    const completeItem = async() => {
        if (checked) {
            setChecked(false);
            setButtonText("Buy");
            setSelectStyle({});
            // console.log(shoppingCart.shoppingCart[dayIndex][ingreType][ingreID].completed)
            shoppingCart.shoppingCart[dayIndex][ingreType][ingreID].completed = false;
            await dbFoodMethods.updateShoppingCart(shoppingCart.shoppingCart);
        } else {
            setChecked(true);
            setButtonText("Bought");
            setSelectStyle({backgroundColor:"grey"});
            // console.log(shoppingCart.shoppingCart[dayIndex][ingreType][ingreID].completed)
            shoppingCart.shoppingCart[dayIndex][ingreType][ingreID].completed = true;
            // console.log(shoppingCart.shoppingCart[dayIndex][ingreType][ingreID].completed)
            await dbFoodMethods.updateShoppingCart(shoppingCart.shoppingCart);
        }

    }

    return (
        <TableRow key={ingreType+ingre} style={selectStyle}>
            <TableCell >{ingreType}</TableCell>
            <TableCell >{ingre.name}</TableCell>
            <TableCell align="right">{ingre.amount}</TableCell>
            <TableCell align="right">{ingre.unit}</TableCell>
            <TableCell align="right">
                <Button 
                    className='buttonPrimary'
                    onClick={completeItem} 
                    style={{width:"80px"}}

                >{buttonText}</Button>
            </TableCell>
        </TableRow>
    )
}

function InnerTable({dayCart, title, shoppingCart, dayIndex}) {
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => setOpen(!open)}
                    >
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row" style={{fontSize:"30px"}}>
                    {title}
                </TableCell>
                <TableCell align="right">#</TableCell>
                <TableCell align="right">#</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box sx={{ margin: 1 }}>
                        {/* <Typography variant="h5" gutterBottom component="div">
                            Cart for today
                        </Typography> */}
                        <Typography variant="h8" gutterBottom component="div">
                            Check off what you have bought!
                            You can uncheck if you have made a mistake.
                        </Typography>
                        <Table size="small" aria-label="purchases">
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{fontSize:"20px"}}>Aisle</TableCell>
                                    <TableCell style={{fontSize:"20px"}}>Item name</TableCell>
                                    <TableCell style={{fontSize:"20px"}} align="right">Quantity</TableCell>
                                    <TableCell style={{fontSize:"20px"}} align="right">Unit</TableCell>
                                    <TableCell style={{fontSize:"20px"}} align="right">Bought?</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
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
                                            dayIndex = {dayIndex}
                                        />
                                    ))}
                                </React.Fragment>

                            ))}
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

    const dayIndex = new Date(Date.now()).getDate() - new Date(shoppingCart.CreatedAt).getDate()+1; // +1 not suppose to be there  this is for testing
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
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                <TableRow>
                    <TableCell />
                    <TableCell>Day</TableCell>
                    <TableCell align="right">Number of items</TableCell>
                    <TableCell align="right">Number of outstanding items</TableCell>
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
                    />

                ))}

                </TableBody>
            </Table>
        </TableContainer>
    );
}

