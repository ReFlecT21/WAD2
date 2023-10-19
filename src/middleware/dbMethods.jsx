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




    init: async function(){
        if (this.docSnap == false){
            this.docSnap = await getDoc(docRef);
            this.username = auth.currentUser.email;
            this.docRef = doc(db, "Food", username);
        }
    },


}