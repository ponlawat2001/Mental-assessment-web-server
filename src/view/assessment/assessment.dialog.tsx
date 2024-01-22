import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import {
  Advise,
  Answer,
  AssessmentResult,
  Questionnaire,
  Scorerate,
} from "@app/interfaces/assessment.interface";
import { useNavigate, useOutletContext } from "react-router-dom";
import rightsign from "@assets/icons/rightsign.svg";
import DropdownMenu from "./assessment.dropdownmenu";
import AssessmentServices from "@app/services/assessment.service";

export default function AssessmentEdit() {
  const navigate = useNavigate();
  const [isloading, setLoading] = useState(false);
  const [assessmentSelected, setSelected] = useOutletContext<
    AssessmentResult | React.SetStateAction<AssessmentResult | any>
  >();
  const [type, setType] = useState(assessmentSelected?.type);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AssessmentResult>();

  const onSubmit: SubmitHandler<AssessmentResult> = async (data) => {
    setLoading(true);
    data.id = assessmentSelected?.id;
    data.type = type;
    for (let i = 1; i <= assessmentSelected.questionnaire.length; i++) {
      data.questionnaire[i - 1].id = i;
    }
    for (let i = 1; i <= assessmentSelected.answer.length; i++) {
      data.answer[i - 1].id = i;
    }
    // AssessmentServices.update(data);
    setLoading(false);
    // window.location.reload();
    console.log(data);
  };

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
      <div className="flex flex-col rounded-2xl bg-white gap-4 p-4">
        <p>ชื่อแบบประเมิน</p>
        <input
          type="text"
          defaultValue={assessmentSelected?.name}
          placeholder="ระบุชื่อแบบประเมิน"
          className=" text-main5 font-thin w-full border-2 bg-transparent py-2 pl-4  focus:ring-0 text-sm rounded-lg"
          {...register("name", {
            required: "กรุณาอย่าเว้นว่าง",
          })}
        />
        <p>คำอธิบายแบบประเมิน</p>
        <input
          type="text"
          defaultValue={assessmentSelected?.description}
          placeholder="ระบุคำอธิบาย"
          className=" text-main5 font-thin w-full border-2 bg-transparent py-2 pl-4  focus:ring-0 text-sm rounded-lg"
          {...register("description", {
            required: "กรุณาอย่าเว้นว่าง",
          })}
        />
        <div className=" flex flex-row gap-4 items-center">
          <p>ชนิดแบบประเมิน</p>
          <DropdownMenu type={type} setType={setType} />
        </div>
        {assessmentSelected?.answer.length ==
        assessmentSelected?.questionnaire.length ? (
          <>
            <p>ตัวเลือกทั้งหมดและคะแนน</p>
            {assessmentSelected?.questionnaire.map(
              (element: Questionnaire, index: number) => (
                <>
                  <p className=" text-md">คำถาม</p>
                  <div className=" flex flex-row gap-4">
                    <input
                      type="text"
                      defaultValue={element.title}
                      placeholder="Enter title"
                      className=" text-main5 font-thin w-full border-2 bg-transparent py-2 pl-4  focus:ring-0 text-sm rounded-lg"
                      {...register(`questionnaire.${index}.title`, {
                        required: "กรุณาอย่าเว้นว่าง",
                      })}
                    />
                  </div>
                  {assessmentSelected?.answer
                    .filter((value: Answer) => value.id == element.id)
                    .map((answer: Answer) => (
                      <>
                        <p className=" text-md">คำตอบ</p>
                        {answer.choices?.map((e, innerindex) => (
                          <div className=" flex flex-row gap-4">
                            <input
                              type="text"
                              defaultValue={e.name}
                              placeholder="Enter title"
                              className=" text-main5 font-thin w-full border-2 bg-transparent py-2 pl-4  focus:ring-0 text-sm rounded-lg"
                              {...register(
                                `answer.${index}.choices.${innerindex}.name`,
                                {
                                  required: "กรุณาอย่าเว้นว่าง",
                                }
                              )}
                            />
                            <input
                              type="text"
                              id="score"
                              defaultValue={e.score}
                              placeholder="Enter title"
                              className=" text-main5 font-thin w-full border-2 bg-transparent py-2 pl-4  focus:ring-0 text-sm rounded-lg"
                              {...register(
                                `answer.${index}.choices.${innerindex}.score`,
                                {
                                  required: "กรุณาอย่าเว้นว่าง",
                                  valueAsNumber: true,
                                }
                              )}
                            />
                          </div>
                        ))}
                      </>
                    ))}
                  {index != assessmentSelected?.questionnaire.length - 1 ? (
                    <div
                      className=" w-full bg-main5 rounded self-center"
                      style={{ height: 1 }}
                    ></div>
                  ) : null}
                </>
              )
            )}
          </>
        ) : (
          <>
            <p>ตัวเลือกทั้งหมดและคะแนน</p>
            {assessmentSelected?.answer.map(
              (element: Answer, index: number) => (
                <div className=" flex flex-row gap-4">
                  <input
                    type="text"
                    id="name"
                    defaultValue={element.name}
                    placeholder="Enter title"
                    className=" text-main5 font-thin w-full border-2 bg-transparent py-2 pl-4  focus:ring-0 text-sm rounded-lg"
                    {...register(`answer.${index}.name`, {
                      required: "กรุณาอย่าเว้นว่าง",
                    })}
                  />
                  <input
                    type="text"
                    id="score"
                    defaultValue={element.score}
                    placeholder="Enter title"
                    className=" text-main5 font-thin w-full border-2 bg-transparent py-2 pl-4  focus:ring-0 text-sm rounded-lg"
                    {...register(`answer.${index}.score`, {
                      required: "กรุณาอย่าเว้นว่าง",
                      valueAsNumber: true,
                    })}
                  />
                </div>
              )
            )}
            <p>คำถามทั้งหมด</p>
            {assessmentSelected?.questionnaire.map(
              (element: Questionnaire, index: number) => (
                <div className=" flex flex-row gap-4">
                  <input
                    type="text"
                    defaultValue={element.title}
                    placeholder="Enter title"
                    className=" text-main5 font-thin w-full border-2 bg-transparent py-2 pl-4  focus:ring-0 text-sm rounded-lg"
                    {...register(`questionnaire.${index}.title`, {
                      required: "กรุณาอย่าเว้นว่าง",
                    })}
                  />
                  <p className=" text-sm font-thin w-max justify-center items-center">
                    กลับคะแนน
                  </p>
                  <input
                    type="checkbox"
                    defaultChecked={element.reversescore}
                    className=" text-main5 font-thin w-fit border-2 bg-transparent py-2 pl-4  focus:ring-0 text-sm rounded-lg"
                    {...register(`questionnaire.${index}.reversescore`, {
                      setValueAs: Boolean,
                    })}
                  />
                </div>
              )
            )}
          </>
        )}
      </div>
      <div className="flex flex-col rounded-2xl bg-white gap-4 p-4">
        <p>การคิดคะแนน</p>
        {assessmentSelected?.scorerate.map(
          (element: Scorerate, index: number) => (
            <div className=" flex flex-col gap-4">
              <p className=" text-sm font-thin w-max justify-center items-center ">
                หัวเรื่องด้านการคิดคะแนน
              </p>
              <input
                type="text"
                id="name"
                defaultValue={element.name}
                placeholder="Enter title"
                className=" text-main5 font-thin w-full border-2 bg-transparent py-2 pl-4  focus:ring-0 text-sm rounded-lg"
                {...register(`scorerate.${index}.name`, {
                  required: "กรุณาอย่าเว้นว่าง",
                })}
              />
              <div className="flex flex-wrap gap-2">
                {assessmentSelected.questionnaire.map(
                  (e: Questionnaire, innerindex: number) => (
                    <div
                      className="flex flex-row gap-2 bg-main30 px-3 py-2 rounded-2xl"
                      key={innerindex}
                    >
                      <p className="font-thin text-sm">ข้อ {e.id}</p>
                      <input
                        type="checkbox"
                        defaultChecked={element.questionnairenumber.includes(
                          e.id
                        )}
                        // Uncomment the following line if you want to provide a specific value
                        // value={e.id}
                        {...register(
                          `scorerate.${index}.questionnairenumber.${innerindex}`,
                          {
                            valueAsNumber: true,
                            ...(element.questionnairenumber.includes(e.id) && {
                              required: true, // Register only if the checkbox is checked
                            }),
                          }
                        )}
                      />
                    </div>
                  )
                )}
              </div>

              <p className=" text-sm font-thin w-max justify-center items-center">
                ผลการประเมิน
              </p>
              <div className="flex flex-col gap-4">
                {element.rate.map((e, rateindex) => (
                  <div className=" flex flex-row gap-4 ">
                    <input
                      type="text"
                      defaultValue={e.name}
                      placeholder="Enter title"
                      className=" text-main5 font-thin w-full border-2 bg-transparent py-2 pl-4  focus:ring-0 text-sm rounded-lg"
                      {...register(
                        `scorerate.${index}.rate.${rateindex}.name`,
                        {
                          required: "กรุณาอย่าเว้นว่าง",
                        }
                      )}
                    />
                    <input
                      type="text"
                      defaultValue={e.score}
                      placeholder="ระบุขั้นต่ำของคะแนนรวม"
                      className=" text-main5 font-thin w-full border-2 bg-transparent py-2 pl-4  focus:ring-0 text-sm rounded-lg"
                      {...register(
                        `scorerate.${index}.rate.${rateindex}.score`,
                        {
                          valueAsNumber: true,
                          required: "กรุณาอย่าเว้นว่าง",
                        }
                      )}
                    />
                  </div>
                ))}
                <div className=" flex flex-col text-sm font-thin w-max justify-center items-start">
                  {element.rate.map((e) => (
                    <p>
                      {"ได้รับ " +
                        '"' +
                        e.name +
                        '"' +
                        " เมื่อคะแนนรวม " +
                        e.score +
                        " ขึ้นไป "}
                    </p>
                  ))}
                  <p> *จะเลือกผลที่สูงสุดก่อนเสมอ</p>
                </div>
              </div>
              {index != assessmentSelected?.scorerate.length - 1 ? (
                <div
                  className=" w-full bg-main5 rounded self-center"
                  style={{ height: 1 }}
                ></div>
              ) : null}
            </div>
          )
        )}
      </div>
      <div className="flex flex-col rounded-2xl bg-white gap-4 p-4">
        <p>คำแนะนำ</p>
        {assessmentSelected?.advise.map((advise: Advise, index: number) => (
          <>
            <textarea
              id="advise"
              defaultValue={advise.advise}
              placeholder="ระบุคำแนะนำ"
              className=" h-auto text-main5 font-thin w-full border-2 bg-transparent py-2 pl-4  focus:ring-0 text-sm rounded-lg"
              {...register(`advise.${index}.advise`, {
                required: "กรุณาอย่าเว้นว่าง",
              })}
            />
            <div className=" flex flex-row justify-between items-center">
              <p>เมื่อได้คะแนนรวมมากกว่า</p>
              <input
                type="text"
                id="advise"
                defaultValue={advise.rate}
                placeholder="ระบุขั้นต่ำของคะแนนรวม"
                className=" text-main5 font-thin w-fit border-2 bg-transparent py-2 pl-4  focus:ring-0 text-sm rounded-lg"
                {...register(`advise.${index}.rate`, {
                  valueAsNumber: true,
                  required: "กรุณาอย่าเว้นว่าง",
                })}
              />
            </div>
            {index != assessmentSelected?.advise.length - 1 ? (
              <div
                className=" w-full bg-main5 rounded self-center"
                style={{ height: 1 }}
              ></div>
            ) : null}
          </>
        ))}
      </div>

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
    </form>
  );
}
