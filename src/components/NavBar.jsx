import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import "./NavBar.css";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { app, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";

function NavBar() {
  return (
    <Navbar expand="lg" className="custom-navbar justify-content-between">
      <Container>
        <Navbar.Brand
          href="/home"
          className="homeNav"
        >
          <img
            alt=""
            src="/Untitled_Artwork 1.svg"
            className="d-inline-block align-top mr-10"
            />{" "}
          <h3>
            MenuMate
          </h3>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" >
          <Nav style={{ marginRight: "10px" }}>
            <Nav.Link
              href="/input"
              style={{ marginLeft: "10px", marginRight: "10px" }}
            >
              <Button className="createBtn"
                variant="secondary"
              >
                {" "}
                <FontAwesomeIcon className="plusIcon"
                  icon={faPlus}
                />
                Create Meal Plan!
              </Button>{" "}
            </Nav.Link>
            <Nav.Link
              style={{ marginLeft: "10px", marginRight: "10px" }}
              className="navItem"
              href="/mealplan"
            >
              <span className="navText">My Plan</span>
            </Nav.Link>
            <Nav.Link
              className="navItem"
              href="#insights"
            >
              <span className="navText">Insights</span>
            </Nav.Link>
          </Nav>
          <Image className="exitIcon"
            src="exit.png"
            href="#"
          />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
