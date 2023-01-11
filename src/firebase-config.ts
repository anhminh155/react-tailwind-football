// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "@firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase, ref } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_xJm6f7CpnmX7qSZN1cTNfvoLQuruGw8",
  authDomain: "football-info-697d6.firebaseapp.com",
  projectId: "football-info-697d6",
  storageBucket: "football-info-697d6.appspot.com",
  messagingSenderId: "146018806721",
  appId: "1:146018806721:web:c5ac137470a47b8450dd40",
  measurementId: "G-CHZ8H5LEJR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// add export
export const auth = getAuth(app);
export const firebaseStorage = getStorage(app);
export const db = getDatabase(app);
export const dbRef = ref(db);
export const analytics = getAnalytics(app);
