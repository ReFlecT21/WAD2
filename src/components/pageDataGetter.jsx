import { useEffect, useState } from "react";
import { fetcher, fetcherGET } from "../middleware/Fetcher";
import { useAtom } from "jotai";
import { Allergies } from "../atoms/allergiesAtom";
import Cookies from "js-cookie";

export async function pageDataGetter(type, mealCals, setter) {
  // mealType (string, comma separated); "breakfast", "lunch, main course"
  // const [allergies, setAllergies] = useAtom(Allergies);
  const allergies= JSON.parse(Cookies.get("allergies") ? Cookies.get("allergies") : "[]" );
  // useEffect(() => {
  //   const storedAllergies = localStorage.getItem('allergies');
  //   if (storedAllergies) {
  //     setAllergies(JSON.parse(storedAllergies));
  //   }
  // }, [setAllergies]);


  let allergyString = ""
  if (allergies.length > 0){
    allergyString = allergies.join(', ');
  }
  // console.log(allergies);


  fetcherGET(
    "/foodAPI/search/?",
    {
      type: type,
      minCalories: mealCals*0.90,
      maxCalories: mealCals*1.1,
      intolerances: allergyString,
    },
    setter
  );
  
}
