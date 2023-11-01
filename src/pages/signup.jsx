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
      alert("Passwords do not match");
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
    <Container fluid style={{ padding: "0", width: "100%", height: "100vh" }} xs={1} sm= {1} md={1} lg={1}>
      <Row className="loginPage">
        <Col className="backgroundLeft d-none d-lg-block col-lg-7">
          <Image src="/foodimg.jpg" alt="" className="loginImg" />
        </Col>
        <Col className="backgroundRight d-flex justify-content-center">
          <Row
            className="loginDetails"
          >
            <Row className="loginDetails">
              <Image src="/MenuMate.png" alt="" className="logo" />
            </Row>
            <Row className="loginDetails mb-3">
              <h2 className="tagline">Your friend in every meal.</h2>
            </Row>
            <Row className="loginDetails">
              <Form.Control
                type="text"
                placeholder="Email"
                className="inputBox"
                onChange={(e) => setRegisterEmail(e.target.value)}
              />
            </Row>
            <Row className="loginDetails">
              <Form.Control
                type="password"
                placeholder="Password"
                className="inputBox"
                onChange={(e) => setRegisterPassword1(e.target.value)}
              />
            </Row>
            <Row className="loginDetails">
              <Form.Control
                type="password"
                placeholder="Re-enter Password"
                className="inputBox"
                onChange={(e) => setRegisterPassword2(e.target.value)}
              />
            </Row>
            <Row className="loginDetails">
              <Button type="submit" className="loginButton" onClick={register}>
                Start your journey!
              </Button>
            </Row>  
            <Row className="loginDetails">
              <p className="signupSmallText">
                Already have an account? <Link className="link" to="/">Log in</Link>
              </p>
            </Row>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUpComponent;
