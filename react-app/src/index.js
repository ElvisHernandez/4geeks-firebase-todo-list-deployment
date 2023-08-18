import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { initializeApp } from "firebase/app";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import ContextProvider from "./Context";

const firebaseConfig = {
  apiKey: "AIzaSyAkEmA0nIAfih74-4n-fn-0Zt0nKsikVi8",
  authDomain: "geeks-final-project.firebaseapp.com",
  projectId: "geeks-final-project",
  storageBucket: "geeks-final-project.appspot.com",
  messagingSenderId: "1041999882039",
  appId: "1:1041999882039:web:38ffed413af308009f1cb2",
  measurementId: "G-8KEWZ35NZ2"
};

const app = initializeApp(firebaseConfig);
const functions = getFunctions(app);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
connectFunctionsEmulator(functions, "127.0.0.1", 5001);
connectAuthEmulator(auth, process.env.REACT_APP_FIREBASE_AUTH_HOST);
connectFirestoreEmulator(firestore, process.env.REACT_APP_FIREBASE_FIRESTORE_HOST);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ContextProvider>
    <App />
  </ContextProvider>
);

