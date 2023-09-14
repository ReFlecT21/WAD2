import React from "react";
import { Container, Row, Col, Image, Form, Button } from "react-bootstrap";
import "./login.css";

const LoginComponent = () => {
  return (
    <Container fluid style={{ padding: "0", width: "100%", height: "100vh" }}>
      <Row style={{ margin: "0", height: "100vh" }}>
        <Col className="backgroundLeft d-flex d-none d-md-block">
          <Image src="/login.png" alt="" className="foodimg" />
        </Col>
        <Col className="backgroundRight d-flex ">
          <Row
            className="justify-content-center"
            style={{ margin: "0", padding: "0", width: "100%" }}
          >
            <Row className="d-flex justify-content-center">
              <Image src="/MenuMate.png" alt="" className="logo" />
            </Row>
            <Row className="d-flex justify-content-center">
              <h2 className="tagline">Your friend in every meal.</h2>
            </Row>
            <Row className="d-flex justify-content-center">
              <Form.Control
                type="text"
                placeholder="Email"
                className="inputBox"
                id="text-input"
              />
            </Row>
            <Row className="d-flex justify-content-center">
              <Form.Control
                type="password"
                placeholder="Password"
                className="inputBox"
              />
            </Row>
            <Row className="d-flex justify-content-center">
              <Button type="submit" className="loginButton">
                LOGIN
              </Button>
            </Row>
            <Row className="d-flex justify-content-center">
              <p>
                Do not have an account? <a href="#">Sign up</a>
              </p>
            </Row>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginComponent;
