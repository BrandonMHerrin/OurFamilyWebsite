import { FirebaseAuth } from "../modules/FirebaseAuth.mjs"
import { loadHeaderFooter } from "../modules/utils.mjs";
import { HouseholdMember } from "../modules/HouseholdMember.mjs";
import { hideLoadingIndicator } from "../modules/utils.mjs";
import { createHouseHoldMember, getHouseholdMembersByHousehold } from "../repos/HouseholdMember.repo.mjs";
import renderHouseholdMembersTable from "../partials/household-members-table.mjs";

const householdMemberRecord = new HouseholdMember();
const addMemberForm = document.querySelector("#add-member-form");
const addMemberButton = document.querySelector("#add-member-button");
const insertMemberButton = document.querySelector("#insert-member-button");
let householdMembers = [];

const main = async () => {
    const auth = new FirebaseAuth().auth;
    loadHeaderFooter(auth);
    await householdMemberRecord.init();
    await loadHouseholdMembers();
    registerEventHandlers();
    hideLoadingIndicator();
}

const loadHouseholdMembers = async () => {
    householdMembers = await getHouseholdMembersByHousehold(householdMemberRecord.householdId);
    if (householdMembers.length > 0) {
        const householdMembersDiv = document.querySelector(".household-members");
        householdMembersDiv.innerHTML = "";
        const table = renderHouseholdMembersTable(householdMembers);
        document.querySelector(".household-members").appendChild(table);
    }
}

const registerEventHandlers = () => {
    registerAddMemberHandler();
    registerInsertMemberHandler();
};

const registerAddMemberHandler = () => {
    addMemberButton.addEventListener("click", () => {
        addMemberForm.classList.toggle("hide");
        addMemberForm.classList.add("fade-down");
        addMemberButton.classList.toggle("hide");
    });
}

const registerInsertMemberHandler = () => {
    addMemberForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const member = {
            fname: document.querySelector("#member-fname").value,
            lname: document.querySelector("#member-lname").value,
            role: document.querySelector("#member-role").value,
            householdId: householdMemberRecord.householdId
        }
        await createHouseHoldMember(member);
        addMemberForm.classList.toggle("hide");
        addMemberForm.classList.remove("fade-down");
        addMemberButton.classList.toggle("hide");
        await loadHouseholdMembers();
        resetForm();
    });
}

const resetForm = () => {
    document.querySelector("#member-fname").value = "";
    document.querySelector("#member-lname").value = "";
    document.querySelector("#member-role").value = "";
}

main();