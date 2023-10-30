import React, { useState, useEffect } from "react";
import { NavBar } from "../components";
import { Container, Row, Col, Image, Form, Button } from "react-bootstrap";
import { BarChart, ProgressBar } from "../components";
import Card from "react-bootstrap/Card";
import { dbFoodMethods } from "../middleware/dbMethods";
const AnalyticsPage = () => {
  const dayIndex = 7;
  const [weights, setWeight] = useState([]);
  const [dates, setDates] = useState([]);
  const [formattedDates, setFormattedDates] = useState([]);

  console.log(dayIndex);
  // change once u understand cookies
  // useEffect(() => {
  //   if (dayIndex == 7) {
  //     const fetchData = async () => {
  //       const result = await dbFoodMethods.checkEnd();
  //       console.log(result);
  //       if (result) {
  //         await dbFoodMethods.addMealPlanToHistory();
  //       }
  //     };
  //     fetchData();
  //   }
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      const result = await dbFoodMethods.getWeights();
      setWeight(result.weights);
      setDates(result.Dates);
    };
    fetchData();
  }, []);
  useEffect(() => {
    const newFormattedDates = dates.map((timestamp) => {
      // Convert the timestamp to a Date object
      const date = new Date(timestamp);

      // Extract the date and month
      const day = date.getDate(); // Day of the month (1-31)
      const month = date.getMonth() + 1; // Month number (0-11, so we add 1)

      // Format the date and month
      return `${day}/${month}`;
    });

    setFormattedDates(newFormattedDates); // Update the state with the new array
  }, []);
  return (
    <>
      <NavBar />
      <Container
        fluid
        style={{
          padding: "0",
          width: "100%",
          height: "100vh",
        }}
      >
        <Row>
          <Col>
            {formattedDates.length > 0 ? (
              <BarChart Weights={weights} Dates={formattedDates} />
            ) : (
              <BarChart Weights={weights} />
            )}
          </Col>
          <Col style={{ marginTop: "70px" }}>
            <Row>
              <Col>
                <h1>Why you skip breakfast ah</h1>
              </Col>
            </Row>
            <Row>
              <Col>
                <Card>
                  <ProgressBar />
                </Card>
              </Col>
              <Col>
                <Card body>2100</Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AnalyticsPage;
