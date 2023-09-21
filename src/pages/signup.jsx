import React, { useState } from "react";
import { Container, Row, Col, Image, Form, Button } from "react-bootstrap";

// import "./signup.css";
// import "./index.css";

import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

const SignUpComponent = () => {
  let navigate = useNavigate();
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword1, setRegisterPassword1] = useState("");
  const [registerPassword2, setRegisterPassword2] = useState("");
  const register = async () => {
    if (registerPassword1 !== registerPassword2) {
      alert("Passwords dont match bro");
    } else {
      try {
        const user = await createUserWithEmailAndPassword(
          auth,
          registerEmail,
          registerPassword1
        );
        navigate("/");
      } catch (e) {
        console.log(e.message);
      }
    }
  };
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
            <Row className="d-flex justify-content-center align-items-center mb-3">
              <h2 className="tagline">Your friend in every meal.</h2>
            </Row>
            <Row className="d-flex justify-content-center">
              <Form.Control
                type="text"
                placeholder="Email"
                className="inputBox"
                id="text-input"
                onChange={(e) => setRegisterEmail(e.target.value)}
              />
            </Row>
            <Row className="d-flex justify-content-center">
              <Form.Control
                type="password"
                placeholder="Password"
                className="inputBox"
                onChange={(e) => setRegisterPassword1(e.target.value)}
              />
            </Row>
            <Row className="d-flex justify-content-center">
              <Form.Control
                type="password"
                placeholder="Re-enter Password"
                className="inputBox"
                onChange={(e) => setRegisterPassword2(e.target.value)}
              />
            </Row>
            <Row className="d-flex justify-content-center">
              <Button type="submit" className="loginButton" onClick={register}>
                SIGNUP
              </Button>
            </Row>
            <Row className="d-flex justify-content-center">
              <p style={{ marginTop: "60px", paddingTop: "40px" }}>
                Already have an account?<Link to="/"> Log in</Link>
              </p>
            </Row>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUpComponent;
