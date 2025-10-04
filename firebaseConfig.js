import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBQuBEeBhp_KwNlX19tAYKr5Sv4tIQaYtM",
  authDomain: "manmohna-1682c.firebaseapp.com",
  projectId: "manmohna-1682c",
  storageBucket: "manmohna-1682c.firebasestorage.app",
  messagingSenderId: "6133420283",
  appId: "1:6133420283:web:900e8fb02e3f38fa96605e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth + Provider setup
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider()