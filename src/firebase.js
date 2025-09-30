// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";   // Firestore DB
import { getStorage } from "firebase/storage";       // Firebase Storage
// import { getAuth } from "firebase/auth";          // Optional: only if you need login

const firebaseConfig = {
  apiKey: "AIzaSyB0f9gduwX8ZKJC1QryHDRXqIjulC_1S2Q",
  authDomain: "quizzards2025-ab656.firebaseapp.com",
  projectId: "quizzards2025-ab656",
  storageBucket: "quizzards2025-ab656.appspot.com", // ✅ fixed
  messagingSenderId: "544465618154",
  appId: "1:544465618154:web:2a2998fde3f5da17ca8393",
  measurementId: "G-5J3DZXZ2YT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Analytics is optional; remove for now to avoid errors
// const analytics = getAnalytics(app);

// Export Firebase services
export const db = getFirestore(app);
export const storage = getStorage(app);
// export const auth = getAuth(app); // optional
export default app;
