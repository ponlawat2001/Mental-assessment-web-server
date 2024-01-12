import axios from "axios";
import { newsfindAll, newsupdate } from "../serverinfo/serverinfo";
import { NewsResult } from "../interfaces/news.interface";

export default class NewsService {
  static async fecth() {
    const headers = { Authorization: "Bearer " + localStorage.getItem("jwt") };
    try {
      const res = await axios.get(newsfindAll, { headers });
      return res.data["result"];
    } catch (e) {
      localStorage.removeItem("jwt");
      window.location.reload();
      return e;
    }
  }

  static async update(data: NewsResult) {
    const headers = { Authorization: "Bearer " + localStorage.getItem("jwt") };
    try {
      const res = await axios.put(`${newsupdate}/${data.id}`, data, {
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
