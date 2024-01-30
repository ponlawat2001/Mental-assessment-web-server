import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import {
  Advise,
  Answer,
  AssessmentResult,
  Questionnaire,
  Scorerate,
} from "@app/interfaces/assessment.interface";
import TextareaAutosize from "react-textarea-autosize";
import { useNavigate, useOutletContext } from "react-router-dom";
import rightsign from "@assets/icons/rightsign.svg";
import DropdownMenu from "./assessment.dropdownmenu";
import AssessmentServices from "@app/services/assessment.service";
import React from "react";
import AssessmentConfirmdialog from "./assessment.confirmDialog";

export default function AssessmentEdit() {
  const navigate = useNavigate();
  const [isloading, setLoading] = useState(false);
  const [isopen, setOpen] = useState(false);
  const [assessmentSelected, setSelected] = useOutletContext<
    AssessmentResult | React.SetStateAction<AssessmentResult | any>
  >();
  const [type, setType] = useState(assessmentSelected?.type);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: {},
  } = useForm<AssessmentResult>();

  useEffect(() => {
    if (assessmentSelected) {
      assessmentSelected.scorerate.forEach(
        (element: Scorerate, elementIndex: number) => {
          const initialQuestionnaireNumber = element.questionnairenumber || [];
          setValue(
            `scorerate.${elementIndex}.questionnairenumber`,
            initialQuestionnaireNumber
          );
        }
      );
    }
  }, [assessmentSelected, setValue]);

  const closeDialog = () => {
    setOpen(false);
  };

  const onSubmit: SubmitHandler<AssessmentResult> = async (data) => {
    setLoading(true);
    data.id = assessmentSelected?.id;
    data.type = type;

    let temp = data.answer.length;
    for (let i = 1; i <= temp - assessmentSelected.answer.length; i++) {
      data.answer.pop();
    }

    temp = data.questionnaire.length;
    for (let i = 1; i <= temp - assessmentSelected.questionnaire.length; i++) {
      data.questionnaire.pop();
    }

    temp = data.scorerate.length;
    for (let i = 1; i <= temp - assessmentSelected.scorerate.length; i++) {
      data.scorerate.pop();
    }

    temp = data.advise.length;
    for (let i = 1; i <= temp - assessmentSelected.advise.length; i++) {
      data.advise.pop();
    }

    assessmentSelected.scorerate.map((element: Scorerate, index: number) => {
      temp = data.scorerate[index].rate.length;
      for (let i = 1; i <= temp - element.rate.length; i++) {
        data.scorerate[index].rate.pop();
      }
    });
    if (assessmentSelected.answer.choices) {
      assessmentSelected.answer.map((element: Answer, index: number) => {
        temp = data.answer[index].choices!.length;
        for (let i = 1; i <= temp - element.choices!.length; i++) {
          data.answer[index].choices!.pop();
        }
      });
    }

    for (let i = 1; i <= assessmentSelected.questionnaire.length; i++) {
      data.questionnaire[i - 1].id = i;
    }

    for (let i = 1; i <= assessmentSelected.answer.length; i++) {
      data.answer[i - 1].id = i;
    }

    AssessmentServices.update(data).then(() => {
      window.location.reload();
      setLoading(false);
    });
    console.log(data);
  };

  const onError: SubmitErrorHandler<AssessmentResult> = (errors) => {
    console.error(errors);
  };

  const handleCheckboxChange = (
    elementIndex: number,
    id: number,
    isChecked: boolean
  ) => {
    const currentArray =
      getValues<number[] | any>(
        `scorerate.${elementIndex}.questionnairenumber`
      ) || [];

    if (isChecked) {
      setValue(`scorerate.${elementIndex}.questionnairenumber`, [
        ...currentArray,
        id,
      ]);
    } else {
      setValue(
        `scorerate.${elementIndex}.questionnairenumber`,
        currentArray.filter((item: number) => item != id)
      );
    }
  };

  const handleAnswer = (isDelete: boolean, id: number) => {
    setSelected((prev: AssessmentResult) => {
      let newAnswer;

      if (isDelete) {
        newAnswer = prev.answer.filter((item) => item.id !== id);
      } else {
        newAnswer = [...prev.answer, { id: id, name: "", score: 0 }];
      }
      return { ...prev, answer: newAnswer };
    });
  };

  const handleQuestion = (isDelete: boolean, id: number) => {
    setSelected((prev: AssessmentResult) => {
      let newQuestion;

      if (isDelete) {
        newQuestion = prev.questionnaire.filter((item) => item.id !== id);
      } else {
        newQuestion = [
          ...prev.questionnaire,
          { id: id, title: "", reversescore: false },
        ];
      }
      return { ...prev, questionnaire: newQuestion };
    });
  };

  const handleScorerate = (isDelete: boolean, index: number) => {
    setSelected((prev: AssessmentResult) => {
      let newScorerate;

      if (isDelete) {
        newScorerate = prev.scorerate.filter(
          (_, newindex) => newindex !== index
        );
      } else {
        newScorerate = [
          ...prev.scorerate,
          {
            name: "",
            questionnairenumber: [],
            rate: [{ name: "", score: 0 }],
          },
        ];
      }
      return { ...prev, scorerate: newScorerate };
    });
  };

  const handleAdvise = (isDelete: boolean, index: number) => {
    setSelected((prev: AssessmentResult) => {
      let newAdvise;
      if (isDelete) {
        newAdvise = prev.advise.filter((_, newindex) => newindex !== index);
      } else {
        newAdvise = [
          ...prev.advise,
          {
            rate: 0,
            advise: "",
          },
        ];
      }
      return { ...prev, advise: newAdvise };
    });
  };

  const handleRate = (
    isDelete: boolean,
    index: number,
    scorerateindex: number
  ) => {
    setSelected((prev: AssessmentResult) => {
      const updatedScorerate = [...prev.scorerate];

      if (isDelete) {
        updatedScorerate[scorerateindex].rate.splice(index, 1);
      } else {
        updatedScorerate[scorerateindex].rate.push({ name: "", score: 0 });
      }

      return { ...prev, scorerate: updatedScorerate };
    });
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
      <div className=" flex flex-row justify-between">
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
        {isloading ? (
          <button
            disabled={true}
            className="flex flex-row gap-2 w-fit rounded-xl items-center px-2 bg-gray-400 hover:bg-gray-400 transition"
          >
            Loading
          </button>
        ) : (
          <button
            type="button"
            className="flex flex-row gap-2 w-fit rounded-xl items-center px-2 cursor-pointer bg-white hover:text-main20 transition"
            onClick={() => setOpen(true)}
          >
            <span className="flex justify-start text-md font-medium transition ">
              ลบแบบประเมิน
            </span>
          </button>
        )}
      </div>

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
        <TextareaAutosize
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
          assessmentSelected?.questionnaire.length &&
        assessmentSelected?.answer[0].choices ? (
          <>
            <p>ตัวเลือกทั้งหมดและคะแนน</p>
            {assessmentSelected?.questionnaire.map(
              (element: Questionnaire, index: number) => (
                <React.Fragment key={index}>
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
                    .map((answer: Answer, answerindex: number) => (
                      <React.Fragment key={answerindex}>
                        <p className=" text-md">คำตอบ</p>
                        {answer.choices?.map((e, innerindex) => (
                          <React.Fragment key={innerindex}>
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
                          </React.Fragment>
                        ))}
                      </React.Fragment>
                    ))}

                  {index != assessmentSelected?.questionnaire.length - 1 ? (
                    <div
                      className=" w-full bg-main5 rounded self-center"
                      style={{ height: 1 }}
                    ></div>
                  ) : null}
                </React.Fragment>
              )
            )}
          </>
        ) : (
          <>
            <p>ตัวเลือกทั้งหมดและคะแนน</p>
            {assessmentSelected?.answer.map(
              (element: Answer, index: number) => (
                <React.Fragment key={index}>
                  <div className=" flex flex-row gap-4">
                    <input
                      key={element.id}
                      type="text"
                      defaultValue={element.name}
                      placeholder="Enter title"
                      className=" text-main5 font-thin w-full border-2 bg-transparent py-2 pl-4  focus:ring-0 text-sm rounded-lg"
                      {...register(`answer.${index}.name`, {
                        required: "กรุณาอย่าเว้นว่าง",
                      })}
                    />
                    <input
                      key={element.score}
                      type="text"
                      defaultValue={element.score}
                      placeholder="Enter title"
                      className=" text-main5 font-thin w-full border-2 bg-transparent py-2 pl-4  focus:ring-0 text-sm rounded-lg"
                      {...register(`answer.${index}.score`, {
                        required: "กรุณาอย่าเว้นว่าง",
                        valueAsNumber: true,
                      })}
                    />
                  </div>
                </React.Fragment>
              )
            )}
            <div className="flex flex-row gap-4">
              <button
                type="button"
                className=" bg-white text-main5 border-2"
                onClick={() =>
                  handleAnswer(false, assessmentSelected?.answer.length + 1)
                }
              >
                + เพิ่มตัวเลือก
              </button>
              <button
                type="button"
                className=" bg-white text-main5 border-2"
                onClick={() =>
                  handleAnswer(true, assessmentSelected?.answer.length)
                }
              >
                - ลบตัวเลือก
              </button>
            </div>

            <p>คำถามทั้งหมด</p>
            {assessmentSelected?.questionnaire.map(
              (element: Questionnaire, index: number) => (
                <React.Fragment key={index}>
                  <div className=" flex flex-row gap-4 items-center">
                    <p className=" text-sm font-thin w-max">{index + 1}</p>
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
                </React.Fragment>
              )
            )}
            <div className="flex flex-row gap-4">
              <button
                type="button"
                className=" bg-white text-main5 border-2"
                onClick={() =>
                  handleQuestion(
                    false,
                    assessmentSelected?.questionnaire.length + 1
                  )
                }
              >
                + เพิ่มคำถาม
              </button>
              <button
                type="button"
                className=" bg-white text-main5 border-2"
                onClick={() =>
                  handleQuestion(true, assessmentSelected?.questionnaire.length)
                }
              >
                - ลบคำถาม
              </button>
            </div>
          </>
        )}
      </div>
      <div className="flex flex-col rounded-2xl bg-white gap-4 p-4">
        <p>การคิดคะแนน</p>
        {assessmentSelected?.scorerate.map(
          (element: Scorerate, index: number) => (
            <React.Fragment key={index}>
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
                <div className=" flex flex-wrap gap-2 ">
                  {assessmentSelected.questionnaire.map(
                    (e: Questionnaire, innerindex: number) => (
                      <React.Fragment key={innerindex}>
                        <div className="flex flex-row gap-2 bg-main30 px-3 py-2 rounded-2xl ">
                          <p className=" font-thin text-sm">ข้อ {e.id}</p>
                          <input
                            type="checkbox"
                            defaultChecked={element.questionnairenumber.includes(
                              e.id
                            )}
                            onChange={(event) =>
                              handleCheckboxChange(
                                index,
                                e.id,
                                event.target.checked
                              )
                            }
                          />
                        </div>
                      </React.Fragment>
                    )
                  )}
                </div>
                <p className=" text-sm font-thin w-max justify-center items-center">
                  ผลการประเมิน (นับจากคะแนนรวม)
                </p>
                <div className="flex flex-col gap-4">
                  {element.rate.map((e, rateindex) => (
                    <React.Fragment key={rateindex}>
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
                        <p className=" text-sm font-thin">มากกว่าหรือเท่ากับ</p>
                        <input
                          type="text"
                          id="score"
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
                    </React.Fragment>
                  ))}
                  <div className="flex flex-row gap-4">
                    <button
                      type="button"
                      className=" bg-white text-main5 border-2"
                      onClick={() =>
                        handleRate(
                          false,
                          assessmentSelected?.scorerate[index].rate.length,
                          index
                        )
                      }
                    >
                      + เพิ่มผลการประเมิน
                    </button>
                    <button
                      type="button"
                      className=" bg-white text-main5 border-2"
                      onClick={() =>
                        handleRate(
                          true,
                          assessmentSelected?.scorerate[index].rate.length - 1,
                          index
                        )
                      }
                    >
                      - ลบผลการประเมิน
                    </button>
                  </div>
                  <p className="w-max font-thin text-sm">
                    *จะเลือกผลที่สูงสุดก่อนเสมอ
                  </p>
                </div>
                {index != assessmentSelected?.scorerate.length - 1 ? (
                  <div
                    className=" w-full bg-main5 rounded self-center"
                    style={{ height: 1 }}
                  ></div>
                ) : null}
              </div>
            </React.Fragment>
          )
        )}
      </div>
      <div className="flex flex-row gap-4">
        <button
          type="button"
          className=" bg-white text-main5 border-2"
          onClick={() =>
            handleScorerate(false, assessmentSelected?.scorerate.length + 1)
          }
        >
          + เพิ่มหัวเรื่องการคิดคะแนน
        </button>
        <button
          type="button"
          className=" bg-white text-main5 border-2"
          onClick={() =>
            handleScorerate(true, assessmentSelected?.scorerate.length - 1)
          }
        >
          - ลบหัวเรื่องการคิดคะแนน
        </button>
      </div>
      <div className="flex flex-col rounded-2xl bg-white gap-4 p-4">
        <p>คำแนะนำ</p>
        {assessmentSelected?.advise.map((advise: Advise, index: number) => (
          <React.Fragment key={index}>
            <TextareaAutosize
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
          </React.Fragment>
        ))}
        <div className="flex flex-row gap-4">
          <button
            type="button"
            className=" bg-white text-main5 border-2"
            onClick={() =>
              handleAdvise(false, assessmentSelected?.advise.length + 1)
            }
          >
            + เพิ่มคำแนะนำ
          </button>
          <button
            type="button"
            className=" bg-white text-main5 border-2"
            onClick={() =>
              handleAdvise(true, assessmentSelected?.advise.length - 1)
            }
          >
            - ลบคำแนะนำ
          </button>
        </div>
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
      <AssessmentConfirmdialog
        open={isopen}
        onClose={closeDialog}
        id={assessmentSelected?.id}
      />
    </form>
  );
}
