import { HistoryResult } from "@app/interfaces/history.interface";
import { useOutletContext } from "react-router-dom";
import signup from "@assets/icons/signup.svg";
import signdown from "@assets/icons/signdown.svg";
import { useState } from "react";

export default function HistoryDetail() {
  const historySelected = useOutletContext<HistoryResult>();
  const [ishide, setHide] = useState("");

  const ishidechange = (name: string) => {
    if (name == ishide) {
      setHide("");
    } else {
      setHide(name);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4 rounded-2xl p-4 bg-white h-fit overflow-auto max-h-screen ">
        {historySelected.summary.map((element, index) => (
          <>
            <p className=" font-bold">ชื่อแบบประเมิน:</p>
            <p>{element.name}</p>

            <div className=" flex flex-col gap-4 w-full ">
              <div className="flex flex-row gap-2 ">
                <p
                  className=" underline font-thin cursor-pointer hover:text-main20 transition"
                  onClick={() => ishidechange(element.name)}
                >
                  คำตอบของผู้ใช้:
                </p>
                {ishide == element.name ? (
                  <img src={signup} />
                ) : (
                  <img src={signdown} />
                )}
              </div>
              {ishide == element.name
                ? element.useranswer.map((answer) => (
                    <div className=" flex flex-col bg-main30 rounded-2xl p-4 ">
                      <p>{answer.question}</p>
                      <div className=" flex flex-row gap-4 justify-between ">
                        <p>คำตอบ: {answer.answer}</p>
                        <p>คะแนนที่ได้รับ​: {answer.score}</p>
                      </div>
                    </div>
                  ))
                : null}
              {element.scorerate.map((scorerate) => (
                <p>
                  {scorerate.name}: {scorerate.rate}
                </p>
              ))}
              {index != historySelected.summary.length - 1 ? (
                <div
                  className=" w-full bg-main5 rounded"
                  style={{ height: 1 }}
                ></div>
              ) : null}
            </div>
          </>
        ))}
      </div>
    </>
  );
}
