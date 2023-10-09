import React, { useState } from "react";
import { Container, Row, Col, Image, Form, Button } from "react-bootstrap";
// import "./login.css";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import { useAtom } from "jotai";
import { LoggedIn } from "../atoms/logInAtom";

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useAtom(LoggedIn);
  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
      setLoggedIn(true);
    } catch (e) {
      console.log(password);
      console.log(email);
      console.log(e.message);
    }
  };
  return (
    <Container fluid style={{ padding: "0", width: "100%", height: "100vh" }}>
      <Row style={{ margin: "0", height: "100vh" }}>
        <Col className="backgroundLeft d-flex d-none d-md-block p-0 col-7">
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
                onChange={(e) => setEmail(e.target.value)}
              />
            </Row>
            <Row className="d-flex justify-content-center">
              <Form.Control
                type="password"
                placeholder="Password"
                className="inputBox"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Row>
            <Row className="d-flex justify-content-center">
              <Button onClick={login} type="submit" className="loginButton">
                Login
              </Button>
            </Row>
            <Row className="d-flex justify-content-center">
              <p className="signupSmallText">
                Do not have an account? <Link className="link" to="/signup">Sign up</Link>
              </p>
            </Row>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginComponent;
