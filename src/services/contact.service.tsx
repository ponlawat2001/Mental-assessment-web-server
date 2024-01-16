import axios from "axios";
import { contactfindAll, contactupdate } from "@serverinfo/serverinfo";
import { ContactResult } from "@interfaces/contact.interface";

export default class ContactServices {
  static async fecth() {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("jwt"),
      "Content-Type": "application/json",
    };
    try {
      const res = await axios.get(contactfindAll, { headers });
      return res.data["result"];
    } catch (e) {
      localStorage.removeItem("jwt");
      window.location.reload();
      return e;
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
      return res.data["result"];
    } catch (e) {
      localStorage.removeItem("jwt");
      window.location.reload();
      return e;
    }
  }
}
