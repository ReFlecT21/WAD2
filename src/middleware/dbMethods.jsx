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

export const dbMethods = {

    username: auth.currentUser.email,
    docRef: doc(db, "Food", username),
    docSnap: false,

    


    init: async function(){
        if (this.docSnap == false){
            this.docSnap = await getDoc(docRef);
        }
    },


}