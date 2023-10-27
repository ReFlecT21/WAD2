import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function createData(
  name,
  calories,
  fat,
  carbs,
  protein,
  price,
) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      {
        date: '2020-01-05',
        customerId: '11091700',
        amount: 3,
      },
      {
        date: '2020-01-02',
        customerId: 'Anonymous',
        amount: 1,
      },
    ],
  };
}

function Row(props) {
  const { row } = props;
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
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.calories}</TableCell>
        <TableCell align="right">{row.fat}</TableCell>
        <TableCell align="right">{row.carbs}</TableCell>
        <TableCell align="right">{row.protein}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
                    </TableRow>
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

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
  createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
  createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
  createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
];

export function ShoppingCart() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}



// import { Box } from "@mui/material";
// import React, { useState } from "react";
// import { Button, Modal, Row, Table } from "react-bootstrap";


// export function ShoppingCartPopUp({shoppingCart}) {
//     // console.log(shoppingCart)

//     const [ShoppingCartModal, setShoppingCartModal] = useState(false);
//     const handleOpen = () => {
//         setShoppingCartModal(true);
//     };
//     const handleClose = () => {
//         setShoppingCartModal(false);
//     };


//     return (
//         <div>
//             <Button variant="primary" onClick={()=>{setShoppingCartModal(true)}}>
//                 Shopping Cart
//             </Button>
//             <Modal
//                 open={true}
//                 onClose={handleClose}
//                 style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
//             >
//                 <Box className="popup">
//                     <h4>shoppingCart popup</h4>
//                     <h4>shoppingCart popup</h4>
//                     <h4>shoppingCart popup</h4>
//                     <h4>shoppingCart popup</h4>
//                     <h4>shoppingCart popup</h4>
//                     <h4>shoppingCart popup</h4>
//                 </Box>
//             </Modal>
//         </div>
//       );
// }

// export function ShoppingCart({shoppingCart}) {
//     console.log(shoppingCart)

//     const dayIndex = new Date(Date.now()).getDate() - new Date(shoppingCart.CreatedAt).getDate()+1; // +1 not suppose to be there  this is for testing
//     const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
//     const d = new Date(shoppingCart.CreatedAt);

//     const weekday = [
//         "Sunday",
//         "Monday",
//         "Tuesday",
//         "Wednesday",
//         "Thursday",
//         "Friday",
//         "Saturday",
//     ];
//     return (
//         <>
//             <h1>Shopping Cart</h1>
//                 {Object.keys(shoppingCart.shoppingCart).map((day)=>(

//                     <Table key={day} striped bordered hover >
//                         <tr>
//                         {/* <p> */}
//                             {new Date(d.getTime() + (parseInt(day) * 24 * 60 * 60 * 1000))
//                         .toLocaleDateString('en-GB', options)}, {weekday[new Date(d.getTime() + (parseInt(day) * 24 * 60 * 60 * 1000))
//                         .getDay()]}
//                         {/* </p> */}
//                         </tr>
//                         <tr>
//                             <th>Ingredient Type</th>
//                             <th>Ingredient</th>
//                             <th>Amount</th>
//                             <th>Checked?</th>
//                         </tr>
//                     {/* <div> */}
                        
//                         {Object.keys(shoppingCart.shoppingCart[day]).map((ingreType)=>(
//                             <>
//                             {Object.keys(shoppingCart.shoppingCart[day][ingreType]).map((ingre)=>(
//                                 <tr>
//                                     <td>{ingreType}</td>
//                                     <td>{shoppingCart.shoppingCart[day][ingreType][ingre].name}</td>
//                                     <td>{shoppingCart.shoppingCart[day][ingreType][ingre].amount}</td>
//                                     <td>{shoppingCart.shoppingCart[day][ingreType][ingre].completed}</td>
//                                 </tr>
//                             ))}
                            
//                             </>
                            
//                         ))}


//                     {/* <Row xs={1} md={2}> */}
//                     {/* </Row> */}
//                     {/* </div> */}
//                     {/* // console.log(ingreType) */}
//                     </Table>
//                 ))}


//         </>
//     );
// }
// return (
//     <>
//         <h1>Shopping Cart</h1>
//             {Object.keys(shoppingCart.shoppingCart).map((day)=>(

//                 <Table key={day} striped bordered hover >
//                     <tr>
//                     {/* <p> */}
//                         {new Date(d.getTime() + (parseInt(day) * 24 * 60 * 60 * 1000))
//                     .toLocaleDateString('en-GB', options)}, {weekday[new Date(d.getTime() + (parseInt(day) * 24 * 60 * 60 * 1000))
//                     .getDay()]}
//                     {/* </p> */}
//                     </tr>
//                     <tr>
//                         <th>Ingredient Type</th>
//                         <th>Ingredient</th>
//                         <th>Amount</th>
//                         <th>Checked?</th>
//                     </tr>
//                 {/* <div> */}
                    
//                     {Object.keys(shoppingCart.shoppingCart[day]).map((ingreType)=>(
//                         <>
//                         {Object.keys(shoppingCart.shoppingCart[day][ingreType]).map((ingre)=>(
//                             <tr>
//                                 <td>{ingreType}</td>
//                                 <td>{shoppingCart.shoppingCart[day][ingreType][ingre].name}</td>
//                                 <td>{shoppingCart.shoppingCart[day][ingreType][ingre].amount}</td>
//                                 <td>{shoppingCart.shoppingCart[day][ingreType][ingre].completed}</td>
//                             </tr>
//                         ))}
                        
//                         </>
                        
//                     ))}


//                 {/* <Row xs={1} md={2}> */}
//                 {/* </Row> */}
//                 {/* </div> */}
//                 {/* // console.log(ingreType) */}
//                 </Table>
//             ))}


//     </>
// );