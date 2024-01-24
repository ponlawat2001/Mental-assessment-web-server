import { NewsResult } from "@interfaces/news.interface";
import { Dialog, Transition } from "@headlessui/react";
import TextareaAutosize from "react-textarea-autosize";
import { useDropzone } from "react-dropzone";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { Fragment, useState } from "react";
import StorageService from "@services/storage.service";
import NewsService from "@services/news.service";
import Image from "@assets/icons/image.png";

let imageSelecte: File;

export default function Editdialog(props?: any) {
  const [isloading, setLoading] = useState(false);

  const onDrop = (acceptedFiles: File[]) => {
    imageSelecte = acceptedFiles[0];
    props.setUploadedImage(URL.createObjectURL(acceptedFiles[0]) as string);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewsResult>();

  const onSubmit: SubmitHandler<NewsResult> = async (data) => {
    if (props.element != null) {
      setLoading(true);
      if (props.uploadedImage != null) {
        const newimageUrl: string[] = await StorageService.uploadImage(
          imageSelecte
        );
        data.image_URL = newimageUrl[0];
      } else {
        data.image_URL = props.element?.image_URL;
      }
      data.id = props.element?.id;
      NewsService.update(data).then(() => {
        setLoading(false);
        props.onClose();
        window.location.reload();
      });
    } else {
      if (props.uploadedImage != null) {
        setLoading(true);
        const newimageUrl: string[] = await StorageService.uploadImage(
          imageSelecte
        );
        data.image_URL = newimageUrl[0];
        NewsService.create(data).then(() => {
          setLoading(false);
          props.onClose();
          window.location.reload();
        });
      }
    }
  };

  const onError: SubmitErrorHandler<NewsResult> = (errors) => {
    console.error(errors);
  };

  const { getRootProps } = useDropzone({ onDrop });
  return (
    <Transition appear show={props.open} as={Fragment}>
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all flex flex-col">
                <form
                  className="flex flex-col gap-4"
                  onSubmit={handleSubmit(onSubmit, onError)}
                >
                  <div
                    className="rounded-2xl cursor-pointer"
                    {...getRootProps()}
                  >
                    {props.element == null && props.uploadedImage == null ? (
                      <div className="flex flex-col border-2 gap-2 border-gray justify-center items-center rounded-2xl h-52">
                        <img width={24} src={Image} />
                        <p className=" font-thin text-sm">Upload image</p>
                        <span className="text-sm font-thin ">
                          image is required
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-col">
                        <img
                          className="rounded-2xl max-h-52 object-cover object-center"
                          src={
                            props.uploadedImage == null
                              ? props.element?.image_URL
                              : props.uploadedImage
                          }
                          alt="Uploaded"
                        />
                      </div>
                    )}
                  </div>
                  <p>ชื่อข่าวสาร</p>
                  <input
                    type="text"
                    id="title"
                    defaultValue={props.element?.title}
                    placeholder="Enter title"
                    className=" text-main5 font-thin w-full border-2 bg-transparent py-2 pl-4  focus:ring-0 text-sm rounded-lg"
                    {...register("title", {
                      required: "title is required",
                    })}
                  />
                  {errors.title?.message != null ? (
                    <span className="text-sm font-thin">
                      {errors.title?.message}
                    </span>
                  ) : null}
                  <p>บทนำ</p>
                  <TextareaAutosize
                    id="intro"
                    defaultValue={props.element?.intro}
                    placeholder="Enter intro"
                    className="text-main5 font-thin w-full border-2 bg-transparent py-2 px-4  focus:ring-0 text-sm rounded-lg"
                    {...register("intro", {
                      required: "intro is required",
                    })}
                  />
                  {errors.intro?.message != null ? (
                    <span className="text-sm font-thin">
                      {errors.intro?.message}
                    </span>
                  ) : null}
                  <p>รายละเอียด</p>
                  <TextareaAutosize
                    id="content"
                    defaultValue={props.element?.news_content}
                    placeholder="Enter content"
                    className="text-main5 font-thin w-full border-2 bg-transparent py-2 px-4  focus:ring-0 text-sm rounded-lg"
                    {...register("news_content", {
                      required: "content is required",
                    })}
                  />
                  {errors.news_content?.message != null ? (
                    <span className="text-sm font-thin">
                      {errors.news_content?.message}
                    </span>
                  ) : null}

                  {isloading ? (
                    <button
                      disabled={true}
                      className=" bg-gray-400 hover:bg-gray-400 transition"
                    >
                      Loading
                    </button>
                  ) : (
                    <div className="flex flex-row gap-4 mt-4">
                      <button
                        type="submit"
                        className=" text-white bg-main10 hover:bg-main20 inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2  focus-visible:ring-offset-2 transition"
                      >
                        บันทึก
                      </button>
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium  bg-validation hover:bg-validation-hover shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 transition"
                        onClick={props.onClose}
                      >
                        ยกเลิก
                      </button>
                    </div>
                  )}
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
