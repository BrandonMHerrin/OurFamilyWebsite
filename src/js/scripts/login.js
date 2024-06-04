
import { onAuthStateChanged } from 'firebase/auth';
import FirebaseApp from '../modules/FirebaseApp.mjs';
import { FirebaseAuth } from '../modules/FirebaseAuth.mjs';
import { getItemFromStorage, loadHeaderFooter } from '../modules/utils.mjs';
import { loadFooter } from '../partials/footer.mjs';
let app;
let auth;
let appUser;

const main = () => {
    app = new FirebaseApp().app;
    auth = new FirebaseAuth(app);
    appUser = getItemFromStorage("app-user");
    loadHeaderFooter(auth.auth);
    onAuthStateChanged(auth.auth, (user) => {
        console.log(user);
        if (user, appUser) redirectToDashboard();
        else hideLoadingIndicator();
    });
    registerClickHandlers();
}

const hideLoadingIndicator = () => {
    const loadingWrapper = document.querySelector(".loading-wrapper");
    loadingWrapper.classList.toggle("hide");
}

const redirectToDashboard = () => {
    window.location.assign("/pages/dashboard.html");
}

const registerClickHandlers = () => {
    registerGoogleClickHandler();
}

const registerGoogleClickHandler = () => {
    const button = document.querySelector('#google-btn');
    button.addEventListener('click', () => auth.googleLogin());
}

main();