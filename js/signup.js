/*// Disable right-click
document.addEventListener('contextmenu', (event) => event.preventDefault());

// Disable F12 and other dev tools shortcuts
document.addEventListener('keydown', (event) => {
  if (event.key === 'F12' || (event.ctrlKey && event.shiftKey && event.key === 'I')) {
    event.preventDefault();
  }
});
*/

// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

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

// Handle Email/Password Sign-Up
document.getElementById('signUpForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const name = document.getElementById('name').value; // User's name input field
  const countryCode = document.getElementById('country-code').value;
  const phoneNumber = document.getElementById('phone-number').value;
  const messageEl = document.getElementById('message');

  if (!/^\d{10}$/.test(phoneNumber)) {
    document.getElementById('message').textContent = "Please enter a valid 10-digit phone number.";
    return;
  }
  

  try {
    const fullPhoneNumber = `${countryCode}${phoneNumber}`;

    // Check if email already exists in Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save user data to Firestore
    const userRef = doc(db, 'users', email); // Use email as the document ID

    await setDoc(userRef, {
      email: user.email,
      name: name, // Saving user-provided name
      password: password, //saving user-provided passowrd
      phoneNumber: fullPhoneNumber || 'N/A', // If phone number is not provided, set default to 'N/A'\
      lastLogin: new Date().toISOString()
    });

    // Redirect to onboarding page after successful sign-up
    window.location.href = 'codeplay/onboarding.html'; // Replace with your target page
  } catch (error) {
    messageEl.style.color = 'red';
    messageEl.textContent = error.message;
  }
});



