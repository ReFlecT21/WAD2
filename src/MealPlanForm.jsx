

import React from "react";
import { Row, Col } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';


import './MealPlanForm.css'; // Import your global stylesheet





const MealPlanForm = () => {



  return (
    <div>
      <Row className="n">
        Navbar 
      </Row>

      <Row>
        {/* col for right image on half of screen */}
        <Col> 
          <img src="https://reactjs.org/logo-og.png" className=" max-width: 100%; /* Ensure the image fits within its container */
    height: 100%;" alt="" />
        </Col>


        {/* col for form on left half of screen */}
        <Col>

        {/* row for Big text */}
        <Row>
          <p className="headertxt">Getting to know you!</p>
          </Row>

{/* row for gender and age */}
          <Row>
          <Col ></Col>
<Col>
<Form  className="d-flex justify-content-center align-items-center">
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label className="smalltxt ">Gender</Form.Label>
        <Form.Select aria-label="Default select example" className="d-flex justify-content-center align-items-center dropbar2 pe-3">
      <option value="1">Male</option>
      <option value="2">Female</option>
    </Form.Select>      </Form.Group>
    </Form>
</Col>  



<Col>
      <Form className="d-flex ms-5 ">
      <Form.Group className="mb-3 " controlId="exampleForm.ControlInput1">
        <Form.Label className="smalltxt">Age</Form.Label>
        <Form.Control className="inbar" type="email" />
      </Form.Group>
    </Form>
    </Col>

    <Col></Col>

    </Row>
    <hr />


{/* Row for Height and Weight */}
    <Row>

      <Col></Col>
    <Col className="d-flex justify-content-center align-items-center "> 
      <Form className=" ">
      <Form.Group className="mb-3 " controlId="exampleForm.ControlInput1">
        <Form.Label className="smalltxt">Height</Form.Label>
        <Form.Control className="inbar" type="email" />
      </Form.Group>
    </Form>

    <Form.Select aria-label="Default select example" className="dropbar mar ms-1 pb-0 ps-3 ">
      <option value="1">cm</option>
      <option value="2">ft</option>
      <option value="2">in</option>

    </Form.Select>

    </Col>

  

<Col className="d-flex justify-content-center align-items-center "> 
      <Form className=" ">
      <Form.Group className="mb-3 " controlId="exampleForm.ControlInput1">
        <Form.Label className="smalltxt">Weight</Form.Label>
        <Form.Control className="inbar" type="email" />
      </Form.Group>
    </Form>

    <Form.Select aria-label="Default select example" className="mar d-flex justify-content-center align-items-center dropbar pb-0 ps-3 ">
      <option value="1">kg</option>
      <option value="2">lbs</option>
    </Form.Select>

    </Col>

    <Col></Col>
    </Row>
    <hr />


    {/* Row for activity level */}
    <Row>
      <div className="smalltxt d-flex justify-content-center">Select your activity level</div>
    <Form className="d-flex justify-content-center" >
      {['checkbox'].map((type) => (
        <div key={`inline-${type}`} className="mb-3">
          <Form.Check 
            inline
            label="Intense"
            name="group1"
            type={type}
            id={`inline-${type}-1`}
          />
          <Form.Check
            inline
            label="Moderate"
            name="group1"
            type={type}
            id={`inline-${type}-2`}
            
          />
          <Form.Check
          
            inline
            label="Little to none"
            name="group1"
            type={type}
            id={`inline-${type}-3`}
          />


          
        </div>
      ))}
    </Form>
    </Row>
    <hr />

        {/* Row for Allergies */}
        <Row>

          {/* textRow */}
          <Row>
      <div className="smalltxt d-flex justify-content-center">Allergies</div>
      </Row>
      
      <Row>
      {/* box row */}
      <div>
      {/* First row with three checkboxes */}
      <Form className="d-flex justify-content-center">
        {['checkbox'].map((type) => (
          <div key={`inline-${type}`} className="mb-3">
            <Form.Check
              inline
              label="Soy"
              name="group1"
              type={type}
              id={`inline-${type}-1`}
            />

            <Form.Check
              inline
              label="Dairy"
              name="group1"
              type={type}
              id={`inline-${type}-2`}
            />

            <Form.Check
            className="b"
              inline
              label="None"
              name="group1"
              type={type}
              id={`inline-${type}-7`}
            />


          </div>
        ))}
      </Form>

      {/* Second row with two checkboxes */}
      <Form className="d-flex justify-content-center">
        {['checkbox'].map((type) => (
          <div key={`inline-${type}`} className="mb-3">
            <Form.Check
              inline
              label="Nuts"
              name="group1"
              type={type}
              id={`inline-${type}-4`}
            />

            <Form.Check
              inline
              label="Eggs"
              name="group1"
              type={type}
              id={`inline-${type}-5`}
            />
          </div>
        ))}
      </Form>

      {/* Third row with two checkboxes */}
      <Form className="d-flex justify-content-center">
        {['checkbox'].map((type) => (
          <div key={`inline-${type}`} className="mb-3">
            <Form.Check
              inline
              label="Wheat"
              name="group1"
              type={type}
              id={`inline-${type}-6`}
            />

            <Form.Check
              inline
              label="Seafood"
              name="group1"
              type={type}
              id={`inline-${type}-7`}
            />

            

          </div>
        ))}
      </Form>
    </div>
    </Row>
    
    </Row>

{/* row for last button */}
    <Row>
      <Col></Col>
      <Col></Col>
      <Col></Col>
      <Col></Col>
      <Col></Col>
      <Col></Col>
      <Col>      <Button className="greenbutton" variant="success">Choose my meals</Button>{' '}
</Col>




    </Row>


        </Col>
      </Row>
    </div>
  );
};

export default MealPlanForm;



