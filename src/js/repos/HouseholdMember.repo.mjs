import { getItemFromStorage } from "../modules/utils.mjs";

let baseUrl = import.meta.env.VITE_BACKEND_URL;
baseUrl += "household-member";

export const getHouseHoldMemberByUser = async () => {
    const user = getItemFromStorage("app-user");
    const res = await fetch(`${baseUrl}?user=${user.uid}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${user.idToken}`
        }
    });

    if (res.ok) {
        const data = await res.json();
        return data;
    } else if (res.status === 404) {
        return null;
    }
    throw new Error("Failed to get household member");
};

export const createHouseHoldMember = async (householdMember) => {
    let body = {
        householdMember: householdMember
    }
    body = JSON.stringify(body);
    const user = getItemFromStorage("app-user");
    const res = await fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.idToken}`
        },
        body: body
    });

    if (res.ok) {
        const data = await res.json();
        return data;
    }
    throw new Error("Failed to create household member");
}

export const updateHouseHoldMember = async (memberId, householdMember) => {
    let body = {
        householdMember: householdMember
    }
    body = JSON.stringify(body);
    const user = getItemFromStorage("app-user");
    const res = await fetch(`${baseUrl}/${memberId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.idToken}`,
      },
      body: body,
    });

    if (res.ok) {
        const data = await res.json();
        return data;
    }
    throw new Error("Failed to update household member");
}