import { useEffect, useState } from "react";
import Editdialog from "./news.dialog";
import ConfirmDialog from "./news.confirmdialog";
import { NewsResult } from "../../interfaces/news.interface";
import NewsService from "../../services/news.service";
import moment from "moment";
import deleteicon from "../../assets/icons/svg/delete.svg";

function TitleMenu(props: any) {
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

function News() {
  const [news, setNews] = useState<NewsResult[]>([]);
  const [selectedElement, setSelectedElement] = useState<NewsResult | null>(
    null
  );
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isDeletemode, setDeletemode] = useState(false);

  useEffect(() => {
    NewsService.fecth().then((res) => setNews(res));
  }, []);

  const openDialog = (element: NewsResult) => {
    if (isDeletemode == false) {
      setSelectedElement(element);
    }
  };

  const closeDialog = () => {
    setSelectedElement(null);
    setUploadedImage(null);
  };

  function newsdelete(element: NewsResult) {
    setSelectedElement(element);
  }

  return (
    <div className="flex flex-col p-4 w-full gap-4">
      <TitleMenu
        setUploadedImage={setUploadedImage}
        uploadedImage={uploadedImage}
        isDeletemode={isDeletemode}
        setDeletemode={setDeletemode}
      />
      <div className="w-full bg-main5 rounded" style={{ height: 1 }}></div>
      <div className="flex flex-wrap gap-x-4 gap-y-4">
        {news.map((element) => (
          <div
            key={element.id}
            onClick={() => openDialog(element)}
            className=" cursor-pointe shadow-md bg-transparent p-0 rounded-2xl relative max-w-80 h-52 flex flex-col items-start justify-end"
          >
            <img
              className="absolute rounded-2xl object-cover h-52"
              src={element.image_URL}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white from-20% rounded-2xl"></div>
            <div className="relative flex flex-col rounded-2xlend p-4 gap-2">
              {isDeletemode ? (
                <>
                  <p>{element.title}</p>
                  <div
                    className="cursor-pointer flex justify-center rounded-xl bg-validation hover:bg-validation-hover p-4"
                    onClick={() => newsdelete(element)}
                  >
                    <img width={36} src={deleteicon} />
                  </div>
                </>
              ) : (
                <>
                  <p>{element.title}</p>
                  <span className="text-main5 font-thin text-sm">
                    {element.intro}
                  </span>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      <ConfirmDialog
        open={selectedElement !== null && isDeletemode === true}
        onClose={closeDialog}
        element={selectedElement}
      />
      <Editdialog
        key={selectedElement?.id}
        open={selectedElement !== null && isDeletemode === false}
        onClose={closeDialog}
        element={selectedElement}
        setUploadedImage={setUploadedImage}
        uploadedImage={uploadedImage}
      />
    </div>
  );
}

export default News;
