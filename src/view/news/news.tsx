import { useEffect, useState } from "react";
import Editdialog from "./news.dialog";
import { NewsResult } from "../../interfaces/news.interface";
import NewsService from "../../services/news.service";
import React from "react";
import moment from "moment";

class TitleMenu extends React.Component {
  render() {
    return (
      <>
        <div className="flex flex-row justify-between ">
          <p>ข่าวสารและบทความ</p>
          <p>{moment().format("MMMM Do YYYY")}</p>
        </div>
        <div className="flex flex-row justify-end gap-4">
          <button className=" bg-validation hover:bg-validation-hover w-24 rounded-3xl shadow-md">
            ลบข่าว
          </button>
          <button className="w-24 rounded-3xl shadow-md">เพิ่มข่าวสาร</button>
        </div>
      </>
    );
  }
}

function News() {
  const [news, setNews] = useState<NewsResult[]>([]);
  const [selectedElement, setSelectedElement] = useState<NewsResult | null>(
    null
  );
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  useEffect(() => {
    NewsService.fecth().then((res) => setNews(res));
  }, []);

  const openDialog = (element: NewsResult) => {
    setSelectedElement(element);
  };

  const closeDialog = () => {
    setSelectedElement(null);
    setUploadedImage(null);
  };

  return (
    <div className="flex flex-col p-4 w-full gap-4">
      <TitleMenu />
      <div className="w-full bg-main5 rounded" style={{ height: 1 }}></div>

      <div className="flex flex-wrap gap-x-4 gap-y-4">
        {news.map((element) => (
          <div
            key={element.id}
            onClick={() => openDialog(element)}
            className="shadow-md bg-transparent p-0 rounded-2xl relative max-w-80 h-52 flex flex-col items-start justify-end"
          >
            <img
              className="absolute rounded-2xl object-cover h-52"
              src={element.image_URL}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white from-20% rounded-2xl"></div>
            <div className="relative flex flex-col rounded-2xl justify-end p-4 gap-2">
              <p>{element.title}</p>
              <span className="text-main5 font-thin text-sm">
                {element.intro}
              </span>
            </div>
          </div>
        ))}
      </div>

      <Editdialog
        key={selectedElement?.id}
        open={selectedElement !== null}
        onClose={closeDialog}
        element={selectedElement}
        setUploadedImage={setUploadedImage}
        uploadedImage={uploadedImage}
      />
    </div>
  );
}

export default News;
