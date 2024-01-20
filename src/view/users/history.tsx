import {
  timesteampConverter,
  timesteampConvertertotime,
} from "@app/helper/helper";
import { HistoryResult } from "@app/interfaces/history.interface";
import HistoryService from "@app/services/history.service";
import { useEffect, useState } from "react";
import { Outlet, useNavigate, useOutletContext } from "react-router-dom";

export default function HistoryScreen() {
  const [isuserSelected] = useOutletContext<string>();
  const [history, setHistory] = useState<HistoryResult[] | null>(null);
  const [historySelected, setHistorySelected] = useState<HistoryResult | null>(
    null
  );
  const navigate = useNavigate();

  useEffect(() => {
    HistoryService.fecth().then((res) => {
      setHistory(res);
    });
  }, []);

  function clickhitorySelected(historyClick: HistoryResult) {
    if (historyClick.id == historySelected?.id) {
      setHistorySelected(null);
    } else {
      setHistorySelected(historyClick);
      navigate("historyDetail");
    }
  }

  return (
    <>
      <div className="flex flex-row gap-4">
        <div className="flex flex-col gap-4 rounded-2xl p-4 h-fit max-h-screen bg-white">
          <p className=" font-bold p-2 text-center ">
            ประวัติการทำแบบประเมินของผู้ใช้
          </p>
          <div className="flex flex-col gap-4 overflow-auto rounded-2xl">
            {history
              ?.filter((value) => value.owner == isuserSelected)
              .map((element) => (
                <>
                  <div
                    key={element?.id}
                    className={
                      (element?.id == historySelected?.id
                        ? " bg-main20 "
                        : " bg-main30 ") +
                      " cursor-pointer p-4 rounded-2xl hover:bg-light_green2 "
                    }
                    onClick={() => clickhitorySelected(element)}
                  >
                    <p>
                      {element.type == "main"
                        ? "แบบประเมินรวม"
                        : element.summary[0].name}
                    </p>
                    <p className=" font-thin">
                      {timesteampConvertertotime(element.create_at._seconds)}
                    </p>
                  </div>
                </>
              ))}
          </div>
        </div>
        {historySelected && historySelected?.id != "" ? (
          <Outlet context={historySelected} />
        ) : null}
      </div>
    </>
  );
}
