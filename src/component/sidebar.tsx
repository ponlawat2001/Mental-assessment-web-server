import { Link } from "react-router-dom";
import Logo from "../assets/icons/Logo.png";
import assessment from "../assets/icons/svg/assessment.svg";
import contact from "../assets/icons/svg/contact.svg";
import news from "../assets/icons/svg/news.svg";
import profile from "../assets/icons/svg/profile.svg";
import users from "../assets/icons/svg/users.svg";
import dashboard from "../assets/icons/svg/dashboard.svg";
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
      icon: contact,
    },
    {
      path: "/news",
      icon: news,
    },
    {
      path: "/profile",
      icon: profile,
    },
    {
      path: "/users",
      icon: users,
    },
  ];

  function pathonChange(pathchange: string) {
    setPath(pathchange);
  }
  return (
    <nav>
      <div className="bg-main10 flex flex-col min-h-screen p-4 gap-8 items-center w-20">
        <img src={Logo} width={48} height={48} />
        <div className=" w-full rounded bg-white " style={{ height: 2 }}></div>
        {ListofIcon.map((e) => (
          <Link
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
            <img src={e.icon} />
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default Sidebar;
