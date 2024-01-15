import { useState } from "react";
import Editdialog from "./news.dialog";
import moment from "moment";

export function TitleMenu(props: any) {
  const [isopennews, setopennews] = useState(false);

  function AddNews() {
    setopennews(true);
  }

  const closeDialog = () => {
    setopennews(false);
    props.setUploadedImage(null);
  };

  function deleteMode() {
    props.setDeletemode(!props.isDeletemode);
  }

  return (
    <>
      <div className="flex flex-row justify-between ">
        <p>ข่าวสารและบทความ</p>
        <p>{moment().format("MMMM Do YYYY")}</p>
      </div>
      <div className="flex flex-row justify-end gap-4">
        <button
          className=" bg-validation hover:bg-validation-hover w-24 rounded-3xl shadow-md"
          onClick={deleteMode}
        >
          ลบข่าว
        </button>
        <button className="w-24 rounded-3xl shadow-md" onClick={AddNews}>
          เพิ่มข่าวสาร
        </button>
      </div>
      <Editdialog
        open={isopennews}
        onClose={closeDialog}
        setUploadedImage={props.setUploadedImage}
        uploadedImage={props.uploadedImage}
      />
    </>
  );
}
