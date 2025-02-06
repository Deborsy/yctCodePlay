/*// Disable right-click
document.addEventListener('contextmenu', (event) => event.preventDefault());

// Disable F12 and other dev tools shortcuts
document.addEventListener('keydown', (event) => {
  if (event.key === 'F12' || (event.ctrlKey && event.shiftKey && event.key === 'I')) {
    event.preventDefault();
  }
});
*/

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBegyiOIW8dII64mC71o3NhGqFaBb3N9fo",
    authDomain: "yctcodeplay.firebaseapp.com",
    projectId: "yctcodeplay",
    storageBucket: "yctcodeplay.firebasestorage.app",
    messagingSenderId: "614292284327",
    appId: "1:614292284327:web:6d38df8b281221be57cc82"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Logout function for use in navigation or buttons
export async function handleLogout() {
    try {
      await signOut(auth);
      sessionStorage.clear(); // Clear session storage
      window.location.href = "/signin.html"; // Redirect to login
    } catch (error) {
      console.error("Error logging out:", error);
    }
}

document.getElementById("logout-btn").addEventListener('click', handleLogout);

