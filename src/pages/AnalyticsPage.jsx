import React, { useState, useEffect } from "react";
import { NavBar } from "../components";
import { Container, Row, Col, Image, Form, Button } from "react-bootstrap";
import { BarChart, ProgressBar } from "../components";
import Card from "react-bootstrap/Card";
const AnalyticsPage = () => {
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
            <BarChart />
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
                <Card>
                  <ProgressBar />
                </Card>
              </Col>
            </Row>
            <Row>
              <Col>
                <Card>
                  <ProgressBar />
                </Card>
              </Col>
              <Col>
                <Card>
                  <ProgressBar />
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AnalyticsPage;
