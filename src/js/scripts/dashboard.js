import FirebaseApp from "../modules/FirebaseApp.mjs";
import { FirebaseAuth } from "../modules/FirebaseAuth.mjs";
import { HouseholdMember } from "../modules/HouseholdMember.mjs";
import { loadHeaderFooter } from "../modules/utils.mjs";

const main = async () => {
    const auth = new FirebaseAuth().auth;
    loadHeaderFooter(auth);
    const householdMemberRecord = new HouseholdMember();
    await householdMemberRecord.init();
    hideLoadingIndicator();
}

const hideLoadingIndicator = () => {
    const loadingWrapper = document.querySelector(".loading-wrapper");
    loadingWrapper.classList.toggle("hide");
}

main();