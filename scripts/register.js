import { createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { auth, db } from './firebase-config.js';
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const register = async () => {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (password !== confirmPassword) {
        return Swal.fire({
            title: "Missing Information",
            text: "Please fill in all required fields before submitting.",
            icon: "warning",
            iconColor: "#ef4444",
            confirmButtonText: "OK",
            customClass: {
                popup: 'swal-popup-custom',
                title: 'swal-title-custom',
                text: 'swal-text-custom',
                confirmButton: 'swal-confirm-button-custom'
            }
        });
    }

    if (!name || !email || !password) {
        return Swal.fire({
            title: "Missing Information",
            text: "Please fill in all required fields before submitting.",
            icon: "warning",
            iconColor: "#ef4444",
            confirmButtonText: "OK",
            customClass: {
                popup: 'swal-popup-custom',
                title: 'swal-title-custom',
                text: 'swal-text-custom',
                confirmButton: 'swal-confirm-button-custom'
            }
        });
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
        Swal.fire({
            title: "Registration Submitted",
            text: "Your account registration has been received and is awaiting approval.",
            icon: "info",
            confirmButtonText: "OK",
            iconColor: "#facc15",
            customClass: {
                popup: 'swal-popup-custom',
                title: 'swal-title-custom',
                text: 'swal-text-custom',
                confirmButton: 'swal-confirm-button-custom'
            }
        });


    } catch (error) {
        let errorMessage = "An unexpected error occurred. Please try again later.";
        if (error.code === 'auth/email-already-in-use') {
            errorMessage = "This email is already registered. Please use a different email.";
        }
        if (error.code === 'auth/invalid-email') {
            errorMessage = "The email address is not valid. Please enter a valid email.";
        }
        if (error.code === 'auth/weak-password') {
            errorMessage = "The password is too weak. Please choose a stronger password.";
        }
        if (error.code === 'auth/network-request-failed') {
            errorMessage = "Network error. Please check your internet connection and try again.";
        }

        Swal.fire({
            title: "Registration Failed",
            text: errorMessage,
            icon: "error",
            iconColor: "#ef4444",
            confirmButtonText: "OK",
            customClass: {
                popup: 'swal-popup-custom',
                title: 'swal-title-custom',
                text: 'swal-text-custom',
                confirmButton: 'swal-confirm-button-custom'
            }
        });
    }
};

document.getElementById("register-btn").addEventListener("click", register);