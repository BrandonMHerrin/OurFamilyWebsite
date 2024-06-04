import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { removeStorageItem, saveItemToStorage } from "./utils.mjs";
import FirebaseApp from "./FirebaseApp.mjs";

const googleProvider = new GoogleAuthProvider();

export class FirebaseAuth {
    app;
    auth;
    constructor() {
        this.app = new FirebaseApp().app;
        this.auth = getAuth(this.app);
    }

    googleLogin() {
        signInWithPopup(this.auth, googleProvider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                const appUser = {
                    displayName: user.displayName,
                    email: user.email,
                    accessToken: token,
                    idToken: credential.idToken,
                    uid: user.uid
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