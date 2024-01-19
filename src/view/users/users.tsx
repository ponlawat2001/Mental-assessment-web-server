import moment from "moment";
import { useEffect, useState } from "react";
import { UserResult } from "@interfaces/user.interface";
import UsersService from "@services/users.service";
import AvatarsService from "@services/avatar.service";
import { AvatarResult } from "@interfaces/avatar.interface";
import { avatarRender } from "@app/helper/helper";
import { Outlet, useNavigate } from "react-router-dom";

function Users() {
  let counter = 0;
  const [user, setUser] = useState<UserResult[] | null>(null);
  const [avatar, setAvatar] = useState<AvatarResult[] | null>(null);
  const [isuserSelected, setUserSelected] = useState("");
  const [ishistory, sethistory] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    UsersService.fecth().then((res) => setUser(res));
    AvatarsService.fecth().then((res) => setAvatar(res));
  }, []);

  function clickUserSelected(email: string, isHistory: boolean) {
    if (email == isuserSelected) {
      setUserSelected("");
    } else {
      if (isHistory) {
        setUserSelected(email);
        navigate("history");
      } else {
        setUserSelected(email);
        navigate("vent");
      }
    }
  }

  const isChangemode = (mode: boolean) => {
    sethistory(mode);
    if (mode) {
      navigate("history");
    } else {
      navigate("vent");
    }
  };

  return (
    <div className="flex flex-col w-full gap-4 p-4">
      <div className="flex flex-row justify-between ">
        <p>ข้อมูลรายบุคคล</p>
        <p>{moment().format("MMMM Do YYYY")}</p>
      </div>
      <div className="flex flex-row justify-end gap-4 ">
        <button
          disabled={ishistory}
          className={
            (ishistory
              ? " bg-gray-400 hover:bg-gray-400 "
              : " bg-link  hover:bg-link-hover ") +
            "   w-fit rounded-3xl shadow-md px-4"
          }
          onClick={() => isChangemode(true)}
        >
          ดูประวัติการทำแบบเมิน
        </button>
        <button
          disabled={!ishistory}
          className={
            (!ishistory
              ? " bg-gray-400 hover:bg-gray-400 "
              : " bg-validation  hover:bg-validation-hover ") +
            "   w-fit rounded-3xl shadow-md px-4"
          }
          onClick={() => isChangemode(false)}
        >
          ดูการระบาย
        </button>
      </div>
      <div className="w-full bg-main5 rounded" style={{ height: 1 }}></div>
      <div className="flex flex-row gap-4">
        <table
          className={
            (isuserSelected != "" ? " w-1/3 " : " w-full ") +
            " h-fit table-autotext-main5 font-thin text-center items-center justify-center bg-white rounded-2xl"
          }
        >
          <thead className="text-main5">
            <tr>
              <th className="px-4 py-2">ลำดับ</th>
              <th className="px-4 py-2">โปรไฟล์ผู้ใช้</th>
              <th className="px-4 py-2">ชื่อผู้ใช้</th>
              <th className="px-4 py-2">อีเมล</th>
            </tr>
          </thead>
          <tbody>
            {user?.map((u) =>
              avatar
                ?.filter((value) => u.email == value.email)
                .map((element) => (
                  <tr
                    key={element.id}
                    className={
                      (isuserSelected == element.email ? " bg-main20 " : "  ") +
                      (counter % 2 == 0 ? " bg-light_green " : " ") +
                      " cursor-pointer hover:bg-light_green2 "
                    }
                    onClick={() => clickUserSelected(element.email, ishistory)}
                  >
                    <td className="p-4">{(counter = counter + 1)}</td>
                    <td className=" items-center justify-center p-4">
                      <img
                        width={64}
                        className="rounded-xl"
                        src={avatarRender(element.avatar)}
                      />
                    </td>
                    <td className=" p-4">{u.displayname ?? "ไม่พบอีเมล"}</td>
                    <td className="p-4">{element.email ?? "ไม่พบอีเมล"}</td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
        {isuserSelected != "" ? <Outlet context={[isuserSelected]} /> : null}
      </div>
    </div>
  );
}

export default Users;
