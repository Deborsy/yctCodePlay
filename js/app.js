// Import Firebase SDK modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword , signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { getFirestore, getDoc,setDoc, doc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

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


document.getElementById('signInForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const messageEl = document.getElementById('message');

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Store the auth token
    user.getIdToken().then(token => {
      sessionStorage.setItem('authToken', token);
    });

    // Redirect to onboarding after successful sign-in
    window.location.href = 'codeplay/onboarding.html';
  } catch (error) {
    messageEl.style.color = 'red';
    messageEl.textContent = 'Invalid email or password. Please try again.';
  }
});


  // Handle Google Sign-In
document.getElementById('googleSignIn').addEventListener('click', async () => {
    const provider = new GoogleAuthProvider();
  
    
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        const userRef = doc(db, 'users', user.uid);
    
        // Check if user already exists in Firestore
        const userSnap = await getDoc(userRef);  // Ensure getDoc is used correctly
    
        if (userSnap.exists()) {
          console.log("User already exists. Proceeding with login...");
        } else {
          console.log("New user. Creating a profile...");
          // Save user data if they are signing in for the first time
          await setDoc(userRef, {
            name: user.displayName,
            email: user.email,
            phoneNumber: user.phoneNumber || 'N/A',
            location: user.location,
            lastLogin: new Date().toISOString()
          });
        }
    
        // Update last login timestamp
        await setDoc(userRef, { lastLogin: new Date().toISOString() }, { merge: true });
    
        // Redirect to the next page after successful sign-in
        window.location.href = 'codeplay/onboarding.html'; // Replace with your target page
      } catch (error) {
        console.error("Error signing in with Google:", error);
        alert("Failed to sign in with Google. Please try again.");
      }
    });
  
  // Facebook sign-in
  document.getElementById('facebookSignIn').addEventListener('click', async () => {
    const provider = new FacebookAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      alert(`Signed in as ${result.user.email}`);
    } catch (error) {
      console.error(error);
    }
  });
  
  // Placeholder for signup (Redirect functionality could be implemented)
  document.getElementById('signUpLink').addEventListener('click', () => {
    alert("Redirecting to signup page...");
  });
  

console.log('Firebase initialized successfully!');