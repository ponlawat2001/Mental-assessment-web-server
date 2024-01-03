import useLocalStorage from "use-local-storage";
import { ReactNode } from "react";
import LoginScreen from "../view/login";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const [jwt, setJwt] = useLocalStorage("", "");
  return jwt ? children : <LoginScreen />;
};

export default PrivateRoute;
