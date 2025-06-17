import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAGTk-7nN38XxxzyYjpMe_S8_-dhe84sfk",
  authDomain: "ics4u-d6034.firebaseapp.com",
  projectId: "ics4u-d6034",
  storageBucket: "ics4u-d6034.firebasestorage.app",
  messagingSenderId: "513965765136",
  appId: "1:513965765136:web:1bc190cde0a2d5c4b61095"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, googleProvider, db };