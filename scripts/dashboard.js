// Import Firebase authentication functions
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { auth} from './firebase-config.js';

// Monitor authentication state - redirect to login if user is not authenticated
onAuthStateChanged(auth, async (user) => {
    if (!user) {
        window.location.href = "index.html";
    } else {
        console.log("User logged in:", user.email);
    }
});

// Handle user logout
const logout = async () => {
    try {
        await signOut(auth);
        window.location.href = "index.html";
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
};

// Track which content section is currently displayed
var currentContent = "dashboard";

// Switch between different content sections in the UI
function showContent(contentId) {
    // Hide current content section
    document.getElementById(currentContent).style.display = "none";
    // Show new content section
    document.getElementById(contentId).style.display = "block";
    // Update navigation styling - remove active class from current nav item
    document.getElementById(currentContent + "-link").className = 'nav-item';
    // Add active class to new nav item
    document.getElementById(contentId + "-link").className = 'nav-item active';
    // Update current content tracker
    currentContent = contentId;
}

// Attach logout handler to logout button
document.getElementById("logout-btn").addEventListener("click", logout);
// Make showContent function globally accessible
window.showContent = showContent;