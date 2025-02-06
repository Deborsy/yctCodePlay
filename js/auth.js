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
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

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
const db = getFirestore(app);

// Listen for authentication state changes
onAuthStateChanged(auth, async (user) => {
  if (user) {
    console.log("User logged in:", user.email);

    // Store the user token in session storage if needed
    user.getIdToken().then((token) => {
      sessionStorage.setItem("authToken", token);
    });

    // Fetch and display the display name from Firestore i used user.email because i stored the data with email
    await fetchAndDisplayUserName(user.email);
  } else {
    console.log("No user is logged in.");

    // Redirect to the login page if the user isn't authenticated
    if (!window.location.pathname.includes("signin.html")) {
      window.location.href = "/signin.html";
    }
  }
});

// Function to fetch display name from Firestore and update UI
async function fetchAndDisplayUserName(userId) {
  try {
    const userDocRef = doc(db, "users", userId);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const displayName = userDoc.data().name;

      // Show the user's name in the greeting section
      displayUserContent(displayName);
    } else {
      console.error("User document not found in Firestore.");
    }
  } catch (error) {
    console.error("Error fetching user name from Firestore:", error);
  }
}

// Function to display user content on the page
function displayUserContent(displayName, phoneNumber) {
  const userGreeting = document.getElementById("user-greeting");
  if (userGreeting) {
    userGreeting.textContent = `Welcome, ${displayName}`;
  }
}