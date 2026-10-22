import {getFirestore } from "firebase/firestore";

import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHS6wyZ88jR3pFXf8gTI-iTY0fmhAIzpE",
  authDomain: "fit5032-b02a4.firebaseapp.com",
  projectId: "fit5032-b02a4",
  storageBucket: "fit5032-b02a4.firebasestorage.app",
  messagingSenderId: "581302533529",
  appId: "1:581302533529:web:e74f883fa40cce7b3e2708"
};

initializeApp(firebaseConfig);

const db = getFirestore();
export default db