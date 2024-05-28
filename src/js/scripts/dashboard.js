import FirebaseApp from "../modules/FirebaseApp.mjs";
import { FirebaseAuth } from "../modules/FirebaseAuth.mjs";
import { loadHeaderFooter } from "../modules/utils.mjs";

const main = () => {
    const app = new FirebaseApp().app;
    const auth = new FirebaseAuth(app).auth;
    loadHeaderFooter(auth);
    hideLoadingIndicator();
}

const hideLoadingIndicator = () => {
    const loadingWrapper = document.querySelector(".loading-wrapper");
    loadingWrapper.classList.toggle("hide");
}

main();