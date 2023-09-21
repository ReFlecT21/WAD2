import React, { useState } from "react";
import { fetcherPOST } from "../components/Fetcher";
import { NavBar } from "../components";
import { Row, Col, Button, Stack } from "react-bootstrap";
import { Box } from "@mui/material";

const HomePage = () => {
  // const body = {
  //   query: "prata",
  //   include_subrecipe: true,
  //   use_raw_foods: false,
  //   line_delimited: true,
  //   claims: true,
  //   taxonomy: true,
  //   ingredient_statement: true,
  // };
  // const [data, setData] = useState(null);

  // fetcherPOST("/foodAPI/manualSearch", body, setData);

  // console.log(data);



  return (
    <>
      <NavBar />
      <Row xs={1} md={2}>
        <Col>
          {/* <Stack gap={2} >  */}
            <div className="neuphormicBox">
              <h1>Today's Meal</h1>
              <h3>Breakfast</h3>
              <h3>Lunch</h3>
              <h3>Dinner</h3>
              <p>LOREM ipsum</p>
            </div>
          {/* </Stack> */}
        </Col>
          <Col>
            <div className="neuphormicBoxInset">
              <Button className="buttonTert">Scan</Button>
              <Button className="buttonPrimary">Input</Button>
            </div>
          </Col>
      </Row> 
    </>
  );
};

export default HomePage;
