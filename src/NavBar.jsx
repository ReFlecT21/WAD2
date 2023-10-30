import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./NavBar.css";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { app, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

function NavBar() {
  return (
    <Navbar expand="lg" className="custom-navbar justify-content-between">
      <Container>
        <Navbar.Brand
          href="#home"
          className="d-flex align-items-center justify-content-center"
        >
          <img
            alt=""
            src="/Untitled_ArtWork 1.svg"
            width="50"
            height="50"
            className="d-inline-block align-top mr-10"
            style={{ marginRight: "10px" }}
          />{" "}
          <h2
            style={{
              color: "white",
              fontFamily: "'Nunito Sans', sans-serif;",
              margin: "0",
            }}
          >
            MenuMate
          </h2>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav style={{ marginRight: "10px" }}>
            <Nav.Link
              href="#createPlan"
              style={{ marginLeft: "10px", marginRight: "10px" }}
            >
              <Button
                variant="secondary"
                style={{ backgroundColor: "#d9d9d9" }}
              >
                {" "}
                <FontAwesomeIcon
                  icon={faPlus}
                  style={{ marginRight: "10px", color: "black" }}
                />
                <span style={{ color: "#1f5e4b" }}>Create Plan!</span>
              </Button>{" "}
            </Nav.Link>
            <Nav.Link
              style={{ marginLeft: "10px", marginRight: "10px" }}
              className="d-flex align-items-center"
              href="#myPlan"
            >
              <span>My Plan</span>
            </Nav.Link>
            <Nav.Link
              style={{ marginLeft: "10px", marginRight: "10px" }}
              className="d-flex align-items-center"
              href="#insights"
            >
              <span>Insights</span>
            </Nav.Link>
          </Nav>
          <Image
            style={{ marginLeft: "10px", marginRight: "10px" }}
            src="exit.png"
            roundedCircle
          />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
