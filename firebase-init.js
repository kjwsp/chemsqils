// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAcjBwmLaQKa_M5lfD5GEbHEpo92SBMhnc",
  authDomain: "chemsqils.firebaseapp.com",
  projectId: "chemsqils",
  storageBucket: "chemsqils.firebasestorage.app",
  messagingSenderId: "18672723663",
  appId: "1:18672723663:web:47e4c8e5d65bd5575579ba",
  measurementId: "G-2FLW92DPSY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);