import { createBrowserRouter } from "react-router-dom";
import Layout from "./view/layout";
import NopageScreen from "./view/404";
import LoginScreen from "./view/login&forget/login";
import PrivateRoute from "./privateRoute/privateRoute";
import Forgetpassword from "./view/login&forget/forgetpassword";
import ForgetpasswordSuccess from "./view/login&forget/forgetsucess";
import Dashboard from "./view/dashboard";
import Assessment from "./view/assessment/assessment";
import Contact from "./view/contact/contact";
import News from "./view/news/news";
import Profile from "./view/profile/profile";
import Users from "./view/users/users";
import HistoryScreen from "./view/users/history";

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
        element: <Dashboard />,
      },
      {
        path: "assessment",
        element: <Assessment />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "news",
        element: <News />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "users",
        element: <Users />,
        children: [
          {
            path: "history",
            element: <HistoryScreen />,
          },
        ],
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
