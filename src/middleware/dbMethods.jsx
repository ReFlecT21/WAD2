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
    // console.log("setUserData");
    // console.log(data);
    // console.log(allergies);
    await this.init();

    try {
      await setDoc(this.docRef, {
        formInput: data,
        allergies: allergies,
      }).then(() => {
        // console.log("Document written");
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
      return undefined;
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
    // console.log("getCompleted");
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
    // console.log("getMealPlan");
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
    // console.log("getDetails");
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
    // console.log("getDisplayMealPlan");
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
    // console.log("getShoppingCart");
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

  getRemainingCalories: async function (incomingPlan) {
    // console.log("getCalories");
    // console.log(this.username)

    await this.init();


    try {
      // Get the current state of the document
      if (this.docSnap) {
        const data = this.docSnap.data();
        const calories = data.Calories;
        // console.log(mealPlan);
        // console.log(data);
        // console.log(incomingPlan);

        let countMeals = 0;
        for (const day in incomingPlan) {
          for (const mealType in incomingPlan[day]) {
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
  getDayCal: async function () {
    // console.log(this.username)

    await this.init();

    try {
      // Get the current state of the document
      if (this.docSnap) {
        const data = this.docSnap.data();
        // console.log(data);
        const calories = data.DayCal;
        // console.log(mealPlan);

        return calories;
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
        CurrCal: 0,
        DayCal: 0,
      }).then(() => {
        // console.log("Document written");
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  },

  recalMealplan: async function (plan1, plan2, shoppingCart) {
    // console.log("recalMealplan");
    await this.init();

    try {
      await updateDoc(this.docRef, {
        Plan: plan1, // this is for recal
        DisplayPlan: plan2, // this is for display (1 for compeleted, 0 for not completed)
        shoppingCart: shoppingCart,
      });
      // console.log("Document written");
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  },

  countMealPlansInHistory: async function () {
    await this.init();
    try {
      const subcollectionRef = collection(this.docRef, "MealPlanHistory");
      const Query = query(subcollectionRef);
      const snapshot = await getDocs(Query);
      return snapshot.size;
    } catch (e) {
      console.error("Error getting documents: ", e);
      return null; // Return null or some other value to indicate an error occurred
    }
  },

  addMealPlanToHistory: async function () {
    if (!this.docRef) {
      console.log("Document reference does not exist");
      return false; // Return false or some other value to indicate an error occurred
    }

    await this.init();
    const count = await this.countMealPlansInHistory();
    // console.log(count);

    try {
      // Get the current state of the document
      console.log("yes");
      if (this.docSnap) {
        console.log("yes");
        const data = this.docSnap.data();
        const CurrCals = data.CurrCal;
        const Details = data.Details;
        const weight = Details["weight"];
        const Date = data.CreatedAt;
        // console.log(data, CurrCals, Details, weight, Date);
        const docRef = doc(
          db,
          "Food",
          this.username,
          "MealPlanHistory",
          String(count + 1)
        );
        await setDoc(docRef, {
          Cals: CurrCals,
          Weight: weight,
          Date: Date,
        });
        return true; // Return true to indicate the operation was successful
      } else {
        console.log("Document does not exist");
        return false; // Return false or some other value to indicate an error occurred
      }
    } catch (e) {
      console.error("Error updating document: ", e);
      return false; // Return false or some other value to indicate an error occurred
    }
  },

  updateShoppingCart: async function (shoppingCart) {
    // console.log("updateShoppingCart");
    // console.log(shoppingCart);
    await this.init();
    try {
      await updateDoc(this.docRef, {
        shoppingCart: shoppingCart,
      });
      // console.log("Document written");
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  },

  completeMeal: async function (dayIndex, mealType, food) {
    return new Promise(async (resolve, reject) => {
      try {
        // Get the current state of the document

        if (this.docSnap) {
          const data = this.docSnap.data();
          // console.log(data);

          const Completed = data.Completed;
          const Plan = data.Plan;
          const DisplayPlan = data.DisplayPlan;
          let cal = data.Calories;
          let CurrCal = data.CurrCal;
          let DailyCal = data.DayCal;
          let updateCal = 0;

          // Make sure the day exists in the Completed array
          if (Array.isArray(food)) {
            let foodObjectArray = food.map((innerArray) => {
              updateCal += innerArray["calories"] * innerArray["quantity"];

              return innerArray;
            });

            food = foodObjectArray; // Replace food with foodObjectArray
            cal -= updateCal;
            DailyCal += updateCal;
            CurrCal += updateCal;
          } else {
            updateCal += Object.values(food)[0];
            cal -= updateCal;
            CurrCal += updateCal;
            DailyCal += updateCal;
          }

          if (!Completed?.[dayIndex] || Object.keys(Completed).length == 0) {
            Completed[dayIndex] = {};
          }

          if (!DisplayPlan[dayIndex][mealType]) {
            alert(`You cant have ${mealType} again`);
            resolve(false);
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
            resolve(false);
          } else {
            Completed[dayIndex][mealType] = food;

            delete Plan[dayIndex][mealType];
            console.log(dayIndex);
            console.log(Plan[dayIndex]);
            if (dayIndex == 7 && Object.keys(Plan[dayIndex]).length == 0) {
              console.log("yes");
              this.addMealPlanToHistory();
            }
            // console.log(Plan);
            // console.log(DisplayPlan);

            await updateDoc(this.docRef, {
              Completed: Completed,
              // MasterCopy: Plan,
              Plan: Plan,
              DisplayPlan: DisplayPlan,
              Calories: cal,
              DayCal: DailyCal,
              CurrCal: CurrCal,
            }).then(() => {
              // console.log("Document written");
              // return true;
              resolve({ Plan, cal });
            });
          }
        } else {
          console.error(
            "Document does not exist or Completed field is not an array"
          );
        }
      } catch (e) {
        console.error("Error updating document: ", e);
        reject(e);
      }
    });
  },

  checkEnd: async function () {
    await this.init();

    try {
      // Get the current state of the document
      if (this.docSnap) {
        const data = this.docSnap.data();
        const MealPlan = data.Plan;

        if (Object.keys(MealPlan[7]).length === 0) {
          return true;
        } else {
          return false;
        }
      } else {
        console.log("Document does not exist");
      }
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  },

  getAnalytics: async function () {
    const weights = [];
    let startWeight = 0;
    let endWeight = 0;
    const Dates = [];
    let Cals = 0;
    await this.init();
    try {
      const collectionRef = collection(
        db,
        "Food",
        this.username,
        "MealPlanHistory"
      );

      const querySnapshot = await getDocs(collectionRef);

      // Convert the QuerySnapshot to an array of documents
      const docs = querySnapshot.docs;

      // Sort the array by document ID in ascending numerical order
      docs.sort((doc1, doc2) => parseInt(doc1.id) - parseInt(doc2.id));

      // Extract weights from sorted documents
      docs.forEach((doc) => {
        const data = doc.data();
        weights.push(data.Weight);
        Dates.push(data.Date);
        Cals += data.Cals / 7;
      });
      const count = await this.countMealPlansInHistory();
      Cals = Math.floor(Cals / count);
      startWeight = weights[0];
      endWeight = weights[weights.length - 1];
      const diffWeight = startWeight - endWeight;
      return { weights, Dates, Cals, diffWeight };
    } catch (e) {
      console.error("Error getting document: ", e);
    }
  },
  updateDailyCal: async function () {
    await this.init();
    try {
      if (this.docSnap) {
        const data = this.docSnap.data();
        let DailyCal = data.DayCal;
        DailyCal = 0;
        await updateDoc(this.docRef, {
          DayCal: DailyCal,
        });
      }
    } catch (e) {
      console.error("Error", e);
    }
  },
};
