import { FirebaseAuth } from "../modules/FirebaseAuth.mjs";
import { hideLoadingIndicator, loadHeaderFooter } from "../modules/utils.mjs";
import { HouseholdMember } from "../modules/HouseholdMember.mjs";
import { createEvent, getEventsByHousehold } from "../repos/event.repo.mjs";
import { renderEventsTable } from "../partials/events-calendar.js";

const modalWrapper = document.querySelector(".modal-wrapper");
const modal = document.querySelector(".modal");
const addEventButton = document.querySelector("#add-event-button");
const closeModalButton = document.querySelector(".close-modal-button");
const householdMemberRecord = new HouseholdMember();
let events = [];

const main = async () => {
    const auth = new FirebaseAuth().auth;
    await householdMemberRecord.init();
    loadHeaderFooter(auth);
    await getEvents();
    registerEventHandlers();
    hideLoadingIndicator();
}

const registerEventHandlers = () => {
    // Add event handlers here
    registerAddMemberHandler();
    registerCloseModalHandler();
    registerNewEventHandler();
}

const registerAddMemberHandler = () => {
    addEventButton.addEventListener("click", () => {
        openModal();
    });
}

const registerCloseModalHandler = () => {
    closeModalButton.addEventListener("click", () => {
        closeModal();
    });
}

const registerNewEventHandler = () => {
    // Add event handler for the form submission
    const form = document.querySelector("#add-event-form");
    form.addEventListener("submit", submitForm);
}

const submitForm = async (e) => {
    // Add form submission logic here
    e.preventDefault();
    const event = {
        title: document.querySelector("#event-title").value,
        date: document.querySelector("#event-date").value,
        time: document.querySelector("#event-time").value,
        duration: document.querySelector("#event-duration").value,
        location: document.querySelector("#event-location").value,
        description: document.querySelector("#event-description").value,
        householdId: householdMemberRecord.householdId
    }
    await createEvent(event);
    await getEvents();
    closeModal();
}

const resetForm = () => {
    // Add logic to reset the form
    const form = document.querySelector("#add-event-form");
    form.reset();
}

const getEvents = async () => {
    // Add logic to get events from the backend
    events = await getEventsByHousehold(householdMemberRecord.householdId);
    renderEventsTable(events);
}

const openModal = () => {
    // Open the modal
    document.body.classList.add("modal-open");
    modalWrapper.classList.remove("hide");
    modal.classList.add("fade-down");
}

const closeModal = () => {
    // Close the modal
    resetForm();
    document.body.classList.remove("modal-open");
    modalWrapper.classList.add("hide");
    modal.classList.remove("fade-down");
}

main();