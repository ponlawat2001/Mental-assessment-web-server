import { Card } from "@material-tailwind/react";
import moment from "moment";
import Chart from "react-apexcharts";
import { useEffect, useState } from "react";
import HistoryService from "@app/services/history.service";
import AvatarsService from "@app/services/avatar.service";
import { HistoryResult } from "@app/interfaces/history.interface";
import { AvatarResult } from "@app/interfaces/avatar.interface";
import {
  chartConfigBar,
  chartConfigLine,
} from "@views/dashboard/dashboard.chartconfig";
import React from "react";
import { timesteampConvertertotime } from "@app/helper/helper";
import VentService from "@app/services/vent.service";
import { VentResult } from "@app/interfaces/vent.interface";

export default function Dashboard() {
  const [history, setHistory] = useState<HistoryResult[] | null>(null);
  const [avatar, setAvatar] = useState<AvatarResult[] | null>(null);
  const [vent, setVent] = useState<VentResult[] | null>(null);

  function barchart(isX: boolean) {
    let Xline: string[] = [];
    let Yline: number[] = [];

    if (avatar != null || history != null) {
      const data = avatar!.map((element) =>
        history!
          .filter((value) => value.owner == element.email)
          .map((e) => e.owner.split("@")[0])
      );

      data.map((element) => {
        if (element.length != 0) {
          Yline.push(element.length);
          Xline.push(element[0]);
        }
      });
      if (isX) {
        return Xline;
      } else {
        return Yline;
      }
    }
  }

  function linechart(isX: boolean) {
    let Xline: string[] = [];
    let Yline: number[] = [];

    if (avatar != null || vent != null) {
      const data = avatar!.map((element) =>
        vent!
          .filter((value) => value.owner == element.email)
          .map((e) => e.owner.split("@")[0])
      );

      data.map((element) => {
        if (element.length != 0) {
          Yline.push(element.length);
          Xline.push(element[0]);
        }
      });
      if (isX) {
        return Xline;
      } else {
        return Yline;
      }
    }
  }

  useEffect(() => {
    HistoryService.fecth().then((Hisres) => setHistory(Hisres));
    AvatarsService.fecth().then((Avatarres) => setAvatar(Avatarres));
    VentService.fecth().then((Ventres) => setVent(Ventres));
  }, []);

  return (
    <div className=" flex flex-col gap-4 p-4 w-full ">
      <div className="flex flex-row justify-between ">
        <p>Dashboard</p>
        <p>{moment().format("MMMM Do YYYY")}</p>
      </div>
      <div
        className="w-full bg-main5 rounded max-h-screen "
        style={{ height: 1 }}
      ></div>
      <div className=" flex flex-row gap-4 ">
        <Card className=" w-3/4 h-fit p-4">
          <div className="p-4">
            <p className=" font-bold ">การทำแบบประเมินของผู้ใช้</p>
            <p className="max-w-sm font-thin py-2">
              จำนวนครั้งที่ผู้ใช้ได้ทำการประเมินไปทั้งหมด
            </p>
          </div>
          {history != null && avatar != null ? (
            <>
              {/* @ts-ignore */}
              <Chart {...chartConfigBar(barchart(false), barchart(true))} />
            </>
          ) : null}
        </Card>
        <Card className=" w-fit  h-96 p-4 gap-4">
          <p className=" font-bold ">ผลการประเมินล่าสุดของผู้ใช้</p>
          <p className="max-w-sm font-thin">
            ผลการประเมินครั้งล่าสุด ของผู้ใช้ทุกคน
          </p>
          <div className=" flex flex-col overflow-y-auto rounded-xl gap-4">
            {history?.map((element) => (
              <div className="   border-main20 border-4 rounded-xl p-4">
                <p>{timesteampConvertertotime(element.create_at._seconds)}</p>
                <p>อีเมล: {element.owner}</p>
                {element.summary.map((esumnary) => (
                  <React.Fragment key={element.id}>
                    <p>{esumnary.name}</p>
                    {esumnary.scorerate.map((escorerate) => (
                      <>
                        <p>{escorerate.rate}</p>
                      </>
                    ))}
                  </React.Fragment>
                ))}
              </div>
            ))}
          </div>
        </Card>
      </div>
      <Card className=" w-full h-fit p-4">
        <div className="p-4">
          <p className=" font-bold ">การระบายความในใจของผู้ใช้</p>
          <p className="max-w-sm font-thin py-2">
            จำนวนการระบายความในใจทั้งหมดของผู้ใช้
          </p>
        </div>
        {vent != null && avatar != null ? (
          <>
            {/* @ts-ignore */}
            <Chart {...chartConfigLine(linechart(false), linechart(true))} />
          </>
        ) : null}
      </Card>
    </div>
  );
}
