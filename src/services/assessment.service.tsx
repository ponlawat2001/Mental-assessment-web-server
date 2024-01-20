import { AssessmentResult } from "@app/interfaces/assessment.interface";
import {
  assessmentfindAll,
  assessmentupdate,
} from "@app/serverinfo/serverinfo";
import axios from "axios";

export default class AssessmentServices {
  static async fecth() {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("jwt"),
      "Content-Type": "application/json",
    };
    try {
      const res = await axios.get(assessmentfindAll, { headers });
      return res.data["result"];
    } catch (e) {
      localStorage.removeItem("jwt");
      window.location.reload();
      return e;
    }
  }

  static async update(data: AssessmentResult) {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("jwt"),
      "Content-Type": "application/json",
    };
    try {
      const res = await axios.put(`${assessmentupdate}/${data.id}`, data, {
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
