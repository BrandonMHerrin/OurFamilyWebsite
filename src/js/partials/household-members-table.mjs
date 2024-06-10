import { capitalizeWords } from "../modules/utils.mjs";

const renderHouseholdMembersTable = (householdMembers) => {
  const table = document.createElement('table');
  table.classList.add('table');
  table.innerHTML = `
    <thead>
      <tr>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Relationship</th>
      </tr>
    </thead>
    <tbody>
      ${householdMembers
        .map(
          (member) => `
        <tr>
          <td>${member.fname}</td>
          <td>${member.lname}</td>\
          <td>${capitalizeWords(member.role)}</td>
        </tr>
      `
        )
        .join("")}
    </tbody>
  `;
  return table;
}

export default renderHouseholdMembersTable;