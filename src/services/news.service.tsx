import axios from "axios";
import { newsfindAll } from "../serverinfo/serverinfo";

export default class NewsService {
  static async fecth() {
    const headers = { Authorization: "Bearer " + localStorage.getItem("jwt") };
    try {
      const res = await axios.get(newsfindAll, { headers });
      return res.data["result"];
    } catch (e) {
      localStorage.removeItem("jwt");
      return e;
    }
  }
}
