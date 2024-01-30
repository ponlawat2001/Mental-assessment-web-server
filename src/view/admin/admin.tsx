import { timesteampConverter } from "@app/helper/helper";
import { AdminResult } from "@app/interfaces/admin.interface";
import AuthServices from "@app/services/auth.service";
import moment from "moment";
import { useEffect, useState } from "react";
import Delete from "@assets/icons/svg/delete.svg";
import AdminConfirmdialog from "./admin.confirmDialog";
import Admindialog from "./admin.dialog";

function Admin() {
  const [admin, setAdmin] = useState<AdminResult[] | null>(null);
  const [selected, setSelected] = useState<AdminResult | null>(null);
  const [iscreate, setCreate] = useState(false);
  useEffect(() => {
    AuthServices.adminfindAll().then((res) => setAdmin(res));
  }, []);

  const handleDelete = (data: AdminResult) => {
    setSelected(data);
  };

  return (
    <div className="flex flex-col w-full gap-4 p-4">
      <div className="flex flex-row justify-between ">
        <p>จัดการแอดมิน</p>
        <p>{moment().format("MMMM Do YYYY")}</p>
      </div>
      <div className="flex flex-row justify-end ">
        <button
          className=" w-fit rounded-2xl px-4"
          onClick={() => setCreate(true)}
        >
          เพิ่มแอดมิน
        </button>
      </div>
      <div className="w-full bg-main5 rounded" style={{ height: 1 }}></div>

      {admin?.length != 0 ? (
        <div className="flex flex-row gap-4">
          <table className=" w-full h-fit table-autotext-main5 font-thin text-center items-center justify-center bg-white rounded-2xl">
            <thead className="text-main5">
              <tr>
                <th className="px-4 py-2">ลำดับ</th>
                <th className="px-4 py-2">อีเมล</th>
                <th className="px-4 py-2">แก้ไขเมื่อ</th>
                <th className="px-4 py-2">สร้างเมื่อ</th>
                <th className="px-4 py-2">การกระทำ</th>
              </tr>
            </thead>
            <tbody className="max-h-screen h-fit overflow-auto text-main5">
              {admin?.map((element, index) => (
                <tr key={element.id}>
                  <th className="px-4 py-2 font-thin">{index + 1}</th>
                  <th className="px-4 py-2 font-thin">{element.email}</th>
                  <th className="px-4 py-2 font-thin">
                    {timesteampConverter(element.update_at._seconds)}
                  </th>
                  <th className="px-4 py-2 font-thin">
                    {timesteampConverter(element.create_at._seconds)}
                  </th>
                  <th className="px-4 py-2 font-thin flex justify-center items-center">
                    <button
                      className="w-fit hover:bg-validation-hover bg-validation p-4 rounded-2xl"
                      onClick={() => handleDelete(element)}
                    >
                      <img src={Delete} />
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className=" text-center p-4">ไม่พบข้อมูล</p>
      )}
      <AdminConfirmdialog
        open={selected != null}
        onClose={() => setSelected(null)}
        element={selected}
      />
      <Admindialog open={iscreate} onClose={() => setCreate(false)} />
    </div>
  );
}

export default Admin;
