import { Link } from "react-router-dom";
import Logo from "../assets/icons/Logo.png";
import assessment from "../assets/icons/svg/assessment.svg";
import news from "../assets/icons/svg/news.svg";
import profile from "../assets/icons/svg/profile.svg";
import users from "../assets/icons/svg/users.svg";
import dashboard from "../assets/icons/svg/dashboard.svg";
import logout from "../assets/icons/svg/logout.svg";
import { useState } from "react";

function Sidebar() {
  const [path, setPath] = useState(window.location.pathname);
  const ListofIcon = [
    {
      path: "/",
      icon: dashboard,
    },

    {
      path: "/assessment",
      icon: assessment,
    },
    {
      path: "/contact",
      icon: profile,
    },
    {
      path: "/news",
      icon: news,
    },
    {
      path: "/users",
      icon: users,
    },
  ];

  function pathonChange(pathchangeonClick: string) {
    setPath(pathchangeonClick);
  }

  function signout() {
    localStorage.removeItem("jwt");
    window.location.reload();
  }
  return (
    <nav>
      <div
        className="bg-main10 flex flex-col min-h-screen h-full p-4 -8 items-center w-20 justify-between
       "
      >
        <div className="flex flex-col gap-8">
          <img src={Logo} width={48} height={48} />
          <div
            className=" w-full rounded bg-white "
            style={{ height: 2 }}
          ></div>

          {ListofIcon.map((e) => (
            <Link
              key={e.path}
              className={
                e.path == path
                  ? "flex p-2 rounded w-10 h-10 justify-center items-center bg-main5"
                  : "flex p-2 rounded w-10 h-10 justify-center items-center hover:bg-main20"
              }
              onClick={() => {
                pathonChange(e.path);
              }}
              to={e.path}
            >
              <img alt={`Icon for ${e.path}`} src={e.icon} />
            </Link>
          ))}
        </div>

        <Link onClick={signout} to="/">
          <img src={logout} />
        </Link>
      </div>
    </nav>
  );
}

export default Sidebar;
