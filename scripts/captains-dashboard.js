// Import Firebase configuration and Firestore functions
import { db } from './firebase-config.js'; // Adjust path to your config file
import { collection, getDocs, doc, updateDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Function to fetch and display all prefects from the database
const displayPrefects = async () => {
    const prefectContainer = document.querySelector('.prefect-container');
    
    try {
        // Get reference to the users collection
        const usersRef = collection(db, 'users');
        
        // Fetch all user documents
        const querySnapshot = await getDocs(usersRef);
        
        // Loop through each user document
        querySnapshot.forEach((docSnapshot) => {
            const userData = docSnapshot.data();
            
            // Only process users with 'prefect' role
            if (userData.role === 'prefect') {
                // Create container div for this prefect
                const prefectDiv = document.createElement('div');
                prefectDiv.className = 'prefect';
                
                // Display prefect's name
                const nameElement = document.createElement('p');
                nameElement.textContent = userData.name;
                prefectDiv.appendChild(nameElement);

                // Only show approve/reject buttons if approval status is pending (null)
                if (userData.approved === null){
                    // Create container for action buttons
                    const buttonsDiv = document.createElement('div');
                    buttonsDiv.className = 'prefect-actions';
                    
                    // Create approve button (tick)
                    const tickButton = document.createElement('button');
                    tickButton.className = 'action-btn tick-btn';
                    tickButton.innerHTML = '✓';

                    // Handle approval - update database and remove buttons
                    tickButton.addEventListener('click', async () => {
                        buttonsDiv.remove();

                        const userDocRef = doc(db, 'users', docSnapshot.id);
                        
                        await updateDoc(userDocRef, {
                            approved: true,
                        });
                    });
                    
                    // Create reject button (cross)
                    const crossButton = document.createElement('button');
                    crossButton.className = 'action-btn cross-btn';
                    crossButton.innerHTML = '✕';
                    
                    // Handle rejection - update database and remove entire prefect card
                    crossButton.addEventListener('click', async () => {
                        prefectDiv.remove();

                        const userDocRef = doc(db, 'users', docSnapshot.id);
                        
                        await updateDoc(userDocRef, {
                            approved: false,
                        });
                    });
                    
                    // Add buttons to container
                    buttonsDiv.appendChild(tickButton);
                    buttonsDiv.appendChild(crossButton);
                    prefectDiv.appendChild(buttonsDiv);
                }  
                
                // Add prefect card to main container
                prefectContainer.appendChild(prefectDiv);
            }
        });
    } catch (error) {
        console.error('Error fetching prefects:', error);
    }
}

// Track which content section is currently visible
var currentContent = "dashboard";

// Function to switch between different content sections in the navigation
function showContent(contentId) {
    // Hide current content section
    document.getElementById(currentContent).style.display = "none";
    
    // Show new content section
    document.getElementById(contentId).style.display = "block";
    
    // Update navigation styling - remove active class from old, add to new
    document.getElementById(currentContent + "-link").className = 'nav-item';
    document.getElementById(contentId + "-link").className = 'nav-item active';
    
    // Update current content tracker
    currentContent = contentId;
}

// Make showContent available globally for onclick handlers
window.showContent = showContent;

// Load prefects when page finishes loading
document.addEventListener('DOMContentLoaded', displayPrefects);