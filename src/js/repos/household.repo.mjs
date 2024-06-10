import { getItemFromStorage } from "../modules/utils.mjs";

let baseUrl = import.meta.env.VITE_BACKEND_URL;
baseUrl += "/household";

export const createHousehold = async (household) => {
    let body = {
        household: household
    }
    body = JSON.stringify(body);
    const user = getItemFromStorage("app-user");
    const res = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${user.idToken}`,
      },
      body: body,
    });

    if (res.ok) {
        const data = await res.json();
        return data;
    }
    throw new Error("Failed to create household");
}

export const getHousehold = async (householdId) => {
    const user = getItemFromStorage("app-user");
    const res = await fetch(`${baseUrl}/${householdId}`, {
        method: "GET",
        // headers: {
        //     Authorization: `Bearer ${user.idToken}`
        // }
    });

    if (res.ok) {
        const data = await res.json();
        return data;
    }
    throw new Error("Failed to get household");
}