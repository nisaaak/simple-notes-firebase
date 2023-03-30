import { getDatabase } from "firebase/database";
import 'firebase/auth'
import 'firebase/firestore'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCjtnG61IMk8aVjkdwLBqP-KozXU-bumCU",
    authDomain: "notes-app-6fee8.firebaseapp.com",
    projectId: "notes-app-6fee8",
    storageBucket: "notes-app-6fee8.appspot.com",
    messagingSenderId: "1091279966441",
    appId: "1:1091279966441:web:01de3017adf582273b6078",
    measurementId: "G-CGD22P44WP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const database = getDatabase(app);

export default app