import Cookies from "js-cookie";
import { dbFoodMethods, dbUserMethods } from "../middleware/dbMethods";
import { backendMethods } from "../middleware/backendMethods";

export async function pageDataGetter(type, mealCals, setter) {

  var allergies = [];
  var allergyString = ""

  if (Cookies.get("allergies")){
    allergies = JSON.parse(Cookies.get("allergies"))
    if (allergies.length > 0){
      allergyString = allergies.join(', ');
    }
    // console.log(allergyString);
    

    backendMethods.fetcherGET("search/?", {type: type, minCalories: mealCals*0.90, maxCalories: mealCals*1.1, intolerances: allergyString}, setter)

  } else {
    dbUserMethods.getAllergies().then((res) => { 
      if (res) {
        console.log(res);
        if (res.length > 0){
          allergyString = res.join(', ');
        }

        backendMethods.fetcherGET("search/?", {type: type, minCalories: mealCals*0.90, maxCalories: mealCals*1.1, intolerances: allergyString}, setter)
      }
    });
  }
  


  
  
}
