// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCVSBse0H1SqCFZzD6lfPFAsp1rV7233E8",
  authDomain: "wad2-395904.firebaseapp.com",
  projectId: "wad2-395904",
  storageBucket: "wad2-395904.appspot.com",
  messagingSenderId: "1024763839713",
  appId: "1:1024763839713:web:a18fec5d8232feae6a63a0",
  measurementId: "G-XTX6FRL1KB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
export const auth = getAuth(app);
export { app, db };
