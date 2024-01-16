import { ReactNode, useEffect, useState } from "react";
import LoginScreen from "@views/login&forget/login";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const [jwt, setJwt] = useState(localStorage.getItem("jwt"));

  useEffect(() => {
    console.log("useEffect");
    setJwt(localStorage.getItem("jwt"));
  }, [jwt]);

  return jwt ? children : <LoginScreen tokenonchange={setJwt} />;
};

export default PrivateRoute;
