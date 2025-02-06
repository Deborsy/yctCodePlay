/*// Disable right-click
document.addEventListener('contextmenu', (event) => event.preventDefault());

// Disable F12 and other dev tools shortcuts
document.addEventListener('keydown', (event) => {
  if (event.key === 'F12' || (event.ctrlKey && event.shiftKey && event.key === 'I')) {
    event.preventDefault();
  }
});
*/

// Firebase SDK Imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

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

// Handle forgot password form submission
document.getElementById('forgotPasswordForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const messageEl = document.getElementById('message');

  try {
    await sendPasswordResetEmail(auth, email);
    messageEl.style.color = 'green';
    messageEl.textContent = "Password reset link sent! Check your email.";
  } catch (error) {
    messageEl.style.color = 'red';
    messageEl.textContent = error.message;
  }
});
