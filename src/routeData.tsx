import { createBrowserRouter } from "react-router-dom";
import Layout from "./view/layout";
import NopageScreen from "./view/404";
import LoginScreen from "./view/login&forget/login";
import AboutScreen from "./view/about";
import HomeScreen from "./view/home";
import PrivateRoute from "./privateRoute/privateRoute";
import Forgetpassword from "./view/login&forget/forgetpassword";
import ForgetpasswordSuccess from "./view/login&forget/forgetsucess";

const routerData = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Layout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <HomeScreen />,
      },
      {
        path: "about",
        element: <AboutScreen />,
      },
    ],
  },
  {
    index: true,
    path: "/login",
    element: <LoginScreen />,
  },

  {
    path: "/forget",
    element: <Forgetpassword />,
  },
  {
    path: "/forgetsuccess",
    element: <ForgetpasswordSuccess />,
  },
  {
    path: "*",
    element: <NopageScreen />,
  },
]);

export default routerData;
