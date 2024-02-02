import axios from "axios";
import {
  newscreate,
  newsdelete,
  newsfindAll,
  newsupdate,
} from "@serverinfo/serverinfo";
import { NewsResult } from "@interfaces/news.interface";

export default class NewsService {
  static async fetch(): Promise<NewsResult[]> {
    // Check if data is already in local storage
    const cachedData = localStorage.getItem("newsData");
    if (cachedData) {
      // Use type assertion to cast to NewsResult[]
      return JSON.parse(cachedData) as NewsResult[];
    }

    const headers = {
      Authorization: "Bearer " + localStorage.getItem("jwt"),
      "Content-Type": "application/json",
    };

    try {
      const res = await axios.get(newsfindAll, { headers });
      const data: NewsResult[] = res.data["result"];

      // Cache data in local storage
      localStorage.setItem("newsData", JSON.stringify(data));

      return data;
    } catch (e) {
      localStorage.removeItem("jwt");
      window.location.reload();
      throw e; // rethrow the error after handling local storage
    }
  }

  static async update(data: NewsResult) {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("jwt"),
      "Content-Type": "application/json",
    };
    try {
      const res = await axios.put(`${newsupdate}/${data.id}`, data, {
        headers,
      });

      // Clear the cached data after updating news
      localStorage.removeItem("newsData");

      return res.data["result"];
    } catch (e) {
      localStorage.removeItem("jwt");
      window.location.reload();
      throw e; // rethrow the error after handling local storage
    }
  }

  static async create(data: NewsResult) {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("jwt"),
      "Content-Type": "application/json",
    };
    try {
      const res = await axios.post(newscreate, data, {
        headers,
      });

      // Clear the cached data after creating news
      localStorage.removeItem("newsData");

      return res.data["result"];
    } catch (e) {
      localStorage.removeItem("jwt");
      window.location.reload();
      throw e; // rethrow the error after handling local storage
    }
  }

  static async delete(id: string) {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("jwt"),
      "Content-Type": "application/json",
    };
    try {
      const res = await axios.put(
        `${newsdelete}/${id}`,
        {},
        {
          headers,
        }
      );

      // Clear the cached data after deleting news
      localStorage.removeItem("newsData");

      return res.data["result"];
    } catch (e) {
      localStorage.removeItem("jwt");
      window.location.reload();
      throw e; // rethrow the error after handling local storage
    }
  }
}
