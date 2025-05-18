

import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAvoT9bXv9JjU5qD2i5j3v7Lgwzp8rim1E',
  authDomain: 'minute-learn-6bd33.firebaseapp.com',
  projectId: 'minute-learn-6bd33',
  appId: '1:1037519705766:web:77960c6dcf95fc7824c667',
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const loginWithGoogle = () => signInWithPopup(auth, googleProvider);
export const loginWithEmail = (email, password) => signInWithEmailAndPassword(auth, email, password);
export const registerWithEmail = (email, password) => createUserWithEmailAndPassword(auth, email, password);
export const logout = () => signOut(auth);
export const onAuthChange = (callback) => onAuthStateChanged(auth, callback);
export { auth };
