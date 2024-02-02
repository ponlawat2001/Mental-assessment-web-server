import { AssessmentResult } from "@app/interfaces/assessment.interface";
import {
  assessmentfindAll,
  assessmentupdate,
  assessmentdelete,
  assessmentcreate,
} from "@app/serverinfo/serverinfo";
import axios from "axios";

export default class AssessmentServices {
  static async fetch(): Promise<AssessmentResult[]> {
    // Check if data is already in local storage
    const cachedData = localStorage.getItem("assessmentData");
    if (cachedData) {
      // Use type assertion to cast to AssessmentResult[]
      return JSON.parse(cachedData) as AssessmentResult[];
    }

    const headers = {
      Authorization: "Bearer " + localStorage.getItem("jwt"),
      "Content-Type": "application/json",
    };

    try {
      const res = await axios.get(assessmentfindAll, { headers });
      const data: AssessmentResult[] = res.data["result"];

      // Cache data in local storage
      localStorage.setItem("assessmentData", JSON.stringify(data));

      return data;
    } catch (e) {
      localStorage.removeItem("jwt");
      window.location.reload();
      throw e; // rethrow the error after handling local storage
    }
  }

  static async create(data: AssessmentResult) {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("jwt"),
      "Content-Type": "application/json",
    };
    try {
      const res = await axios.post(`${assessmentcreate}`, data, {
        headers,
      });

      // Clear the cached data after creating a new assessment
      localStorage.removeItem("assessmentData");

      return res.data["result"];
    } catch (e) {
      console.log(e);
      localStorage.removeItem("jwt");
      window.location.reload();
      throw e; // rethrow the error after handling local storage
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

      // Clear the cached data after updating an assessment
      localStorage.removeItem("assessmentData");

      return res.data["result"];
    } catch (e) {
      console.log(e);
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
        `${assessmentdelete}/${id}`,
        {},
        {
          headers,
        }
      );

      // Clear the cached data after deleting an assessment
      localStorage.removeItem("assessmentData");

      return res.data["result"];
    } catch (e) {
      console.log(e);
      localStorage.removeItem("jwt");
      window.location.reload();
      throw e; // rethrow the error after handling local storage
    }
  }
}
