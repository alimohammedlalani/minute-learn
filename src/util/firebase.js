
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAvoT9bXv9JjU5qD2i5j3v7Lgwzp8rim1E",
  authDomain: "minute-learn-6bd33.firebaseapp.com",
  projectId: "minute-learn-6bd33",
  storageBucket: "minute-learn-6bd33.firebasestorage.app",
  messagingSenderId: "1037519705766",
  appId: "1:1037519705766:web:77960c6dcf95fc7824c667",
  measurementId: "G-KFSW0HBZF7"
};


export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()