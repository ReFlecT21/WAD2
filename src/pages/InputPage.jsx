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
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase";
import { LoggedIn } from "../atoms/logInAtom";
import { NavBar } from "../components";
import { MDBSwitch } from "mdb-react-ui-kit";
import getMealPlan from "../middleware/getMealPlan";
import { dbFoodMethods } from "../middleware/dbMethods";
import { Allergies } from "../atoms/allergiesAtom";
import Spline from "@splinetool/react-spline";

const InputPage = () => {
  const navigate = useNavigate();
  const navHome = () => navigate("/home");
  const navChoose = () => navigate("/choose");

  const [formData, setFormData] = useState({
    age: 0,
    gender: "female",
    height: 0,
    weight: 0,
    activityLevel: "sedentary",
    goal: "maintain",
  });

  const [allergies, setAllergies] = useAtom(Allergies);

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

  const handleAllergies = (e) => {
    if (allergies.includes(e.target.value)) {
      // If the allergy is already in the array, remove it
      setAllergies((prevAllergies) =>
        prevAllergies.filter((item) => item !== e.target.value)
      );

      // localStorage.setItem("allergies", JSON.stringify(calories));
    } else {
      // If the allergy is not in the array, add it
      setAllergies((prevAllergies) => [...prevAllergies, e.target.value]);

      // localStorage.setItem("allergies", JSON.stringify(calories));
    }
  };

  const handleSubmit = async (e) => {
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
    await setCalories(calculatedCalories);
    // localStorage.setItem("calories", JSON.stringify(calories));
    // console.log(calories);

    navChoose();
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const userId = auth.currentUser.email;
  //     const mealPlan = await getMealPlan(userId);               // why do we need this? called but not used.
  //     // dbFoodMethods.init();
  //     // const mealPlan = await dbFoodMethods.getMealPlan();     // why do we need this? called but not used.
  //     // console.log(mealPlan);
  //   };

  //   fetchData();
  // }, []);

  return (
    <>
      <NavBar />
      <Container
        fluid
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <Row>
          <Col md={5}>
            <Spline scene="https://prod.spline.design/R13nzpLjESB0JRSG/scene.splinecode" />
            {/* <img src="https://via.placeholder.com/500" alt="" /> */}
          </Col>

          <Col
            style={{
              padding: "20px",paddingTop:"60px"
            }}
          >
            <Row >
              
              <h2>Getting to know you!</h2>
            </Row>

            <Row style={{ marginTop: "25px" }}>
              <Col md={6}
                style={{
                  paddingLeft: "20px",
                }}
              >
                <h5>Gender</h5>

                <div style={{ display: "flex", alignItems: "center" }}>
                  <span style={{ marginRight: "10px", color: "black" }}>
                    Female
                  </span>
                  <MDBSwitch
                    style={{ color: "white" }}
                    className="p"
                    name="gender"
                    checked={formData.gender === "male"}
                    onChange={handleChangeGender}
                    id="flexSwitchCheckChecked"
                    label="Male"
                  />
                </div>
              </Col>

              <Col md={6}
                style={{
                  paddingLeft: "20px",
                }}
              >
                <h5>Age</h5>{" "}
                <Form.Control
                  type="number"
                  name="age"
                  placeholder="Enter your age"
                  className="inputBo round"
                  id="text-input"
                  onChange={handleChange}
                />
              </Col>
            </Row>
            <Row style={{ marginTop: "35px" }}>
              <Col md={6}
                style={{
                  paddingLeft: "20px",
                }}
              >
                <h5>Height</h5>{" "}
                <Form.Control
                  type="number"
                  name="height"
                  placeholder="Enter your height (cm)"
                  className="inputBo round"
                  id="text-input"
                  onChange={handleChange}
                />
              </Col>
              <Col md={6}
                style={{
                  paddingLeft: "20px",
                }}
              >
                <h5>Weight</h5>{" "}
                <Form.Control
                  type="number"
                  name="weight"
                  placeholder="Enter your weight (kg)"
                  className="inputBo round"
                  id="text-input"
                  onChange={handleChange}
                />
              </Col>
            </Row>
            <Row style={{ marginTop: "35px" }}>
            <Col md={6} 
                style={{
                  paddingLeft: "20px",
                }}
              >
                <h5>Activity level</h5>

                <Form.Select
                className="round"
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
              <Col md={6}
                style={{
                  paddingLeft: "20px",
                }}
              >
                <h5>Goal</h5>

                <Form.Select
                className="round"
                  onChange={handleAllergies}
                  aria-label="Default select example"
                  name="goal"
                >
                  <option value="maintain">Maintain</option>
                  <option value="lose">Lose</option>
                  <option value="gain">Gain</option>
                </Form.Select>
              </Col>
            </Row>
            <Row style={{ marginTop: "35px" }}>
              <Col
                style={{
                  paddingLeft: "20px",
                }}
              >
                <h5>Allergies</h5>

                {[
                  "Dairy",
                  "Egg",
                  "Gluten",
                  "Grain",
                  "Peanut",
                  "Seafood",
                  "Sesame",
                  "Shellfish",
                  "Soy",
                  "Sulfite",
                  "Tree Nut",
                  "Wheat",
                ].map((item) => (
                  <Form.Check
                    key={item} // Make sure to add a unique key when mapping over an array in React
                    type="checkbox"
                    label={item}
                    name="allergies"
                    value={item}
                    onChange={handleAllergies}
                    inline
                    style={{ color: "#1F5E4B" }}
                  />
                ))}

                {/* <Form.Select
                  onChange={handleChange}
                  aria-label="Default select example"
                  name="allergies"
                  multiple
                >
                  <option value="soy">Soy</option>
                  <option value="nuts">Nuts</option>
                  <option value="wheat">Wheat</option>
                  <option value="dairy">Dairy</option>
                  <option value="seafood">Seafood</option>
                  <option value="eggs">Eggs</option>
                  <option value="none">None</option>
                </Form.Select> */}
              </Col>
            </Row>
            <Row >
              <Col style={{
                  display: 'flex',
                  justifyContent: 'center',
                      }}>
                <Button
                  onClick={handleSubmit}
                  type="submit"
                  className="CreateMealBtn"
                  
                  
                >
                  Create Meal
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default InputPage;
