// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxygQkGdLXrzYnkPQ0GGnj8ZZ_MJX26PI",
  authDomain: "sfm-reference.firebaseapp.com",
  projectId: "sfm-reference",
  storageBucket: "sfm-reference.appspot.com",
  messagingSenderId: "506010704550",
  appId: "1:506010704550:web:4561cad6735b5b108ff267"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;