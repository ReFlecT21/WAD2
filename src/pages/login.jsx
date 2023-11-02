import React, { useState } from "react";
import { Container, Row, Col, Image, Form, Button } from "react-bootstrap";
// import "./login.css";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import { useAtom } from "jotai";
import { LoggedIn } from "../atoms/logInAtom";
import { dbFoodMethods } from "../middleware/dbMethods";
import { useNavigate } from "react-router-dom";
const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useAtom(LoggedIn);
  const navigate = useNavigate();
  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      setLoggedIn(true);
      console.log(user);

      dbFoodMethods.init();
      navigate("/home");
    } catch (e) {
      console.log(password);
      console.log(email);
      console.log(e.message);
    }
  };
  return (
    <Container
      fluid
      style={{ padding: "0", width: "100%", height: "100vh" }}
      xs={1}
      sm={1}
      md={1}
      lg={1}
    >
      <Row className="loginPage">
        <Col className="backgroundLeft d-none d-lg-block col-lg-7">
          <Image src="/foodimg.jpg" alt="" className="loginImg" />
        </Col>
        <Col className="backgroundRight d-flex justify-content-center">
          <Row className="loginDetails">
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
                onChange={(e) => setEmail(e.target.value)}
              />
            </Row>
            <Row className="loginDetails">
              <Form.Control
                type="password"
                placeholder="Password"
                className="inputBox"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Row>
            <Row className="loginDetails">
              <Button onClick={login} type="submit" className="loginButton">
                Login
              </Button>
            </Row>
            <Row className="loginDetails">
              <p className="signupSmallText">
                Do not have an account?{" "}
                <Link className="link" to="/signup">
                  Sign up
                </Link>
              </p>
            </Row>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginComponent;
