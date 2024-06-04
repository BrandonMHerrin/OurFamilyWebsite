import { set, update } from "firebase/database";
import { FirebaseAuth } from "../modules/FirebaseAuth.mjs";
import { HouseholdMember } from "../modules/HouseholdMember.mjs";
import { loadHeaderFooter, saveItemToStorage } from "../modules/utils.mjs";
import { createHousehold } from "../repos/household.repo.mjs";
import { updateHouseHoldMember } from "../repos/HouseholdMember.repo.mjs";

const newHouseholdButton = document.querySelector("#new-household-btn");
const joinHouseholdButton = document.querySelector("#join-household-btn");

const newHouseholdForm = document.querySelector("#new-household-form");
const joinHouseholdForm = document.querySelector("#join-household-form");

const householdMemberRecord = new HouseholdMember();

const main = async() => {
    const auth = new FirebaseAuth().auth;
    loadHeaderFooter(auth);
    await householdMemberRecord.init();
    hideLoadingIndicator();
    registerEventHandlers();
}

const hideLoadingIndicator = () => {
    const loadingWrapper = document.querySelector(".loading-wrapper");
    loadingWrapper.classList.toggle("hide");
}

const registerEventHandlers = () => {
    newHouseholdButtonHandler();
    joinHouseholdButtonHandler();
    newHouseholdSubmitFormHandler();
}

const newHouseholdButtonHandler = () => {
    newHouseholdButton.addEventListener("click", () => {
        newHouseholdForm.classList.remove("hide");
        hideFormChooserBtns();
    });
}

const joinHouseholdButtonHandler = () => {
    joinHouseholdButton.addEventListener("click", () => {
        joinHouseholdForm.classList.remove("hide");
        hideFormChooserBtns();
    });
}

const newHouseholdSubmitFormHandler = () => {
    newHouseholdForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        // get household form data
        const household = {
            name: newHouseholdForm.querySelector("#household-name").value
        }
        // Get member form data
        const myMemberRecord =  {
            fname: newHouseholdForm.querySelector("#my-fname").value,
            lname: newHouseholdForm.querySelector("#my-lname").value,
            role: newHouseholdForm.querySelector("#my-role").value
        }
        // create a new household
        try {
            const newHousehold = await createHousehold(household);
            myMemberRecord.householdId = newHousehold.id;
            saveItemToStorage("household", newHousehold);
            // Update householdMember record
            const updatedHouseholdMemberRecord = await updateHouseHoldMember(
              householdMemberRecord.householdMemberId,
              myMemberRecord
            );
            saveItemToStorage("household-member", updatedHouseholdMemberRecord);
            window.location.href = "/pages/household/household-update.html";
        } catch (error) {
            console.error(error);
        }
    });
}

const hideFormChooserBtns = () => {
    newHouseholdButton.classList.add("hide");
    joinHouseholdButton.classList.add("hide");
}

main();