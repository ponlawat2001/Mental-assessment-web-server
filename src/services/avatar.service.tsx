import axios from "axios";
import { avatarfavorite, avatarfindAll } from "@serverinfo/serverinfo";
import { AvatarResult } from "@app/interfaces/avatar.interface";

export default class AvatarsService {
  static async fetch(): Promise<AvatarResult[]> {
    // Check if data is already in local storage
    const cachedData = localStorage.getItem("avatarData");
    if (cachedData) {
      // Use type assertion to cast to AvatarResult[]
      return JSON.parse(cachedData) as AvatarResult[];
    }

    const headers = {
      Authorization: "Bearer " + localStorage.getItem("jwt"),
      "Content-Type": "application/json",
    };

    try {
      const res = await axios.get(avatarfindAll, { headers });
      const data: AvatarResult[] = res.data["result"];

      // Cache data in local storage
      localStorage.setItem("avatarData", JSON.stringify(data));

      return data;
    } catch (e) {
      localStorage.removeItem("jwt");
      window.location.reload();
      throw e; // rethrow the error after handling local storage
    }
  }

  static async favorite(data: AvatarResult, id: string) {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("jwt"),
      "Content-Type": "application/json",
    };
    try {
      const res = await axios.put(`${avatarfavorite}/${id}`, data, { headers });

      // Clear the cached data after modifying the avatars
      localStorage.removeItem("avatarData");

      return res.data["result"];
    } catch (e) {
      localStorage.removeItem("jwt");
      window.location.reload();
      throw e; // rethrow the error after handling local storage
    }
  }
}
