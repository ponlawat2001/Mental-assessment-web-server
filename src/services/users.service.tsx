import axios from "axios";
import { usersfindAll } from "@serverinfo/serverinfo";

export default class UsersService {
  static async fetch() {
    // Check if data is already in local storage
    const cachedData = localStorage.getItem("usersData");
    if (cachedData) {
      // Use type assertion to cast to the appropriate type
      return JSON.parse(cachedData); // Replace YourDataType with the actual type of your data
    }

    const headers = {
      Authorization: "Bearer " + localStorage.getItem("jwt"),
      "Content-Type": "application/json",
    };

    try {
      const res = await axios.get(usersfindAll, { headers });
      const data = res.data["result"];

      // Cache data in local storage
      localStorage.setItem("usersData", JSON.stringify(data));

      return data;
    } catch (e) {
      localStorage.removeItem("jwt");
      window.location.reload();
      throw e; // rethrow the error after handling local storage
    }
  }
}
