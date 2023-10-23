import { useEffect, useState } from "react";
import { fetcher } from "../middleware/Fetcher";
import { useAtom } from "jotai";
import { Allergies } from "../atoms/allergiesAtom";

export async function pageDataGetter(type, mealCals, setter) {
  // mealType (string, comma separated); "breakfast", "lunch, main course"
  // const [allergies, setAllergies] = useAtom(Allergies);
  const allergies= JSON.parse(localStorage.getItem("allergies"))
  // useEffect(() => {
  //   const storedAllergies = localStorage.getItem('allergies');
  //   if (storedAllergies) {
  //     setAllergies(JSON.parse(storedAllergies));
  //   }
  // }, [setAllergies]);

  // console.log(allergies);


  fetcher(
    "/foodAPI/search/?",
    {
      type: type,
      minCalories: mealCals*0.90,
      maxCalories: mealCals*1.1,
      intolerances: allergies.join(', '),
    },
    setter
  );
  
}
