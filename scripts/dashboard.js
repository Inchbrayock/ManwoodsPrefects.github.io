import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
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
        alert("Error fetching data: ", error);
        return null;
    }
}

onAuthStateChanged(auth, async (user) => {
    if (!user) {
        window.location.href = "index.html";
        return;
    }
    else{
        const userId = user.uid;
        const userData = await getUserData(userId);
        const approved = userData?.approved;
        if (approved === true) {
            console.log("User logged in:", user.email);
        } else {
            window.location.href = "index.html";
        }
    }
});

const logout = async () => {
    try {
        await signOut(auth);
        window.location.href = "index.html";
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
};

var currentContent = "dashboard";

function showContent(contentId) {
    document.getElementById(currentContent).style.display = "none";
    document.getElementById(contentId).style.display = "block";
    document.getElementById(currentContent + "-link").className = 'nav-item';
    document.getElementById(contentId + "-link").className = 'nav-item active';
    currentContent = contentId;
}

document.getElementById("logout-btn").addEventListener("click", logout);
window.showContent = showContent;