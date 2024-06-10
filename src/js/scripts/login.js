
import { onAuthStateChanged } from 'firebase/auth';
import { FirebaseAuth } from '../modules/FirebaseAuth.mjs';
import { getItemFromStorage, loadHeaderFooter } from '../modules/utils.mjs';
let auth;
let appUser;

const main = () => {
    auth = new FirebaseAuth();
    appUser = getItemFromStorage("app-user");
    loadHeaderFooter(auth.auth);
    onAuthStateChanged(auth.auth, (user) => {
        hideLoadingIndicator();
    });
    registerClickHandlers();
}

const hideLoadingIndicator = () => {
    const loadingWrapper = document.querySelector(".loading-wrapper");
    loadingWrapper.classList.toggle("hide");
}

const registerClickHandlers = () => {
    registerGoogleClickHandler();
}

const registerGoogleClickHandler = () => {
    const button = document.querySelector('#google-btn');
    button.addEventListener('click', () => auth.googleLogin());
}

main();