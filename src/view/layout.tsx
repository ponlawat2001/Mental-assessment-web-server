import { Outlet } from "react-router-dom";
import Sidebar from "../component/sidebar";

function Layout() {
  return (
    <>
      <div className="flex flex-row">
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
