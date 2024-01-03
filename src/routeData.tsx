import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Routes,
} from "react-router-dom";
import Layout from "./view/layout";
import NopageScreen from "./view/404";
import LoginScreen from "./view/login";
import AboutScreen from "./view/about";
import HomeScreen from "./view/home";

const routerData = createBrowserRouter([
  {
    path: "/dashboard",
    element: <Layout />,
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
    path: "/",
    element: <LoginScreen />,
  },
  {
    path: "/nopage",
    element: <NopageScreen />,
  },
]);

export default routerData;
