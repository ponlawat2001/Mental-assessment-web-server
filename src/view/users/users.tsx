import moment from "moment";
import { useEffect, useState } from "react";
import { UserResult } from "@interfaces/user.interface";
import UsersService from "@services/users.service";
import AvatarsService from "@services/avatar.service";
import { AvatarResult } from "@interfaces/avatar.interface";
import { avatarRender } from "@app/helper/helper";

function Users() {
  let counter = 0;
  const [user, setUser] = useState<UserResult[] | null>(null);
  const [avatar, setAvatar] = useState<AvatarResult[] | null>(null);
  const [isuserSelected, setUserSelected] = useState("");

  useEffect(() => {
    UsersService.fecth().then((res) => setUser(res));
    AvatarsService.fecth().then((res) => setAvatar(res));
  }, []);

  function clickUserSelected(email: string) {
    if (email == isuserSelected) {
      setUserSelected("");
    } else {
      setUserSelected(email);
    }
  }

  return (
    <div className="flex flex-col w-full gap-4 p-4">
      <div className="flex flex-row justify-between ">
        <p>ข่าวสารและบทความ</p>
        <p>{moment().format("MMMM Do YYYY")}</p>
      </div>
      <div className="w-full bg-main5 rounded" style={{ height: 1 }}></div>
      <table
        className={
          (isuserSelected != "" ? " w-fit " : " w-full ") +
          "table-autotext-main5 font-thin text-center items-center justify-center bg-white rounded-2xl"
        }
      >
        <thead className="text-main5">
          <tr>
            <th className="p-2">ลำดับ</th>
            <th className="p-2">โปรไฟล์ผู้ใช้</th>
            <th className="p-2">ชื่อผู้ใช้</th>
            <th className="p-2">อีเมล</th>
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
                    (counter % 2 == 0 ? "bg-light_green" : "bg-white") +
                    (isuserSelected == element.email
                      ? " border-4 border-main10 "
                      : "") +
                    " cursor-pointer "
                  }
                  onClick={() => clickUserSelected(element.email)}
                >
                  <td className="p-4">{(counter = counter + 1)}</td>
                  <td className="flex items-center justify-center p-4">
                    <img width={48} src={avatarRender(element.avatar)} />
                  </td>
                  <td className="p-4">{u.displayname ?? "ไม่พบอีเมล"}</td>
                  <td className="p-4">{element.email ?? "ไม่พบอีเมล"}</td>
                </tr>
              ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
