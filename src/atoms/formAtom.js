import { atom } from "jotai";

export const FormDetails = atom({
  age: 0,
  gender: "female",
  height: 0,
  weight: 0,
  activityLevel: "sedentary",
  goal: "maintain",
});
