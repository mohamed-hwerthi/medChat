import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";
// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAq8mMq6P78h1ztwc9sYEH9Hd3mSZbBS4k",
  authDomain: "medchat-91f35.firebaseapp.com",
  projectId: "medchat-91f35",
  storageBucket: "medchat-91f35.appspot.com",
  messagingSenderId: "204461821233",
  appId: "1:204461821233:web:472ca9f36fc8d65f34f410",
  measurementId: "G-22BJVM582J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const firebaseDB = getFirestore(app);
export const usersRef = collection(firebaseDB, "users");
export const meetingsRef = collection(firebaseDB, "meetings");
