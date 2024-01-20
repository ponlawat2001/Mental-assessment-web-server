import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { AssessmentResult } from "@app/interfaces/assessment.interface";
import { useNavigate, useOutletContext } from "react-router-dom";
import rightsign from "@assets/icons/rightsign.svg";

export default function AssessmentEdit() {
  const navigate = useNavigate();
  const [isloading, setLoading] = useState(false);
  const [assessmentSelected, setSelected] = useOutletContext<
    AssessmentResult | any
  >();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AssessmentResult>();

  const onSubmit: SubmitHandler<AssessmentResult> = async (data) => {};

  const onError: SubmitErrorHandler<AssessmentResult> = (errors) => {
    console.error(errors);
  };

  const goback = () => {
    setSelected(null);
    navigate(-1);
  };

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <button
        type="button"
        className="flex flex-row gap-2 w-fit rounded-xl items-center px-2 cursor-pointer bg-white hover:text-main20 transition"
        onClick={goback}
      >
        <img src={rightsign} />
        <p className="flex justify-start text-md font-medium  transition ">
          ย้อนกลับ
        </p>
      </button>
      <div className="flex flex-col gap-4 bg-white p-4 rounded-2xl">
        <p>ชื่อข่าวสาร</p>
        <input
          type="text"
          id="title"
          defaultValue={assessmentSelected?.name}
          placeholder="Enter title"
          className=" text-main5 font-thin w-full border-2 bg-transparent py-2 pl-4  focus:ring-0 text-sm rounded-lg"
        />

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
          </div>
        )}
      </div>
    </form>
  );
}
