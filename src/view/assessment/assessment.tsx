import { timesteampConvertertotime } from "@app/helper/helper";
import { AssessmentResult } from "@app/interfaces/assessment.interface";
import AssessmentServices from "@app/services/assessment.service";
import moment from "moment";
import { useEffect, useState } from "react";

function Assessment() {
  let counter = 0;
  const [assessment, setAssessment] = useState<AssessmentResult[] | null>(null);

  useEffect(() => {
    AssessmentServices.fecth().then((res) => {
      setAssessment(res);
    });
  }, []);

  return (
    <div className="flex flex-col w-full gap-4 p-4">
      <div className="flex flex-row justify-between ">
        <p>ข้อมูลรายบุคคล</p>
        <p>{moment().format("MMMM Do YYYY")}</p>
      </div>

      <div className="w-full bg-main5 rounded" style={{ height: 1 }}></div>
      <div className="flex flex-row gap-4">
        <table className=" w-full h-fit table-autotext-main5 font-thin text-center items-center justify-center bg-white rounded-2xl">
          <thead className="text-main5">
            <tr>
              <th className="px-4 py-2">ลำดับ</th>
              <th className="px-4 py-2">ชื่อแบบประเมิน</th>
              <th className="px-4 py-2">ชนิดแบบประเมิน</th>
              <th className="px-4 py-2">แก้ไขเมื่อ</th>
              <th className="px-4 py-2">สร้างเมื่อ</th>
            </tr>
          </thead>
          <tbody className="max-h-screen h-fit overflow-auto ">
            {assessment
              ?.filter((value) => value.type == "main")
              .map((element) => (
                <tr
                  key={element.id}
                  className={
                    (counter % 2 == 0 ? " bg-light_green " : " ") +
                    " cursor-pointer hover:bg-light_green2 rounded-2xl transition "
                  }
                >
                  <td className="p-4">{(counter = counter + 1)}</td>
                  <td className=" p-4">{element.name ?? "ไม่มีขื่อ"}</td>
                  <td className=" p-4">
                    {element.type == "main" ? "หลัก" : "ทั่วไป" ?? "ไม่มีขื่อ"}
                  </td>
                  <td className=" p-4">
                    {timesteampConvertertotime(element.update_at._seconds) ??
                      "ไม่พบข้อมูล"}
                  </td>
                  <td className="p-4">
                    {timesteampConvertertotime(element.create_at._seconds) ??
                      "ไม่พบข้อมูล"}
                  </td>
                </tr>
              ))}
            {assessment
              ?.filter((value) => value.type != "main")
              .map((element) => (
                <tr
                  key={element.id}
                  className={
                    (counter % 2 == 0 ? " bg-light_green " : " ") +
                    " cursor-pointer hover:bg-light_green2 rounded-2xl transition "
                  }
                >
                  <td className="p-4">{(counter = counter + 1)}</td>
                  <td className=" p-4">{element.name ?? "ไม่มีขื่อ"}</td>
                  <td className=" p-4">
                    {element.type == "main" ? "หลัก" : "ทั่วไป" ?? "ไม่มีขื่อ"}
                  </td>
                  <td className=" p-4">
                    {timesteampConvertertotime(element.update_at._seconds) ??
                      "ไม่พบข้อมูล"}
                  </td>
                  <td className="p-4">
                    {timesteampConvertertotime(element.create_at._seconds) ??
                      "ไม่พบข้อมูล"}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Assessment;
