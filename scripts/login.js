// Import Firebase authentication functions
import { signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { auth } from './firebase-config.js'; 

// Check if user is already logged in - redirect to dashboard if authenticated
onAuthStateChanged(auth, (user) => {
  if (user) {
      window.location.href = "dashboard.html";
  }
});

// Handle user login with email and password
const login = async () => {
    console.log("Hello")
    // Get email and password from input fields
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        // Attempt to sign in with provided credentials
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("Logged in:", userCredential.user);
        // Redirect to dashboard on successful login
        window.location.href = "dashboard.html";
    } catch (error) {
        // Display error message if login fails
        console.error(error);
        alert(error.message);
    }
};

// Attach login handler to login button
document.getElementById("login-btn").addEventListener("click", login);