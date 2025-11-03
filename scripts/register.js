import { createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { auth, db } from './firebase-config.js';
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const register = async () => {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    if (!name || !email || !password) {
        alert("Please fill in all fields!");
        return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await updateProfile(user, {
            displayName: name
        });

        await setDoc(doc(db, "users", user.uid), {
            name: name,     
            email: email,
            createdAt: new Date().toISOString(),
            role: "prefect",
            approved: false,
        });

        alert("Registration complete");
        console.log("Registration complete");
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
};

document.getElementById("register-btn").addEventListener("click", register);