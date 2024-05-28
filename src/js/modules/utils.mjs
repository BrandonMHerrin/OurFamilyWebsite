import { loadFooter } from "../partials/footer.mjs";
import loadHeader from "../partials/header.mjs";

export const loadHeaderFooter = (auth) => {
    loadFooter();
    loadHeader(auth);
}

export const getItemFromStorage = (key) => JSON.parse(localStorage.getItem(key))

export const saveItemToStorage = (key, item) =>
  localStorage.setItem(key, JSON.stringify(item));

export const removeStorageItem = (key) => localStorage.removeItem(key);