// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD6uXcgOQCWdL2QAwN5DyatiIQldeaihaw",
  authDomain: "menumate-11770.firebaseapp.com",
  projectId: "menumate-11770",
  storageBucket: "menumate-11770.appspot.com",
  messagingSenderId: "845937769684",
  appId: "1:845937769684:web:56453ca9a58fbe4a674f41",
  measurementId: "G-EDF8JL04TZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
