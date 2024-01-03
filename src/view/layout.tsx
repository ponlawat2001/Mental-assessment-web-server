import { Outlet, Link } from "react-router-dom";

function Layout() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link className=" text-3xl" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link to="/nopage">Nopage</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
}

export default Layout;
