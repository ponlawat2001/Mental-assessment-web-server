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
import PrivateRoute from "./privateRoute/privateRoute";

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
    path: "/nopage",
    element: <NopageScreen />,
  },
]);

export default routerData;
