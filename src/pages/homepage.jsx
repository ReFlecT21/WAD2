import React, { useState } from "react";
import { fetcherPOST } from "../getters/Fetcher";
import { NavBar } from "../components";
import { Row, Col, Button, Stack } from "react-bootstrap";
import { Box } from "@mui/material";
import { useAtom } from "jotai";
import { RecipeOverlay } from "../atoms/recipeOverlay";
import { Modal } from "@mui/material";
import { ManualSearchComponent } from "../components/ManualSearchInput";


import Spline from '@splinetool/react-spline';



const HomePage = () => {
  const [overlayData, setOverlayData] = useAtom(RecipeOverlay);

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
      {overlayData}
      <Row xs={1} md={2}>
        {/* <Col>
          <spline-viewer url="https://prod.spline.design/TGgKuiS6HyavoK5J/scene.splinecode" events-target="global" logo="No"></spline-viewer>
        </Col> */}
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
            <div className="neuphormicBox">
              <Stack gap={2}>
                <Button className="homePageBtn">Scan</Button>
                <Button className="homePageBtn" onClick={() => setOverlayData(<ManualSearchComponent />)}>Manual Search</Button>
              </Stack>
            </div>
          </Col>
      </Row> 
    </>
  );
};

export default HomePage;
