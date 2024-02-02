import { timesteampConvertertotime } from "@app/helper/helper";
import { AudioResult } from "@app/interfaces/audio.interface";
import { VentResult } from "@app/interfaces/vent.interface";
import VentService from "@app/services/vent.service";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import ReactAudioPlayer from "react-audio-player";

export default function VentScreen() {
  const [isuserSelected] = useOutletContext<string>();
  const [vent, setVent] = useState<VentResult[] | null>(null);
  const [audio, setAudio] = useState<AudioResult[] | null>(null);

  useEffect(() => {
    VentService.fetch().then((res) => {
      setVent(res);
    });
    VentService.audiofetch().then((res) => setAudio(res));
  }, []);

  return (
    <>
      <div className="flex flex-row gap-4 ">
        <div className="flex flex-col gap-4 rounded-2xl p-4 h-fit max-h-screen bg-white text-center">
          <p className=" font-bold p-2 text-center ">การระบายของผู้ใช้</p>
          {vent?.filter((value) => value.owner == isuserSelected).length !=
          0 ? (
            <div className=" flex flex-col gap-4 overflow-auto rounded-2xl">
              {vent
                ?.filter((value) => value.owner == isuserSelected)
                .map((element) => (
                  <div
                    className={
                      (element.is_delete
                        ? " bg-validation-hover "
                        : "bg-main30 ") + " flex flex-col p-4 rounded-2xl"
                    }
                  >
                    <p className={element.is_delete ? " text-white" : ""}>
                      {timesteampConvertertotime(element.create_at._seconds)}
                    </p>
                    <p className={element.is_delete ? " text-white" : ""}>
                      {element.vent_content}
                    </p>
                    {element.is_delete ? (
                      <span className=" text-sm text-white underline ">
                        ถูกลบโดยผู้ใช้
                      </span>
                    ) : null}
                  </div>
                ))}
            </div>
          ) : (
            <p>ไม่พบข้อมูล</p>
          )}
        </div>
        <div className="flex flex-col gap-4 rounded-2xl p-4 h-fit max-h-screen bg-white text-center ">
          <p className=" font-bold p-2 text-center ">
            การระบายของผู้ใช้แบบเสียง
          </p>
          {audio?.filter((value) => value.owner == isuserSelected).length !=
          0 ? (
            <div className=" flex flex-col gap-4 overflow-auto rounded-2xl">
              {audio
                ?.filter((value) => value.owner == isuserSelected)
                .map((element) => (
                  <div
                    className={
                      (element.is_delete
                        ? " bg-validation-hover "
                        : "bg-main30 ") + " flex flex-col p-4 gap-4 rounded-2xl"
                    }
                  >
                    <p className={element.is_delete ? "text-white" : ""}>
                      {timesteampConvertertotime(element.create_at._seconds)}
                    </p>
                    <ReactAudioPlayer src={element.audioUrl} controls />
                    {element.is_delete ? (
                      <span className=" text-sm text-white ">
                        ถูกลบโดยผู้ใช้
                      </span>
                    ) : null}
                  </div>
                ))}
            </div>
          ) : (
            <p>ไม่พบข้อมูล</p>
          )}
        </div>
      </div>
    </>
  );
}
