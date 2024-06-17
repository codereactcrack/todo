// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7nAWNybxDamZGxOmati6MSqqzoTke6-E",
  authDomain: "todo-616df.firebaseapp.com",
  projectId: "todo-616df",
  storageBucket: "todo-616df.appspot.com",
  messagingSenderId: "980252203965",
  appId: "1:980252203965:web:a30327650a1795d46f10d4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider(auth);
const db = getFirestore(app);

export {auth,googleProvider,db}
