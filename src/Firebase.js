// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCTphv3uIwivhfoqOHFE5hpGih9kpde9Bs",
  authDomain: "suchify-78f86.firebaseapp.com",
  projectId: "suchify-78f86",
  storageBucket: "suchify-78f86.appspot.com",
  messagingSenderId: "18437344214",
  appId: "1:18437344214:web:536f28b58ae1016ef3b277",
  measurementId: "G-D814CHR7NT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
