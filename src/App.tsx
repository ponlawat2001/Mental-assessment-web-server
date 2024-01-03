import "./App.css";
import PrivateRoute from "./privateRoute/privateRoute";
import routeData from "./routeData";
import { RouterProvider } from "react-router-dom";

function App() {
  return (
    <>
      <PrivateRoute>
        <RouterProvider router={routeData} />
      </PrivateRoute>
    </>
  );
}

export default App;
