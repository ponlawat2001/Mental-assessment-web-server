import {
  timesteampConverter,
  timesteampConvertertotime,
} from "@app/helper/helper";
import { VentResult } from "@app/interfaces/vent.interface";
import VentService from "@app/services/vent.service";
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function VentScreen() {
  const [isuserSelected] = useOutletContext<string>();
  const [vent, setVent] = useState<VentResult[] | null>(null);
  const [historySelected, setHistorySelected] = useState<VentResult | null>(
    null
  );
  const navigate = useNavigate();

  useEffect(() => {
    VentService.fecth().then((res) => {
      setVent(res);
    });
  }, []);

  function clickventSelected(ventClick: VentResult) {
    // if (historyClick.id == historySelected?.id) {
    //   setHistorySelected(null);
    // } else {
    //   setHistorySelected(historyClick);
    //   navigate("historyDetail");
    // }
  }

  return (
    <>
      <div className="flex flex-row gap-4 ">
        <div className="flex flex-col gap-4 rounded-2xl p-4 h-fit max-h-screen bg-white overflow-auto">
          <p className=" font-bold p-2 text-center ">การระบายของผู้ใช้</p>
          <button>การระบายแบบเสียง</button>
          {vent
            ?.filter((value) => value.owner == isuserSelected)
            .map((element) => (
              <div className=" flex flex-col bg-main30 p-4 rounded-2xl">
                <p>{timesteampConvertertotime(element.create_at._seconds)}</p>
                <p>{element.vent_content}</p>
              </div>
            ))}
        </div>
        {/* {historySelected && historySelected?.id != "" ? (
          <Outlet context={historySelected} />
        ) : null} */}
      </div>
    </>
  );
}
