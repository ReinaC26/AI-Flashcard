// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvpzxSdXioQ4U4wmp4S5KaOlHdxq4pv1A",
  authDomain: "flashcardsaas-58bed.firebaseapp.com",
  projectId: "flashcardsaas-58bed",
  storageBucket: "flashcardsaas-58bed.appspot.com",
  messagingSenderId: "1063107492429",
  appId: "1:1063107492429:web:a84a797fe5de11a67dfa04",
  measurementId: "G-91CDMFHQYN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db}