let baseUrl = import.meta.env.VITE_BACKEND_URL;
baseUrl += "/event";

export const createEvent = async (event) => {
    let body = {
        event: event
    }
    body = JSON.stringify(body);
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
    throw new Error("Failed to create event");
}

export const getEventsByHousehold = async (householdId) => {
    const url = `${baseUrl}/all/${householdId}`;
    const res = await fetch(url, {
        method: "GET",
    });

    if (res.ok) {
        const data = await res.json();
        return data;
    }
    if (res.status === 404) {
        return [];
    }
    throw new Error("Failed to get events");
}