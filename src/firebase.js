// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1Nq0THQm5okIUXBsDarXEFHWZ0tMWflM",
  authDomain: "diplomkaled.firebaseapp.com",
  projectId: "diplomkaled",
  storageBucket: "diplomkaled.appspot.com",
  messagingSenderId: "938872799098",
  appId: "1:938872799098:web:cb1ea1f00ec6497dfde0c3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)




export {app,db};
  