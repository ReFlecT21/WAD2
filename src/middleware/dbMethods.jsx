import {
  collection,
  doc,
  getDoc,
  setDoc,
  addDoc,
  query,
  getDocs,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, auth } from "../../firebase";
import Cookies from "js-cookie";

export const dbUserMethods = {
  username: null,
  docRef: null,
  docSnap: false,

  init: async function () {
    if (this.docSnap == false) {
      this.username = auth.currentUser.email;
      this.docRef = doc(db, "BioData", this.username);
      this.docSnap = await getDoc(this.docRef);
    }
  },

  setUserData: async function (data, allergies) {
    console.log("setUserData");
    console.log(data);
    console.log(allergies);
    await this.init();

    try {
      await setDoc(this.docRef, {
        formInput: data,
        allergies: allergies,
      }).then(() => {
        console.log("Document written");
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  },

  getUserData: async function () {
    await this.init();

    if (this.docSnap) {
      const data = this.docSnap.data();
      const formInput = data?.formInput;
      const allergies = data?.allergies;
      return { formInput, allergies };
    } else {
      console.error("Document does not exist");
    }
  },

  getAllergies: async function () {
    await this.init();

    if (this.docSnap) {
      const data = this.docSnap.data();
      // const formInput = data?.formInput;
      const allergies = data?.allergies;
      return allergies;
    } else {
      console.error("Document does not exist");
    }
  },
};

export const dbFoodMethods = {
  username: null,
  docRef: null,
  docSnap: false,

  init: async function () {
    if (this.docSnap == false) {
      this.username = auth.currentUser.email;
      this.docRef = doc(db, "Food", this.username);
      this.docSnap = await getDoc(this.docRef);
    }
  },

  getCompleted: async function () {
    console.log("getCompleted");
    await this.init();
    // console.log(this.docSnap)
    try {
      // Get the current state of the document
      if (this.docSnap) {
        const data = this.docSnap.data();
        // console.log(data);
        const Completed = data.Completed;
        const CreatedAt = data.CreatedAt;
        // console.log({Completed, CreatedAt});
        return { Completed, CreatedAt };
      } else {
        console.error("Document does not exist");
      }
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  },
  getMealPlan: async function () {
    console.log("getMealPlan");
    // console.log(this.docSnap)
    await this.init();
    try {
      // Get the current state of the document
      if (this.docSnap) {
        const data = this.docSnap.data();
        // console.log(data);
        const mealPlan = data.Plan;
        const CreatedAt = data.CreatedAt;
        // console.log(mealPlan);
        return { mealPlan, CreatedAt };
      } else {
        console.error("Document does not exist");
        return null;
      }
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  },
  getDetails: async function () {
    console.log("getDetails");
    // console.log(this.docSnap)
    this.init();
    try {
      // Get the current state of the document
      if (this.docSnap) {
        const data = this.docSnap.data();
        // console.log(data);
        const Details = data.Details;

        // console.log(mealPlan);
        return { Details };
      } else {
        console.error("Document does not exist");
        return null;
      }
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  },

  getDisplayMealPlan: async function () {
    console.log("getDisplayMealPlan");
    // console.log(this.username)

    this.init();

    try {
      // Get the current state of the document
      if (this.docSnap) {
        const data = this.docSnap.data();
        // console.log(data);
        const DisplayMealPlan = data.DisplayPlan;
        const CreatedAt = data.CreatedAt;
        // console.log(data.Calories);
        return { DisplayMealPlan, CreatedAt };
      } else {
        console.log("Document does not exist");
        return null;
      }
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  },

  getShoppingCart: async function () {
    console.log("getShoppingCart");
    // console.log(this.username)

    this.init();

    try {
      // Get the current state of the document
      if (this.docSnap) {
        const data = this.docSnap.data();
        // console.log(data);
        const shoppingCart = data.shoppingCart;
        const CreatedAt = data.CreatedAt;

        return { shoppingCart, CreatedAt };
      } else {
        console.log("Document does not exist");
        return null;
      }
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  },

  getRemainingCalories: async function () {
    console.log("getCalories");
    // console.log(this.username)

    this.init();

    try {
      // Get the current state of the document
      if (this.docSnap) {
        const data = this.docSnap.data();
        // console.log(data);
        const mealPlan = data.Plan;
        const calories = data.Calories;

        let countMeals = 0;
        for (const day in mealPlan) {
          for (const mealType in mealPlan[day]) {
            countMeals += 1;
          }
        }

        const remainingCal = parseInt(Math.floor((calories / countMeals) * 3));

        return remainingCal;
      } else {
        console.log("Document does not exist");
        return null;
      }
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  },

  createMealplan: async function (
    plan1,
    plan2,
    shoppingCart,
    dayCal,
    formData
  ) {
    console.log("createMealplan");
    await this.init();

    let currCals = parseInt(parseInt(dayCal) * 7);

    try {
      await setDoc(this.docRef, {
        Plan: plan1, // this is for recal
        DisplayPlan: plan2, // this is for display (1 for compeleted, 0 for not completed)
        CreatedAt: Date.now(),
        Completed: {},
        Calories: currCals,
        shoppingCart: shoppingCart,
        Details: formData,
        // allergies: Cookies.get("allergies"),
        // Added: [],
      }).then(() => {
        console.log("Document written");
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  },

  recalMealplan: async function (plan1, plan2, shoppingCart) {
    console.log("recalMealplan");
    await this.init();

    try {
      await updateDoc(this.docRef, {
        Plan: plan1, // this is for recal
        DisplayPlan: plan2, // this is for display (1 for compeleted, 0 for not completed)
        shoppingCart: shoppingCart,
      });
      console.log("Document written");
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  },

  countMealPlansInHistory: async function () {
    const subcollectionRef = collection(this.docRef, "MealPlanHistory");
    const Query = query(subcollectionRef);
    const snapshot = await getDocs(Query);
    return snapshot.size;
  },

  addMealPlanToHistory: async function (plan, username) {
    const count = await this.countMealPlansInHistory(username);

    // Add a new document to the `MealPlanHistory` subcollection with a sequential document ID.
    const docRef = doc(
      db,
      "Food",
      username,
      "MealPlanHistory",
      String(count + 1)
    );
    await setDoc(docRef, {
      Plan: plan,
      CreatedAt: Date.now(),
    });
  },

  updateShoppingCart: async function (shoppingCart) {
    console.log("updateShoppingCart");
    console.log(shoppingCart);
    await this.init();
    try {
      await updateDoc(this.docRef, {
        shoppingCart: shoppingCart,
      });
      console.log("Document written");
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  },

  completeMeal: async function (dayIndex, mealType, food) {
    try {
      // Get the current state of the document

      if (this.docSnap) {
        const data = this.docSnap.data();
        // console.log(data);

        const Completed = data.Completed;
        const Plan = data.Plan;
        const DisplayPlan = data.DisplayPlan;
        let cal = data.Calories;
        let updateCal = 0;

        // Make sure the day exists in the Completed array
        if (Array.isArray(food)) {
          let foodObjectArray = food.map((innerArray, index) => {
            updateCal += innerArray[2];

            return { [`array${index}`]: innerArray };
          });

          food = foodObjectArray; // Replace food with foodObjectArray
          cal -= updateCal;
        } else {
          updateCal += Object.values(food)[0];
          cal -= updateCal;
        }

        if (!Completed?.[dayIndex] || Object.keys(Completed).length == 0) {
          Completed[dayIndex] = {};
        }

        if (Object.values(DisplayPlan[dayIndex][mealType])[0] == 0) {
          const key = Object.keys(DisplayPlan[dayIndex][mealType])[0];
          DisplayPlan[dayIndex][mealType][key] = 1;
        }

        if (
          Plan[dayIndex][mealType] == undefined
          // Completed[dayIndex][mealType] != undefined
        ) {
          alert(`You cant have ${mealType} again`);
          return false;
        } else {
          Completed[dayIndex][mealType] = food;

          delete Plan[dayIndex][mealType];

          await updateDoc(this.docRef, {
            Completed: Completed,
            // MasterCopy: Plan,
            Plan: Plan,
            DisplayPlan: DisplayPlan,
            Calories: cal,
          });

          console.log("Document written");
          return true;
        }
      } else {
        console.error(
          "Document does not exist or Completed field is not an array"
        );
      }
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  },
};
