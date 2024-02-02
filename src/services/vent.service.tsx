import axios from "axios";
import { audiofindAdmin, ventfindAll } from "@serverinfo/serverinfo";

export default class VentService {
  static async fetch(): Promise<any[]> {
    // Check if data is already in local storage
    const cachedData = localStorage.getItem("ventData");
    if (cachedData) {
      // Use type assertion to cast to any[]
      return JSON.parse(cachedData) as any[];
    }

    const headers = {
      Authorization: "Bearer " + localStorage.getItem("jwt"),
      "Content-Type": "application/json",
    };

    try {
      const res = await axios.get(ventfindAll, { headers });
      const data: any[] = res.data["result"];

      // Cache data in local storage
      localStorage.setItem("ventData", JSON.stringify(data));

      return data;
    } catch (e) {
      localStorage.removeItem("jwt");
      window.location.reload();
      throw e; // rethrow the error after handling local storage
    }
  }

  static async audiofetch(): Promise<any[]> {
    // Check if data is already in local storage
    const cachedData = localStorage.getItem("audioData");
    if (cachedData) {
      // Use type assertion to cast to any[]
      return JSON.parse(cachedData) as any[];
    }

    const headers = {
      Authorization: "Bearer " + localStorage.getItem("jwt"),
      "Content-Type": "application/json",
    };

    try {
      const res = await axios.get(audiofindAdmin, { headers });
      const data: any[] = res.data["result"];

      // Cache data in local storage
      localStorage.setItem("audioData", JSON.stringify(data));

      return data;
    } catch (e) {
      localStorage.removeItem("jwt");
      window.location.reload();
      throw e; // rethrow the error after handling local storage
    }
  }
}
