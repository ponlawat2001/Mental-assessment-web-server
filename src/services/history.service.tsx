import { HistoryResult } from "@app/interfaces/history.interface";
import { historyfindAll } from "@app/serverinfo/serverinfo";
import axios from "axios";

export default class HistoryService {
  static async fetch() {
    // Check if data is already in local storage
    const cachedData = localStorage.getItem("historyData");
    if (cachedData) {
      return JSON.parse(cachedData) as HistoryResult[];
    }

    const headers = {
      Authorization: "Bearer " + localStorage.getItem("jwt"),
      "Content-Type": "application/json",
    };

    try {
      const res = await axios.get(historyfindAll, { headers });
      const data = res.data["result"];

      // Cache data in local storage
      localStorage.setItem("historyData", JSON.stringify(data));

      return data;
    } catch (e) {
      localStorage.removeItem("jwt");
      window.location.reload();
      return e;
    }
  }
}
