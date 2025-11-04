// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Your Firebase config (keep your own values)
const firebaseConfig = {
  apiKey: "AIzaSyAAy8uXyfI0cXB_MwZRXo_NS5mJTgxME2Q",
  authDomain: "al-noor-edtech.firebaseapp.com",
  databaseURL: "https://al-noor-edtech-default-rtdb.firebaseio.com",
  projectId: "al-noor-edtech",
  storageBucket: "al-noor-edtech.firebasestorage.app",
  messagingSenderId: "1044546709321",
  appId: "1:1044546709321:web:6f2a5aa38dd64ae9cf5c98",
  measurementId: "G-PL1EDN2R52"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export auth and db for other files
export const auth = getAuth(app);
export const db = getDatabase(app);
