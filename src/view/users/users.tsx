import moment from "moment";
import { useState } from "react";
import { UserResult } from "@interfaces/user.interface";

function Users() {
  const [user, setUser] = useState<UserResult[] | null>(null);
  return (
    <div className="flex flex-col w-full gap-4 p-4">
      <div className="flex flex-row justify-between ">
        <p>ข่าวสารและบทความ</p>
        <p>{moment().format("MMMM Do YYYY")}</p>
      </div>
      <div className="w-full bg-main5 rounded" style={{ height: 1 }}></div>
      <div></div>
    </div>
  );
}

export default Users;
