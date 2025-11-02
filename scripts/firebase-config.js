// Import Firebase SDK modules from CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Firebase project configuration object
const firebaseConfig = {
  apiKey: "AIzaSyDzR5XmZIpKo1hgN9M7w8TeluXn31tOS_g",
  authDomain: "manwoodsprefects.firebaseapp.com",
  projectId: "manwoodsprefects",
  storageBucket: "manwoodsprefects.firebasestorage.app",
  messagingSenderId: "207185522957",
  appId: "1:207185522957:web:69559bed1d66e2663c0044",
  measurementId: "G-XP8D4758QE"
};

// Initialize Firebase app with configuration
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication service
const auth = getAuth(app);

// Initialize Firestore database service
const db = getFirestore(app);

// Export auth and db for use in other modules
export { auth, db };