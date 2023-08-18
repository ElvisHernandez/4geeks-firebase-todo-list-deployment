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
  apiKey: "AIzaSyB1UJSTIdYzKDgayNSRWMlVc_6i6J04Krg",
  authDomain: "geeks-firebase-72e6d.firebaseapp.com",
  projectId: "geeks-firebase-72e6d",
  storageBucket: "geeks-firebase-72e6d.appspot.com",
  messagingSenderId: "161315790364",
  appId: "1:161315790364:web:08d050f50f2f75a97149d9",
  measurementId: "G-ZCNEK8BRJL",
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

