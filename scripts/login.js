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
            alert("Your account is pending approval. Please contact a school captain.")
            await signOut(auth);
        }
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
};

document.getElementById("login-btn").addEventListener("click", login);