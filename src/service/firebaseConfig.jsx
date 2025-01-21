// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Correct import for Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "plango-project.firebaseapp.com",
    projectId: "plango-project",
    storageBucket: "plango-project.firebaseapp.com",
    messagingSenderId: "996345226669",
    appId: "1:996345226669:web:2bd8b98a703fce2e13ad24"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app); // Corrected function name
