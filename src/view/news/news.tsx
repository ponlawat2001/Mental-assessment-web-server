import React, { Fragment, useEffect, useState } from "react";
import NewsService from "../../services/news.service";
import { NewsResult } from "../../interfaces/news.interface";
import { Dialog, Transition } from "@headlessui/react";
import TextareaAutosize from "react-textarea-autosize";

class TitleMenu extends React.Component {
  render() {
    return (
      <>
        <div className="flex flex-row justify-between ">
          <p className="">ข่าวสารและบทความ</p>
          <p className="">Date time</p>
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
  const [isOpen, setIsOpen] = useState(false);
  const [elementonclick, setElementclick] = useState<NewsResult>();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal(element: NewsResult) {
    setElementclick(element);
    setIsOpen(true);
  }
  useEffect(() => {
    NewsService.fecth().then((res) => setNews(res));
  }, []);

  return (
    <div className=" flex flex-col  p-4 w-full gap-4">
      <TitleMenu />
      <div className="w-full bg-main5 rounded" style={{ height: 1 }}></div>
      <div className="flex flex-wrap gap-x-4 gap-y-4">
        {news.map((element) => (
          <div
            onClick={() => openModal(element)}
            className=" shadow-md bg-transparent p-0 rounded-2xl relative max-w-80 h-52 flex flex-col items-start justify-end"
          >
            <img
              className="absolute rounded-2xl object-cover h-52"
              src={element.image_URL}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white from-20% rounded-2xl"></div>
            <div className="relative flex flex-col rounded-2xl justify-end p-4 gap-2">
              <p>{element.title}</p>
              <span className=" text-main5 font-thin text-sm">
                {element.intro}
              </span>
            </div>
          </div>
        ))}
        {Editdialog(isOpen, closeModal, elementonclick)}
      </div>
    </div>
  );
}

export default News;

function Editdialog(
  isOpen: boolean,
  closeModal: () => void,
  element?: NewsResult
) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => {}}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all flex flex-col gap-4">
                <button className=" border p-0 hover:bg-transparent border-transparent justify-center rounded-md  bg-transparent">
                  <img className=" rounded-2xl" src={element?.image_URL} />
                </button>
                <p>ชื่อข่าวสาร</p>
                <input
                  type="text"
                  id="title"
                  defaultValue={element?.title}
                  placeholder="Enter your password"
                  className=" text-main5 font-thin w-full border-2 bg-transparent py-2 pl-4  focus:ring-0 text-sm rounded-lg"
                />
                <p>บทนำ</p>
                <TextareaAutosize
                  id="intro"
                  defaultValue={element?.intro}
                  placeholder="Enter your password"
                  className="text-main5 font-thin w-full border-2 bg-transparent py-2 px-4  focus:ring-0 text-sm rounded-lg"
                />
                <p>รายละเอียด</p>
                <TextareaAutosize
                  id="intro"
                  defaultValue={element?.news_content}
                  placeholder="Enter your password"
                  rows={1}
                  className="text-main5 font-thin w-full border-2 bg-transparent py-2 px-4  focus:ring-0 text-sm rounded-lg"
                />

                <div className="flex flex-row gap-4 mt-4">
                  <button
                    type="button"
                    className=" text-white bg-main10 hover:bg-main20 inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2  focus-visible:ring-offset-2"
                    onClick={closeModal}
                  >
                    บันทึก
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium  bg-validation hover:bg-validation-hover shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                    onClick={closeModal}
                  >
                    ยกเลิก
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
