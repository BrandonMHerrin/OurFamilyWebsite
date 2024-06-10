import { getHouseHoldMemberByUser } from "../repos/HouseholdMember.repo.mjs";
import { getCurrentPage, getItemFromStorage } from "./utils.mjs";
import { createHouseHoldMember } from "../repos/HouseholdMember.repo.mjs";

export class HouseholdMember {
  householdMemberId;
  firstName;
  lastName;
  userId;
  isAdmin;
  householdId;
  role;
  constructor() {}

  async init() {
    await this.loadHouseholdMemberRecord();
    this.checkHouseholdId();
  }

  async loadHouseholdMemberRecord() {
    const record = await getHouseHoldMemberByUser();
    if (record) {
      this.setCurrent(record);
    } else {
      await this.create();
    }
  }

  checkHouseholdId() {
    const page = getCurrentPage();
    if (!this.householdId && page !== "household-setup.html") {
      window.location.href = "/pages/household/household-setup.html";
    }
  }

  setCurrent(record) {
    this.householdMemberId = record.id;
    this.firstName = record.fname;
    this.lastName = record.lname;
    this.UserId = record.userId;
    this.isAdmin = record.isAdmin;
    this.householdId = record.householdId;
  }

  hasHousehold() {
    return this.householdId ? true : false;
  }

  create() {
    const appUser = getItemFromStorage("app-user");

    const householdMember = {
      userId: appUser.uid,
    };

    return createHouseHoldMember(householdMember);
  }
}
