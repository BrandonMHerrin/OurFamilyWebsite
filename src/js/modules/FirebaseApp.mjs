import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
const appId = import.meta.env.VITE_FIREBASE_APP_ID;

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: "ourfamily-fff33.firebaseapp.com",
  projectId: "ourfamily-fff33",
  storageBucket: "ourfamily-fff33.appspot.com",
  messagingSenderId: "94100426242",
  appId: appId,
  measurementId: "G-D20T253GHT",
};

export default class FirebaseApp {
  constructor() {
    this.app = initializeApp(firebaseConfig);
  }
}
