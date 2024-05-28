import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { removeStorageItem, saveItemToStorage } from "./utils.mjs";

const googleProvider = new GoogleAuthProvider();

export class FirebaseAuth {
    app;
    auth;
    constructor(app) {
        this.app = app;
        this.auth = getAuth(this.app);
        // this.auth.
    }

    googleLogin() {
        signInWithPopup(this.auth, googleProvider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                const appUser = {
                    email: '',
                    fName: '',
                    lName: ''
                }
                saveItemToStorage("app-user", appUser);
            }).catch((error) => {
                console.error(error);
            })
    }

    logOut() {
        this.auth.signOut()
            .then(() => {
                removeStorageItem('app-user');
                window.location.assign("/pages/login.html");
            }).catch((error) => console.error(error))
    }
}