import axios, { AxiosResponse } from "axios";
import { login } from "../serverinfo/serverinfo";

export default class authServices {
  static Login(email: string, password: string) {
    axios
      .post(login, {
        email: email,
        password: password,
      })
      .then((res: AxiosResponse<any, any>) => {
        localStorage.setItem("jwt", res.data);
        console.log(res);
        return res.data;
      })
      .catch((e) => {
        throw e;
      });
  }
}
