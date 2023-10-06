import { useState } from "react";
import { fetcher } from "../getters/Fetcher";

export async function pageDataGetter(type, mealCals, setter) {
  // mealType (string, comma separated); "breakfast", "lunch, main course"

  fetcher(
    "/foodAPI/search/?",
    {
      type: type,
      minCalories: mealCals*0.90,
      maxCalories: mealCals*1.1,
    },
    setter
  );
  
}
