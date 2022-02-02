import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  connectAuthEmulator } from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyBBzBtMBI81e9rqiI45aaTlhENnmbyhngM",
  authDomain: "early-bird-coffee-finder.firebaseapp.com",
  projectId: "early-bird-coffee-finder",
  storageBucket: "early-bird-coffee-finder.appspot.com",
  messagingSenderId: "842528393520",
  appId: "1:842528393520:web:4d2d1835f6fdb36abba0f5",
  measurementId: "G-ZJ9R4ZTE4M"
};

const fireApp = initializeApp(firebaseConfig);
const auth = getAuth(fireApp);
connectAuthEmulator(auth, "http://localhost:9099");

const loginEmailPassword = async () => {
  const loginEmail = txtEmail.value;
  const loginPassword = txtPassword.value;
  const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
  // console.log(userCredential.user);
}

// btn.Login.addEventListener("click", loginEmailPassword)

onAuthStateChanged(auth, user => {
  if (user != null) {
    console.log('logged in')
  } else {
    console.log('no user')
  }
});


ReactDOM.render(<App />, document.getElementById('app'));
