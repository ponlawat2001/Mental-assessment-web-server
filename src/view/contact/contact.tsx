import moment from "moment";
import { useEffect, useState } from "react";
import { ContactResult } from "../../interfaces/contact.interface";
import ContactServices from "../../services/contact.service";
import facebook from "../../assets/icons/facebook.png";
import line from "../../assets/icons/line.png";
import gmail from "../../assets/icons/gmail.png";
import phone from "../../assets/icons/phone.png";
import { useDropzone } from "react-dropzone";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import StorageService from "../../services/storage.service";

let imageSelecte: File;

function Contact() {
  const [contact, setContact] = useState<ContactResult[] | null>(null);
  const [isEditMode, setEditMode] = useState(false);
  const [isloading, setLoading] = useState(false);
  const [imageUrl, setUploadedImage] = useState<string | null>(null);
  useEffect(() => {
    ContactServices.fecth().then((res) => setContact(res));
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactResult>();

  const onSubmit: SubmitHandler<ContactResult> = async (data) => {
    setLoading(true);
    console.log("submit");
    if (imageUrl != null) {
      const newimageUrl: string[] = await StorageService.uploadImage(
        imageSelecte
      );
      data.image_contact = newimageUrl[0];
    } else {
      data.image_contact = contact![0].image_contact;
    }
    data.id = contact![0].id;
    ContactServices.update(data).then(() => {
      setEditMode(false);
      setLoading(false);
      window.location.reload();
    });
  };

  const onError: SubmitErrorHandler<ContactResult> = (errors) => {
    console.error(errors);
  };
  const switchEditmode = (e: any) => {
    e.preventDefault();
    setEditMode(true);
  };

  const cancleEdit = (e: any) => {
    e.preventDefault();
    setUploadedImage(null);
    setEditMode(false);
    setContact(null);
    window.location.reload();
  };

  const onDrop = (acceptedFiles: File[]) => {
    imageSelecte = acceptedFiles[0];
    setUploadedImage(URL.createObjectURL(acceptedFiles[0]) as string);
  };

  const { getRootProps } = useDropzone({ onDrop });

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} className="w-full">
      <div className="flex flex-col p-4 w-full gap-4">
        <div className="flex flex-row justify-between ">
          <p>ข่าวสารและบทความ</p>
          <p>{moment().format("MMMM Do YYYY")}</p>
        </div>
        <div className=" flex flex-row justify-end gap-4">
          {isloading ? (
            <button
              disabled={true}
              className=" bg-gray-400 w-24 rounded-3xl hover:bg-gray-400"
            >
              Loading
            </button>
          ) : isEditMode ? (
            <>
              <button
                type="submit"
                className=" bg-main10 hover:bg-main20 w-24 rounded-3xl shadow-md "
              >
                บันทึก
              </button>
              <button
                type="button"
                className=" bg-validation hover:bg-validation-hover w-24 rounded-3xl shadow-md "
                onClick={(e) => cancleEdit(e)}
              >
                ยกเลิก
              </button>
            </>
          ) : (
            <button
              type="button"
              className=" bg-edit hover:bg-edit-hover w-24 rounded-3xl shadow-md"
              onClick={(e) => switchEditmode(e)}
            >
              แก้ไข
            </button>
          )}
        </div>
        <div className="w-full bg-main5 rounded" style={{ height: 1 }}></div>
        {contact && contact?.length != 0 ? (
          <div className="flex flex-col gap-4 bg-white p-8 rounded-2xl max-w-4xl self-center">
            {isEditMode ? (
              <div className="rounded-2xl cursor-pointer" {...getRootProps()}>
                <img
                  className=" max-w- rounded-2xl"
                  src={imageUrl ?? contact![0].image_contact}
                />
              </div>
            ) : (
              <img
                className=" max-w- rounded-2xl"
                src={contact![0].image_contact}
              />
            )}

            <p>ติดต่อขอคำปรึกษาได้ที่</p>
            <input
              readOnly={!isEditMode}
              type="text"
              id="name"
              defaultValue={contact![0].name_contact}
              placeholder="Enter Name"
              className={
                (isEditMode ? " bg-transparent " : " bg-gray-200 ") +
                "text-main5 font-thin w-full border-2  py-2 pl-4 focus:ring-0 text-sm rounded-lg"
              }
              {...register("name_contact", {
                required: "Title is required",
              })}
            />
            {errors.name_contact?.message != null ? (
              <span className="text-sm font-thin">
                {errors.name_contact?.message}
              </span>
            ) : null}
            <p>ลักษณะของสถานที่ให้คำปรึกษา</p>
            <input
              readOnly={!isEditMode}
              type="text"
              id="location"
              defaultValue={contact![0].location_contact}
              placeholder="Enter Location"
              className={
                (isEditMode ? " bg-transparent " : " bg-gray-200 ") +
                "text-main5 font-thin w-full border-2  py-2 pl-4 focus:ring-0 text-sm rounded-lg"
              }
              {...register("location_contact", {
                required: "Loacation is required",
              })}
            />
            {errors.location_contact?.message != null ? (
              <span className="text-sm font-thin">
                {errors.location_contact?.message}
              </span>
            ) : null}
            <p>ช่องทางการติดต่ออื่นๆ</p>
            <div className="flex flex-row gap-4">
              <img width={36} src={line} />
              <input
                readOnly={!isEditMode}
                type="text"
                id="line"
                defaultValue={contact![0].line_contact}
                placeholder="Enter Line id"
                className={
                  (isEditMode ? " bg-transparent " : " bg-gray-200 ") +
                  "text-main5 font-thin w-full border-2  py-2 pl-4 focus:ring-0 text-sm rounded-lg"
                }
                {...register("line_contact", {
                  required: "Line ID is required",
                })}
              />
              {errors.line_contact?.message != null ? (
                <span className="text-sm font-thin">
                  {errors.line_contact?.message}
                </span>
              ) : null}
            </div>
            <div className="flex flex-row gap-4">
              <img width={36} src={facebook} />
              <input
                readOnly={!isEditMode}
                type="text"
                id="facebook"
                defaultValue={contact![0].facebook_contact}
                placeholder="Enter Facebook name"
                className={
                  (isEditMode ? " bg-transparent " : " bg-gray-200 ") +
                  "text-main5 font-thin w-full border-2  py-2 pl-4 focus:ring-0 text-sm rounded-lg"
                }
                {...register("facebook_contact", {
                  required: "Facebook is required",
                })}
              />
              {errors.facebook_contact?.message != null ? (
                <span className="text-sm font-thin">
                  {errors.facebook_contact?.message}
                </span>
              ) : null}
            </div>
            <div className="flex flex-row gap-4">
              <img width={36} src={gmail} />
              <input
                readOnly={!isEditMode}
                type="text"
                id="email"
                defaultValue={contact![0].phone_contact}
                placeholder="Enter Facebook name"
                className={
                  (isEditMode ? " bg-transparent " : " bg-gray-200 ") +
                  "text-main5 font-thin w-full border-2 py-2 pl-4 focus:ring-0 text-sm rounded-lg"
                }
                {...register("email_contact", {
                  required: "Email is required",
                })}
              />
              {errors.email_contact?.message != null ? (
                <span className="text-sm font-thin">
                  {errors.email_contact?.message}
                </span>
              ) : null}
            </div>
            <div className="flex gap-4">
              <img width={36} src={phone} />
              <input
                readOnly={!isEditMode}
                type="text"
                id="phone"
                defaultValue={contact![0].phone_contact}
                placeholder="Enter Facebook name"
                className={
                  (isEditMode ? " bg-transparent " : " bg-gray-200 ") +
                  "text-main5 font-thin w-full border-2  py-2 pl-4 focus:ring-0 text-sm rounded-lg"
                }
                {...register("phone_contact", {
                  required: "Phone number is required",
                })}
              />
              {errors.phone_contact?.message != null ? (
                <span className="text-sm font-thin">
                  {errors.phone_contact?.message}
                </span>
              ) : null}
            </div>
          </div>
        ) : (
          <p className="flex py-52 justify-center items-center">ไม่พบข้อมูล</p>
        )}
      </div>
    </form>
  );
}

export default Contact;
