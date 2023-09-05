// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTkRTU1yRQPtLd1ONmv5zX4xZTtfQ8qu8",
  authDomain: "final-project-c2ed2.firebaseapp.com",
  projectId: "final-project-c2ed2",
  storageBucket: "final-project-c2ed2.appspot.com",
  messagingSenderId: "443439260435",
  appId: "1:443439260435:web:0a52bb449b5f97246a70e6",
  measurementId: "G-VR163J7JV5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app)