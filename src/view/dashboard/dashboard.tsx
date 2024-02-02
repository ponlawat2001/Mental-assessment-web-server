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
  chartConfigPie,
} from "@views/dashboard/dashboard.chartconfig";
import React from "react";
import { timesteampConvertertotime } from "@app/helper/helper";
import VentService from "@app/services/vent.service";
import { VentResult } from "@app/interfaces/vent.interface";
import AssessmentServices from "@app/services/assessment.service";
import { AssessmentResult } from "@app/interfaces/assessment.interface";

export default function Dashboard() {
  const [history, setHistory] = useState<HistoryResult[] | null>(null);
  const [avatar, setAvatar] = useState<AvatarResult[] | null>(null);
  const [vent, setVent] = useState<VentResult[] | null>(null);
  const [assessment, setAssessment] = useState<AssessmentResult[] | null>(null);

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

  function barchartAssessment(isX: boolean) {
    const countMap = new Map<string, number>();
    let data: string[] = [];

    if (history != null && assessment != null) {
      assessment!.map((eassessment) => {
        history!.map((e) =>
          e.summary.map((e) =>
            eassessment.name == e.name ? data.push(e.name) : null
          )
        );
      });

      for (const element of data) {
        countMap.set(element, (countMap.get(element) || 0) + 1);
      }

      const Xline: string[] = Array.from(countMap.keys());
      const Yline: number[] = Array.from(countMap.values());

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

  function piechart(isX: boolean, assessmentname: string, ratename: string) {
    const data2: string[] = [];
    const countMap = new Map<string, number>();

    if (history != null || assessment != null) {
      const data = history!.map((helement) =>
        helement.summary
          .filter((value) => value.name == assessmentname)
          .map((esum) =>
            esum.scorerate
              .filter((valuesum) => valuesum.name == ratename)
              .map((efilter) => efilter.rate)
          )
      );

      data.map((element) => {
        if (element.length != 0) {
          element.map((ein) => (ein.length != 0 ? data2.push(ein[0]) : null));
        }
      });

      for (const counter of data2) {
        countMap.set(counter, (countMap.get(counter) || 0) + 1);
      }

      const Xline: string[] = Array.from(countMap.keys());
      const Yline: number[] = Array.from(countMap.values());

      if (isX) {
        return Xline;
      } else {
        return Yline;
      }
    }
  }

  useEffect(() => {
    if (
      history == null &&
      avatar == null &&
      vent == null &&
      assessment == null
    ) {
      HistoryService.fetch().then((Hisres) => setHistory(Hisres));
      AvatarsService.fetch().then((Avatarres) => setAvatar(Avatarres));
      VentService.fetch().then((Ventres) => setVent(Ventres));
      AssessmentServices.fetch().then((Assessmentres) =>
        setAssessment(Assessmentres)
      );
    }
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
            {history ? (
              history?.map((element) => (
                <div
                  key={element.id}
                  className=" border-main20 border-4 rounded-xl p-4 "
                >
                  <p>{timesteampConvertertotime(element.create_at._seconds)}</p>
                  <p>อีเมล: {element.owner}</p>
                  {element.summary.map((esumnary, index) => (
                    <React.Fragment key={`${element.id}${index}`}>
                      <p>{esumnary.name}</p>
                      {esumnary.scorerate.map((escorerate, subIndex) => (
                        <div
                          key={`${element.id}${index}${subIndex}`}
                          className="bg-main30 rounded-2xl p-4 my-2"
                        >
                          <p>{escorerate.name}</p>
                          <p>: {escorerate.rate}</p>
                        </div>
                      ))}
                    </React.Fragment>
                  ))}
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
        </Card>
      </div>
      <Card className=" w-full h-fit p-4">
        <div className="p-4">
          <p className=" font-bold ">จำนวนแบบประเมินที่ผู้ใช้ทำทั้งหมด</p>
          <p className="max-w-sm font-thin py-2">
            จำนวนครั้งที่ผู้ใช้ได้ทำการประเมินไปทั้งหมด แยกตามชื่อแบบประเมิน
          </p>
        </div>
        {history != null && assessment != null ? (
          <>
            {/* @ts-ignore */}
            <Chart
              {...chartConfigBar(
                barchartAssessment(false),
                barchartAssessment(true)
              )}
            />
          </>
        ) : null}
      </Card>
      <div className=" flex flex-row gap-4 h-96 w-full">
        <Card className="w-full h-fit p-4">
          <div className="p-4">
            <p className=" font-bold ">การระบายความในใจของผู้ใช้</p>
            <p className="max-w-sm font-thin py-2">
              จำนวนครั้งที่ผู้ใช้ได้ทำการระบาบความในใจ
            </p>
          </div>
          {history != null && vent != null ? (
            <>
              {/* @ts-ignore */}
              <Chart {...chartConfigLine(linechart(false), linechart(true))} />
            </>
          ) : null}
        </Card>
        <div className="flex w-fit flex-col gap-4 overflow-y-auto">
          {assessment != null && history != null
            ? assessment!.map((e) => (
                <Card className=" h-fit p-4 gap-2">
                  <>
                    <p className="p-4 border-2 border-main30 rounded-xl">
                      {e.name}
                    </p>
                    {e.scorerate.map((escorerate) =>
                      piechart(false, e.name, escorerate.name)?.length == 0 ? (
                        <div className="">
                          <p>ยังไม่มีผลการประเมิน</p>
                        </div>
                      ) : (
                        <div className="">
                          <p>{escorerate.name}</p>
                          {/* @ts-ignore */}
                          <Chart
                            {...chartConfigPie(
                              piechart(false, e.name, escorerate.name),
                              piechart(true, e.name, escorerate.name)
                            )}
                          />
                        </div>
                      )
                    )}
                  </>
                </Card>
              ))
            : null}
        </div>
      </div>
    </div>
  );
}
