import React, { useState } from "react";
import { useAtom } from "jotai";
import { Kcal } from "../atoms/KcalAtom";
const InputPage = () => {
  const [formData, setFormData] = useState({
    age: 0,
    gender: "male",
    meter: 0,
    cm: 0,
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
    const { age, gender, meter, cm, weight, activityLevel, goal } = formData;

    // Convert inputs
    const IntMeter = Number(meter);
    const IntCm = Number(cm);
    const totalHeightInCM = IntMeter * 100 + IntCm;
    const IntWeight = Number(weight);

    // Calculate and round BMR
    const BMR = mifflin(gender, age, totalHeightInCM, IntWeight);

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
  };

  return (
    <div>
      <h1>Calorie Calculator</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="age"
          placeholder="Age"
          onChange={handleChange}
        />
        <select name="gender" onChange={handleChange}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <input
          type="number"
          name="meter"
          placeholder="Meter"
          onChange={handleChange}
        />
        <input
          type="number"
          name="cm"
          placeholder="CM"
          onChange={handleChange}
        />
        <input
          type="number"
          name="weight"
          placeholder="Weight"
          onChange={handleChange}
        />
        <select name="activityLevel" onChange={handleChange}>
          <option value="sedentary">Sedentary</option>
          <option value="light">Light</option>
          <option value="moderate">Moderate</option>
          <option value="active">Active</option>
          <option value="very-active">Very Active</option>
          <option value="extra-active">Extra Active</option>
        </select>

        <select name="goal" onChange={handleChange}>
          <option value="maintain">Maintain</option>
          <option value="lose">Lose</option>
          <option value="gain">Gain</option>
        </select>
        <button type="submit">Calculate</button>
      </form>
    </div>
  );
};

export default InputPage;
