

export const renderEventsTable = (events) => {
    const eventsTable = document.getElementById("events-table");
    eventsTable.innerHTML = "";
    const table = document.createElement("table");
    table.classList.add("table");
    table.innerHTML = `
        <thead>
            <tr>
                <th>Title</th>
                <th>Date</th>
                <th>Time</th>
                <th>Duration</th>
                <th>Location</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>
            ${events
                .map(
                    (event) => `
                <tr>
                    <td>${event.title}</td>
                    <td>${event.date}</td>
                    <td>${event.time}</td>
                    <td>${event.duration}</td>
                    <td>${event.location}</td>
                    <td>${event.description}</td>
                </tr>
            `
                )
                .join("")}
        </tbody>
    `;
    eventsTable.appendChild(table);
}