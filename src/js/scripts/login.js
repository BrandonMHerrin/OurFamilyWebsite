import FirebaseApp from '../modules/initializeFirebase.mjs';
let app;

const main = () => {
    app = new FirebaseApp();
    registerClickHandlers();
}

const registerClickHandlers = () => {
    registerGoogleClickHandler();
}

const registerGoogleClickHandler = () => {
    const button = document.querySelector('#google-btn');
    button.addEventListener('click', () => app.googleLogin());
}

main();