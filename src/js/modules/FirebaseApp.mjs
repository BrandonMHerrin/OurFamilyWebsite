import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
const appId = import.meta.env.VITE_FIREBASE_APP_ID;

const googleProvider = new GoogleAuthProvider();

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
        // this.auth = getAuth(this.app);
    }

    // googleLogin() {
    //     signInWithPopup(this.auth, googleProvider)
    //         .then((result) => {
    //             const credential = GoogleAuthProvider.credentialFromResult(result);
    //             const token = credential.accessToken;

    //             const user = result.user;
    //             console.log(user);
    //         }).catch((error) => {
    //             const errorCode = error.code;
    //             const errorMesssage = error.message;

    //             const email = error.customData.email;

    //             console.error(error);
    //         })
    // }
}