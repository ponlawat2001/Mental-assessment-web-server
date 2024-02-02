import axios, { AxiosResponse } from "axios";
import {
  admincreate,
  admindelete,
  adminfindAll,
  adminfindEmail,
  login,
  reset,
  usersCreate,
} from "@serverinfo/serverinfo";

export default class AuthServices {
  static async Resetpassword(email: string) {
    try {
      const res = await axios.post(reset, {
        email: email,
      });
      console.log(res.data);
      return res.data;
    } catch (e) {
      return e;
    }
  }

  static async createUser(email: string, password: string) {
    try {
      const res = await axios.post(usersCreate, {
        email: email,
        password: password,
      });
      return res.data["message"];
    } catch (e) {
      return e;
    }
  }

  static async Login(email: string, password: string, props: any) {
    return axios
      .post(login, {
        email: email,
        password: password,
      })
      .then((res: AxiosResponse<any, any>) => {
        localStorage.setItem("jwt", res.data["result"]);
        props.tokenonchange(localStorage.getItem("jwt"));
        console.log(res.data);
        return res.data["result"];
      })
      .catch((e) => {
        return e;
      });
  }

  static async findEmail(email: string) {
    // Check if data is already in local storage
    const cachedData = localStorage.getItem("adminEmailData");
    if (cachedData) {
      // Use type assertion to cast to any
      return JSON.parse(cachedData) as any;
    }

    return axios
      .get(`${adminfindEmail}/${email}`)
      .then((res: AxiosResponse<any, any>) => {
        const data: any = res.data["result"];

        // Cache data in local storage
        localStorage.setItem("adminEmailData", JSON.stringify(data));

        return data;
      })
      .catch((e) => {
        return e;
      });
  }

  static async adminfindAll() {
    // Check if data is already in local storage
    const cachedData = localStorage.getItem("adminAllData");
    if (cachedData) {
      // Use type assertion to cast to any[]
      return JSON.parse(cachedData) as any[];
    }

    const headers = {
      Authorization: "Bearer " + localStorage.getItem("jwt"),
      "Content-Type": "application/json",
    };

    return axios
      .get(adminfindAll, { headers })
      .then((res) => {
        const data: any[] = res.data["result"];

        // Cache data in local storage
        localStorage.setItem("adminAllData", JSON.stringify(data));

        return data;
      })
      .catch((e) => {
        localStorage.removeItem("jwt");
        window.location.reload();
        return e;
      });
  }

  static async adminDelete(id: string) {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("jwt"),
      "Content-Type": "application/json",
    };
    try {
      const res = await axios.delete(`${admindelete}/${id}`, {
        headers,
      });

      // Clear the cached data after deleting an admin
      localStorage.removeItem("adminAllData");

      return res.data["result"];
    } catch (e) {
      localStorage.removeItem("jwt");
      window.location.reload();
      return e;
    }
  }

  static async adminCreate(data: { email: string; password: string }) {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("jwt"),
      "Content-Type": "application/json",
    };
    try {
      const res = await axios.post(admincreate, data, {
        headers,
      });

      // Clear the cached data after creating an admin
      localStorage.removeItem("adminAllData");

      return res.data["result"];
    } catch (e) {
      localStorage.removeItem("jwt");
      window.location.reload();
      return e;
    }
  }
}
