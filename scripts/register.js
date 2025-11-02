// Import Firebase authentication and Firestore functions
import { createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { auth, db } from './firebase-config.js';
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Handle new user registration
const register = async () => {
    // Get form input values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    // Validate that passwords match
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    // Validate that all fields are filled
    if (!name || !email || !password) {
        alert("Please fill in all fields!");
        return;
    }

    try {
        // Create new user account in Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Update user's display name in Firebase Auth profile
        await updateProfile(user, {
            displayName: name
        });

        // Store additional user data in Firestore database
        await setDoc(doc(db, "users", user.uid), {
            name: name,
            email: email,
            createdAt: new Date().toISOString(),
            role: "prefect"
        });

        // Registration successful - redirect to dashboard
        console.log("Registration complete");
        window.location.href = "dashboard.html";
    } catch (error) {
        // Display error message if registration fails
        console.error(error);
        alert(error.message);
    }
};

// Attach registration handler to register button
document.getElementById("register-btn").addEventListener("click", register);