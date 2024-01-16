import axios from "axios";
import { usersfindAll } from "@serverinfo/serverinfo";

export default class UsersService {
  static async fecth() {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("jwt"),
      "Content-Type": "application/json",
    };
    try {
      const res = await axios.get(usersfindAll, { headers });
      return res.data["result"];
    } catch (e) {
      localStorage.removeItem("jwt");
      window.location.reload();
      return e;
    }
  }
}
