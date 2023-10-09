import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { Kcal } from "../atoms/KcalAtom";
import {
  Container,
  Row,
  Col,
  Image,
  Form,
  Button,
  Dropdown,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import { LoggedIn } from "../atoms/logInAtom";
import { NavBar } from "../components";
import { MDBSwitch } from "mdb-react-ui-kit";
import getMealPlan from "../getters/getMealPlan";
const InputPage = () => {
  const [formData, setFormData] = useState({
    age: 0,
    gender: "female",
    height: 0,
    weight: 0,
    activityLevel: "sedentary",
    goal: "maintain",
  });

  const [calories, setCalories] = useAtom(Kcal);

  const mifflin = (gender, age, height, weight) => {
    let bmr;
    if (gender === "male") {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else if (gender === "female") {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }
    return Math.ceil(bmr);
  };

  const computeMaintenance = (BMR, activityLevel) => {
    if (activityLevel === "sedentary") {
      return (BMR *= 1.2);
    } else if (activityLevel === "light") {
      return (BMR *= 1.35);
    } else if (activityLevel === "moderate") {
      return (BMR *= 1.5);
    } else if (activityLevel === "active") {
      return (BMR *= 1.65);
    } else if (activityLevel === "very-active") {
      return (BMR *= 1.8);
    } else if (activityLevel === "extra-active") {
      return (BMR *= 1.95);
    }
  };
  const calculateCalories = () => {
    const { age, gender, height, weight, activityLevel, goal } = formData;

    // Convert inputs
    const IntHeight = Number(height);
    const IntWeight = Number(weight);

    // Calculate and round BMR
    const BMR = mifflin(gender, age, IntHeight, IntWeight);

    // Calculate maintenance based on BMR and activityLevel
    const maintenanceCals = Math.ceil(computeMaintenance(BMR, activityLevel));
    if (goal == "maintain") {
      return maintenanceCals;
    } else if (goal == "lose") {
      return maintenanceCals - 500;
    } else {
      return maintenanceCals + 500;
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeGender = (e) => {
    let value = e.target.checked ? "male" : "female";
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Check if all fields are filled out
    for (let key in formData) {
      if (formData[key] === "" || formData[key] === null) {
        alert("Please fill out all fields.");
        return;
      }
    }

    const calculatedCalories = calculateCalories();
    setCalories(calculatedCalories);
    console.log(calories);
  };
  useEffect(() => {
    const fetchData = async () => {
      const userId = auth.currentUser.email;
      const mealPlan = await getMealPlan(userId);
      console.log(mealPlan);
    };

    fetchData();
  }, []);
  return (
    <>
      <NavBar />
      <Container fluid>
        <Row>
          <Col>
          <Image src="/login.png" alt="" className="sideimg" />
          </Col>
          <Col
            style={{
              padding: "40px",
            }}
          >
            <Row>
              <h1>Getting to know you!</h1>
            </Row>
            <Row className="text" style={{ marginTop: "20px" }}>
              <Col
                style={{
                  paddingLeft: "20px",
                }}
                
              >
                <h3>Gender</h3>
                
              </Col>
              <Col
                style={{
                  paddingLeft: "20px",
                }}
              >
                <h3>Age</h3>
              </Col>
              </Row>
            <Row

            >
              <Col
                style={{
                  paddingLeft: "20px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center"}}>
                  <span style={{color: "#1F5E4B", fontWeight: "normal"}}>Female</span>
                  <MDBSwitch className="genderSwitch"
                    name="gender"
                    checked={formData.gender === "male"}
                    onChange={handleChangeGender}
                    id="flexSwitchCheckChecked"
                    label="Male"
                  />
                </div>
              </Col>
              <Col className="text" 
                style={{
                  paddingLeft: "20px",
                }}
              >
                {" "}
                <Form.Control
                  type="number"
                  name="age"
                  placeholder="Age"
                  className="formInputBox"
                  id="text-input"
                  onChange={handleChange}
                />
              </Col>
              
            </Row>
            <Row style={{ marginTop: "20px" }}>
              <Col className="text" 
              >
                <h3>Height</h3>
              </Col>
              <Col className="text" 
              >
                <h3>Weight</h3>
              </Col>
            </Row>
            <Row

            >
              <Col className="text" 
              >
                {" "}
                <Form.Control
                  type="number"
                  name="height"
                  placeholder="cm"
                  className="formInputBox"
                  id="text-input"
                  onChange={handleChange}
                />
              </Col>
              <Col className="text" 
              >
                {" "}
                <Form.Control
                  type="number"
                  name="weight"
                  placeholder="kg"
                  className="formInputBox"
                  id="text-input"
                  onChange={handleChange}
                />
              </Col>
                      
            </Row>
            <Row style={{ marginTop: "20px" }}>
              <Col
                style={{
                  paddingLeft: "20px",
                  paddingBottom: "10px",
                }}
              >
                <h3>Select your activity level</h3>
              </Col>
            </Row>
            <Row
              style={{
                marginTop: "0px",
              }}
            >
              <Col className="text" 
              >
                <Form.Select
                  onChange={handleChange}
                  aria-label="Default select example"
                  name="activityLevel"
                >
                  <option value="sedentary">Do not exercise</option>
                  <option value="light">
                    Light (Light Exercise/ once a week)
                  </option>
                  <option value="moderate">
                    Moderate (Light Exercise/ 2-3 times a week){" "}
                  </option>
                  <option value="active">
                    Active (Heavy Exercise/ 2 times a week)
                  </option>
                  <option value="very-active">
                    Very Active (Heavy Exercise/ 3-5 times a week)
                  </option>
                  <option value="extra-active">
                    Extra Active (Heavy Exercise/ 5-7 times a week)
                  </option>
                </Form.Select>
              </Col>
            </Row>
            <Row style={{ marginTop: "20px" }}>
              <Col className="text" 
              >
                <h3>Allergies</h3>
              </Col>
            </Row>
            <Row style={{ marginTop: "10px" }}>
              <Col
                style={{
                  paddingLeft: "20px",
                }}
              >
                <Form.Select
                  onChange={handleChange}
                  aria-label="Default select example"
                  multiple
                >
                  <option value="soy">Soy</option>
                  <option value="nuts">Nuts</option>
                  <option value="wheat">Wheat</option>
                  <option value="dairy">Dairy</option>
                  <option value="seafood">Seafood</option>
                  <option value="eggs">Eggs</option>
                  <option value="none">None</option>
                </Form.Select>
              </Col>
            </Row>
            <Row style={{ marginTop: "20px" }}>
              <Col className="text" 
              >
                <h3>Goal</h3>
                
              </Col>
            </Row>
            <Row style={{ marginTop: "10px" }}>
              <Col
                style={{
                  paddingLeft: "20px",
                }}
              >
                <Form.Select
                  onChange={handleChange}
                  aria-label="Default select example"
                  name="goal"
                >
                  <option value="maintain">Maintain</option>
                  <option value="lose">Lose</option>
                  <option value="gain">Gain</option>
                </Form.Select>
              </Col>
            </Row>
            <Row className="d-flex justify-content-center">
         
              <Button 
                onClick={handleSubmit}
                type="submit"
                className="inputButton"
              >
                Choose My Meals!
              </Button>
            </Row>

            
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default InputPage;