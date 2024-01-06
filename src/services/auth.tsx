import axios, { AxiosResponse } from "axios";
import { login } from "../serverinfo/serverinfo";

export default class authServices {
  static Login(email: string, password: string, props: any) {
    axios
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
}
