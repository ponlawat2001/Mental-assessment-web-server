import { HistoryResult } from "@app/interfaces/history.interface";
import HistoryService from "@app/services/history.service";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

export default function HistoryScreen() {
  const [isuserSelected] = useOutletContext<string>();
  const [history, setHistory] = useState<HistoryResult[] | null>(null);

  useEffect(() => {
    HistoryService.fecth().then((res) => {
      setHistory(res);
    });
  }, []);

  return (
    <>
      <div className="flex flex-col gap-4">
        <p className=" font-bold p-2 text-center ">
          ประวัติการทำแบบประเมินของผู้ใช้
        </p>
        {history
          ?.filter((value) => value.owner == isuserSelected)
          .map((element) => (
            <div className=" bg-main30 p-4 rounded-2xl" key={element.id}>
              {element.summary.map((Esummary) => (
                <p>{Esummary.name}</p>
              ))}
            </div>
          ))}
      </div>
    </>
  );
}
