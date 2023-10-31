import React, { useState, useEffect } from "react";
import { NavBar } from "../components";
import { Container, Row, Col, Image, Form, Button } from "react-bootstrap";
import { BarChart, ProgressBar } from "../components";
import Card from "react-bootstrap/Card";
import { dbFoodMethods } from "../middleware/dbMethods";
const AnalyticsPage = () => {
  const dayIndex = 7;
  const [weights, setWeight] = useState([]);
  const [avgCal, setAvgCal] = useState("");
  const [diffWeight, setDiffWeight] = useState("");
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
      const result = await dbFoodMethods.getAnalytics();
      setWeight(result.weights);
      setAvgCal(result.Cals);
      setDiffWeight(result.diffWeight);
      let dates = result.Dates;

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
    };
    fetchData();
  }, []);

  return (
    <>
      {formattedDates.length > 0 && (
        <>
          <Container
            fluid
            style={{
              padding: "0",
              width: "100%",
              height: "100vh",
              overflow: "hidden", // This will disable scrolling
            }}
          >
            <Row style={{ height: "100%" }}>
              <Col>
                <BarChart Weights={weights} Dates={formattedDates} />
              </Col>
              <Col>
                <Row>
                  <Col>
                    <Card>
                      <Card.Body>
                        <Card.Title style={{ color: "black" }}>
                          {avgCal}
                        </Card.Title>

                        <Card.Text>Avg. Cals Per Day</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>

                  <Col>
                    <Card>
                      <Card.Body>
                        <Card.Title style={{ color: "black" }}>
                          {diffWeight} kg
                        </Card.Title>

                        <Card.Text>
                          {diffWeight < 0
                            ? "Total Weight Gain"
                            : "Total Weight Loss"}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </>
      )}
    </>
  );
};

export default AnalyticsPage;
