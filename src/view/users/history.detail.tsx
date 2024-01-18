import { HistoryResult } from "@app/interfaces/history.interface";
import { useOutletContext } from "react-router-dom";

export default function HistoryDetail() {
  const historySelected = useOutletContext<HistoryResult>();

  return (
    <>
      <div className="flex flex-col gap-4 rounded-2xl p-4 bg-white">
        {historySelected.summary.map((element) => (
          <p>{element.name}</p>
        ))}
      </div>
    </>
  );
}
