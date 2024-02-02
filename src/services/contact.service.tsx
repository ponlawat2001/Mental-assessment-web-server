import axios from "axios";
import { contactfindAll, contactupdate } from "@serverinfo/serverinfo";
import { ContactResult } from "@interfaces/contact.interface";

export default class ContactServices {
  static async fetch(): Promise<ContactResult[]> {
    // Check if data is already in local storage
    const cachedData = localStorage.getItem("contactData");
    if (cachedData) {
      // Use type assertion to cast to ContactResult[]
      return JSON.parse(cachedData) as ContactResult[];
    }

    const headers = {
      Authorization: "Bearer " + localStorage.getItem("jwt"),
      "Content-Type": "application/json",
    };

    try {
      const res = await axios.get(contactfindAll, { headers });
      const data: ContactResult[] = res.data["result"];

      // Cache data in local storage
      localStorage.setItem("contactData", JSON.stringify(data));

      return data;
    } catch (e) {
      localStorage.removeItem("jwt");
      window.location.reload();
      throw e; // rethrow the error after handling local storage
    }
  }

  static async update(data: ContactResult) {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("jwt"),
      "Content-Type": "application/json",
    };
    try {
      const res = await axios.put(`${contactupdate}/${data.id}`, data, {
        headers,
      });

      // Clear the cached data after updating a contact
      localStorage.removeItem("contactData");

      return res.data["result"];
    } catch (e) {
      localStorage.removeItem("jwt");
      window.location.reload();
      throw e; // rethrow the error after handling local storage
    }
  }
}
