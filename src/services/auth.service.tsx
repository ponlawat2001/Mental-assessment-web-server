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
    return axios
      .get(`${adminfindEmail}/${email}`)
      .then((res: AxiosResponse<any, any>) => {
        return res.data["result"];
      })
      .catch((e) => {
        return e;
      });
  }

  static async adminfindAll() {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("jwt"),
      "Content-Type": "application/json",
    };
    return axios
      .get(adminfindAll, { headers })
      .then((res) => {
        return res.data["result"];
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
      return res.data["result"];
    } catch (e) {
      localStorage.removeItem("jwt");
      window.location.reload();
      return e;
    }
  }
}
