import { onAuthStateChanged } from "firebase/auth";
import { headerTemplate } from "../templates/header";

let auth;
let header;
let menu;
let menuButton;
let opened = false;

const unAuthenticatedItems = [
  { icon: "login", menuText: "Login", destination: "/pages/login.html" },
];

const authenticatedMenuItems = [
  {
    icon: "calendar_month",
    menuText: "Calendar",
    destination: "/pages/calendar.html",
  },
  { icon: "logout", menuText: "Logout", destination: "/pages/logout.html" },
];

const menuItemTemplate = ({ icon, menuText, destination }) => `
    <li>
        <a class="flex vertical-center half-gap" href="${destination}">
            <span class="material-symbols-outlined">
                ${icon}
            </span>
            ${menuText}
        </a>
    </li>
`;

const loadMenuItems = (menuItems) => {
  menu = document.querySelector("header .menu");
  const menuItemsHtml = menuItems
    .map((item) => menuItemTemplate(item))
    .join("");
  menu.insertAdjacentHTML("afterbegin", menuItemsHtml);
};

const loadHeader = () => {
  const body = document.body;
  body.insertAdjacentHTML("afterbegin", headerTemplate());
  header = document.querySelector("header");
  registerEventHandlers();
};

const registerEventHandlers = () => {
  menuButton = header.querySelector(".menu-button");
  menuButton.addEventListener("click", () => {
    toggleMenu();
  });
};

const toggleMenu = () => {
  const icon = menuButton.querySelector(".material-symbols-outlined");
  menu.classList.toggle("hide");
  opened = !opened;
  if (opened) icon.textContent = "close"
  else icon.textContent = "menu"
}

export default function main(auth) {
    loadHeader();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            loadMenuItems(authenticatedMenuItems);
        } else {
            loadMenuItems(unAuthenticatedItems);
        }
    })
}
