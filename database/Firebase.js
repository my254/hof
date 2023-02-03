// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwLF8xvkcUZ9NlzV6d6HqDXwssyIUrKK0",
  authDomain: "e-commerce-148c0.firebaseapp.com",
  projectId: "e-commerce-148c0",
  storageBucket: "e-commerce-148c0.appspot.com",
  messagingSenderId: "717525431406",
  appId: "1:717525431406:web:c81d22b41b85967ac7a27f",
  measurementId: "G-5TNP1QLX35"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app