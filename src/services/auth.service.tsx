import axios, { AxiosResponse } from "axios";
import { login, reset } from "../serverinfo/serverinfo";

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

  static async fetchnewtoken() {}
}
