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
    this.init();
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

  createMealplan: async function (plan1, plan2, shoppingCart) {
    console.log("createMealplan");
    await this.init();
    // console.log(a == undefined)
    try {
      await setDoc(this.docRef, {
        Plan: plan1, // this is for recal
        DisplayPlan: plan2, // this is for display (1 for compeleted, 0 for not completed)
        CreatedAt: Date.now(),
        Completed: {},
        Calories: localStorage.getItem("calories") * 7,
        shoppingCart: shoppingCart,
        // Added: [],
      }).then(() => {
        console.log("Document written");
        // this.addMealPlanToHistory(plan1, username);
        // addMealPLanToHistory only when 7 days is up , sends completed & added calories to addMealPLanToHistory
        // navigate("/home");
      });
    } catch (e) {
      console.error("Error adding document: ", e);
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

        // console.log(Plan);
        // console.log(Object.values(DisplayPlan[dayIndex].breakfast)[0]);

        // Make sure the day exists in the Completed array
        if (Array.isArray(food)) {
          // Convert food into an array of objects and add the 3rd element of every inner array to updateCal
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

        if (Object.keys(Completed).length == 0) {
          Completed[dayIndex] = {};
          console.log(Completed);
        }
        if (Object.values(DisplayPlan[dayIndex][mealType])[0] == 0) {
          const key = Object.keys(DisplayPlan[dayIndex][mealType])[0];
          DisplayPlan[dayIndex][mealType][key] = 1;
        }
        // if (
        //     Completed[dayIndex].breakfast &&
        //     Completed[dayIndex].lunch &&
        //     Completed[dayIndex].dinner
        // ) {
        //     // setDayIndex((prevDayIndex) => {
        //     //   const newDayIndex = prevDayIndex + 1;
        //     //   Completed[newDayIndex] = {};
        //     //   Completed[newDayIndex][mealType] = food;
        //     //   return newDayIndex;
        //     // });
        //     // console.log(Completed);
        //     // should use formula instead of hardcoding
        // } else {

        // console.log(Completed);
        // console.log(Plan);

        if (
          Completed[dayIndex][mealType] ||
          Plan[dayIndex][mealType] == undefined
        ) {
          // console.log(dayIndex);
          // console.log(JSON.stringify(Completed, null, 2));
          alert(`you cant have ${mealType} again`);
          return false;
        } else {
          Completed[dayIndex][mealType] = food;

          // console.log(JSON.stringify(Completed, null, 2));
          // Update the document in Firestore

          delete Plan[dayIndex][mealType];

          await updateDoc(this.docRef, {
            Completed: Completed,
            Plan: Plan,
            DisplayPlan: DisplayPlan,
            Calories: cal,
          });

          console.log("Document written");
          return true;

          // return {DisplayMealPlan, CreatedAt};
        }
        // }
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
