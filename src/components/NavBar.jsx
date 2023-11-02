import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import "./NavBar.css";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";

import { app, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
// import firebase from "firebase/app";
// import "firebase/auth";
import { useNavigate } from "react-router-dom";
function NavBar() {
  const navigate = useNavigate();
  const logout = async () => {
    try {
      await signOut(auth);
      navigate("/");
      console.log("User logged out");
    } catch (e) {
      console.error(e.message);
    }
  };
  return (
    <Navbar expand="lg" className="custom-navbar justify-content-between">
      <Container>
        <Navbar.Brand href="/home" className="homeNav">
          <img
            alt=""
            src="/MenuMateWhite.svg"
            className="d-inline-block align-top mr-10"
            />
          <h3>
            MenuMate
          </h3>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" >
          <Nav style={{ marginRight: "20px" }}>
            <Nav.Link
            className="navItem"
              href="/input"

            >
              <Button className="createBtn custom-clicked-button">
                <FontAwesomeIcon className="plusIcon"
                  icon={faPlus}
                />
                Create Meal Plan!
              </Button>
              
            </Nav.Link>
            <Nav.Link
              className="navItem"
              href="/mealplan"
            >
              <span className="navText">My Plan</span>
            </Nav.Link>

            <Nav.Link
            className="navItem"
            href="/">
              <FontAwesomeIcon className="exitIcon"
                    icon={faSignOut} onClick={logout}
                  />
            </Nav.Link>
          </Nav>
        
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
