import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { auth, db } from './firebase-config.js'; 
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const getUserData = async (userId) =>{
    try{
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()){
            return docSnap.data();
        }
        else{
            return null;
        }
    }
    catch (error){
        console.log("Error when fetching user data: ", error);
        return null;
    }
}

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const userId = user.uid;
    try{
        const userData = await getUserData(userId);
        const approved = userData?.approved;
        if (approved === true){
            window.location.href = "dashboard.html";
        }
        else{
            console.log("User has not been approved for access")
        }
    }
    catch (error){
        console.log("Error when fetching data: ", error)
    }

  }
});

const login = async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
        return Swal.fire({
            title: "Missing Information",
            text: "Please enter both your email and password to sign in.",
            icon: "warning",
            iconColor: "#facc15",
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
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const userId = user.uid;
        const userData = await getUserData(userId)
        const approved = userData?.approved
        if(approved === true){
            window.location.href = "dashboard.html";
        }
        else{
            Swal.fire({
                title: "Your account is pending approval.",
                text: "Please contact a school captain.",
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
            await signOut(auth);
        }
    } catch (error) {
        let errorMessage = "An unexpected error occurred. Please try again later.";
        if (error.code === 'auth/invalid-email') {
            errorMessage = "The email address is not valid. Please enter a valid email.";
        }
        if (error.code === 'auth/user-not-found') {
            errorMessage = "No account found with this email. Please check your credentials or register first.";
        }
        if (error.code === 'auth/wrong-password') {
            errorMessage = "Incorrect password. Please try again.";
        }
        if (error.code === 'auth/too-many-requests') {
            errorMessage = "Too many failed attempts. Please wait a few minutes and try again.";
        }
        if (error.code === 'auth/network-request-failed') {
            errorMessage = "Network error. Please check your internet connection and try again.";
        }
        Swal.fire({
            title: "Sign-In Failed",
            text: errorMessage,
            icon: "error",
            iconColor: "#facc15",
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

document.getElementById("login-btn").addEventListener("click", login);