// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";

import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js"

import {getDatabase, set, ref, update} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Firebase configuration
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
const auth = getAuth(app);
const database = getDatabase(app);

// let buttonSignup = document.getElementById("submit-signup");
// let buttonSignin = document.getElementById("submit-login");

// Signup form event
document.getElementById("signup-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("signup-name").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    
    try {
      await signupUser(name, email, password);
      alert("Signup successful!");
    } catch (error) {
      alert ('Signup failed: ${error.message}');
    }
  });


// buttonSignin.addEventListener("click", (e) => {
//     let emailSignin = document.getElementById("email_signin").value;
//     let passwordSignin = document.getElementById("psw_signin").value;
//     signInWithEmailAndPassword(auth, emailSignin, passwordSignin)
//       .then((userCredential) => {
//         // Signed in
//         const user = userCredential.user;
//         let lgDate = new Date();
//         update(ref(database, "users/" + user.uid), {
//           last_login: lgDate
//         })
//           .then(() => {
//             // Data saved successfully!
//             alert("user telah sukses login");
//           })
//           .catch((error) => {
//             //the write failed
//             alert(error);
//           });
//       })
//       .catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         alert(errorMessage);
//       });
//     signOut(auth)
//       .then(() => {})
//       .catch((error) => {});
//   });