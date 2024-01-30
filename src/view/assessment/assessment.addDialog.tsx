import { Dialog, Switch, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Advise,
  Answer,
  AssessmentResult,
  Choice,
  Questionnaire,
  Scorerate,
} from "@app/interfaces/assessment.interface";
import TextareaAutosize from "react-textarea-autosize";
import DropdownMenu from "./assessment.dropdownmenu";
import React from "react";
import AssessmentServices from "@app/services/assessment.service";

export default function AssessmentAdddialog(props?: any) {
  const [isloading, setLoading] = useState(false);
  const [assessmentinit, setAssessmentInit] = useState<AssessmentResult | any>(
    null
  );
  const [ismultiChoicemode, setmode] = useState(false);
  const [type, setType] = useState("");

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: {},
  } = useForm<AssessmentResult>();

  const handleRate = (
    isDelete: boolean,
    index: number,
    scorerateindex: number
  ) => {
    setAssessmentInit((prev: AssessmentResult) => {
      const updatedScorerate = [...prev.scorerate];

      if (isDelete) {
        updatedScorerate[scorerateindex].rate.splice(index, 1);
      } else {
        updatedScorerate[scorerateindex].rate.push({ name: "", score: 0 });
      }

      return { ...prev, scorerate: updatedScorerate };
    });
  };

  const handleAnswer = (isDelete: boolean, id: number) => {
    setAssessmentInit((prev: AssessmentResult) => {
      let newAnswer;

      if (isDelete) {
        newAnswer = prev.answer.filter((item) => item.id !== id);
      } else {
        newAnswer = [...prev.answer, { id: id, name: "", score: 0 }];
      }
      return { ...prev, answer: newAnswer };
    });
  };

  const handleAnswerChoice = (
    isDelete: boolean,
    index: number,
    indexAnswer: number
  ) => {
    setAssessmentInit((prev: AssessmentResult) => {
      let updatedAnswer = [...prev.answer];

      if (isDelete) {
        updatedAnswer[indexAnswer].choices!.splice(index, 1);
      } else {
        updatedAnswer[indexAnswer].choices!.push({
          name: "",
          score: 0,
        } as Choice);
      }
      return { ...prev, answer: updatedAnswer };
    });
  };

  const handleAdvise = (isDelete: boolean, index: number) => {
    setAssessmentInit((prev: AssessmentResult) => {
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

  const handleScorerate = (isDelete: boolean, index: number) => {
    setAssessmentInit((prev: AssessmentResult) => {
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

  const handleQuestion = (isDelete: boolean, id: number) => {
    setAssessmentInit((prev: AssessmentResult) => {
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

  const handleChoices = (isDelete: boolean, id: number) => {
    setAssessmentInit((prev: AssessmentResult) => {
      let newAnswer;

      if (isDelete) {
        newAnswer = prev.answer.filter((item) => item.id !== id);
      } else {
        newAnswer = [...prev.answer, { id: id, choices: [] } as Answer];
      }
      return { ...prev, answer: newAnswer };
    });
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

  const onSubmit: SubmitHandler<AssessmentResult> = async (data) => {
    setLoading(true);
    data.id = assessmentinit?.id;
    data.type = type;

    let temp = data.answer.length;
    for (let i = 1; i <= temp - assessmentinit.answer.length; i++) {
      data.answer.pop();
    }

    temp = data.questionnaire.length;
    for (let i = 1; i <= temp - assessmentinit.questionnaire.length; i++) {
      data.questionnaire.pop();
    }

    temp = data.scorerate.length;
    for (let i = 1; i <= temp - assessmentinit.scorerate.length; i++) {
      data.scorerate.pop();
    }

    temp = data.advise.length;
    for (let i = 1; i <= temp - assessmentinit.advise.length; i++) {
      data.advise.pop();
    }

    assessmentinit.scorerate.map((element: Scorerate, index: number) => {
      temp = data.scorerate[index].rate.length;
      for (let i = 1; i <= temp - element.rate.length; i++) {
        data.scorerate[index].rate.pop();
      }
    });
    if (assessmentinit.answer.choices) {
      assessmentinit.answer.map((element: Answer, index: number) => {
        temp = data.answer[index].choices!.length;
        for (let i = 1; i <= temp - element.choices!.length; i++) {
          data.answer[index].choices!.pop();
        }
      });
    }

    for (let i = 1; i <= assessmentinit.questionnaire.length; i++) {
      data.questionnaire[i - 1].id = i;
    }

    for (let i = 1; i <= assessmentinit.answer.length; i++) {
      data.answer[i - 1].id = i;
    }

    AssessmentServices.create(data).then(() => {
      window.location.reload();
      setLoading(false);
    });
    console.log(data);
  };

  const initAssessment = (e: any, ismode: boolean) => {
    var temp: AssessmentResult = !ismode
      ? ({
          name: "",
          description: "",
          type: "other",
          questionnaire: [
            { id: 1, title: "", reversescore: false },
          ] as Questionnaire[],
          answer: [{ name: "", score: 0 }] as Answer[],
          scorerate: [
            {
              name: "",
              rate: [{ name: "", score: 0 }] as Choice[],
              questionnairenumber: [] as number[],
            },
          ] as Scorerate[],
          advise: [{ name: "", advise: "", rate: 0 }] as Advise[],
        } as AssessmentResult)
      : ({
          name: "",
          description: "",
          type: "other",
          questionnaire: [
            { id: 1, title: "", reversescore: false },
          ] as Questionnaire[],
          answer: [
            {
              id: 1,
              choices: [{ name: "", score: 0 }] as Choice[],
            },
          ] as Answer[],
          scorerate: [
            {
              name: "",
              rate: [{ name: "", score: 0 }] as Choice[],
              questionnairenumber: [] as number[],
            },
          ] as Scorerate[],
          advise: [{ name: "", advise: "", rate: 0 }] as Advise[],
        } as AssessmentResult);
    e ? e.preventDefault() : null;
    setAssessmentInit(temp);
  };
  useEffect(() => {
    //incase questionnaire != answer
    if (assessmentinit == null) {
      initAssessment(null, false);
    }
  }, [assessmentinit, initAssessment]);
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
              <Dialog.Panel className=" w-3/4 gap-2 items-center max-w-screen transform overflow-hidden rounded-2xl bg-main30 p-6 text-left align-middle shadow-xl transition-all flex flex-col">
                <form
                  className="w-full justify-center flex flex-col items-center gap-4"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="flex flex-col rounded-2xl bg-white gap-4 p-4 w-full">
                    <div className=" flex flex-row">
                      <div className="flex flex-row items-center justify-between w-full gap-4">
                        <p>ชื่อแบบประเมิน</p>
                        <div className="flex flex-row items-center gap-2">
                          <p className=" font-thin text-sm">
                            ตัวเลือกแตกต่างกัน
                          </p>
                          <Switch
                            checked={ismultiChoicemode}
                            onChange={(e) => {
                              setmode(!ismultiChoicemode);
                              initAssessment(e, ismultiChoicemode);
                            }}
                            className={`${
                              ismultiChoicemode
                                ? "bg-teal-700 hover:bg-teal-700"
                                : "bg-gray-400 hover:bg-gray-400"
                            }
          relative inline-flex h-[38px] w-[74px]  shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75 gap-4`}
                          >
                            <span
                              aria-hidden="true"
                              className={`${
                                ismultiChoicemode
                                  ? "translate-x-9"
                                  : "translate-x-0"
                              }
             pointer-events-none inline-block h-full w-full transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                            />
                            <span
                              aria-hidden="true"
                              className={`${
                                ismultiChoicemode
                                  ? "translate-x-9"
                                  : "translate-x-0"
                              }
             pointer-events-none inline-block h-full w-full bg-transparent`}
                            />
                          </Switch>
                        </div>
                      </div>
                    </div>
                    <input
                      type="text"
                      placeholder="ระบุชื่อแบบประเมิน"
                      className=" text-main5 font-thin w-full border-2 bg-transparent py-2 pl-4  focus:ring-0 text-sm rounded-lg"
                      {...register("name", {
                        required: "กรุณาอย่าเว้นว่าง",
                      })}
                    />
                    <p>คำอธิบายแบบประเมิน</p>
                    <TextareaAutosize
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
                    {ismultiChoicemode ? (
                      <>
                        <p>ตัวเลือกทั้งหมดและคะแนน</p>
                        {assessmentinit?.questionnaire.map(
                          (element: Questionnaire, index: number) => (
                            <React.Fragment key={index}>
                              <p className=" text-md">คำถาม</p>
                              <div className=" flex flex-row gap-4">
                                <input
                                  type="text"
                                  placeholder="ระบุคำถาม"
                                  className=" text-main5 font-thin w-full border-2 bg-transparent py-2 pl-4  focus:ring-0 text-sm rounded-lg"
                                  {...register(`questionnaire.${index}.title`, {
                                    required: "กรุณาอย่าเว้นว่าง",
                                  })}
                                />
                              </div>
                              {assessmentinit?.answer
                                .filter(
                                  (value: Answer) => value.id == element.id
                                )
                                .map((answer: Answer, answerindex: number) => (
                                  <React.Fragment key={answerindex}>
                                    <p className=" text-md">คำตอบ</p>
                                    {answer.choices?.map((e, innerindex) => (
                                      <React.Fragment key={innerindex}>
                                        <div className=" flex flex-row gap-4">
                                          <input
                                            type="text"
                                            placeholder="ระบุคำตอบ"
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
                                            placeholder="ระบุคะแนน"
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
                                    <div className="flex flex-row gap-4">
                                      <button
                                        type="button"
                                        className=" bg-white text-main5 border-2"
                                        onClick={() =>
                                          handleAnswerChoice(
                                            false,
                                            answer.choices!.length - 1,
                                            index
                                          )
                                        }
                                      >
                                        + เพิ่มคำตอบ
                                      </button>
                                      <button
                                        type="button"
                                        className=" bg-white text-main5 border-2"
                                        onClick={() => {
                                          handleAnswerChoice(
                                            true,
                                            answer.choices!.length - 1,
                                            index
                                          );
                                        }}
                                      >
                                        - ลบคำตอบ
                                      </button>
                                    </div>
                                  </React.Fragment>
                                ))}

                              {index !=
                              assessmentinit?.questionnaire.length - 1 ? (
                                <div
                                  className=" w-full bg-main5 rounded self-center"
                                  style={{ height: 1 }}
                                ></div>
                              ) : null}
                            </React.Fragment>
                          )
                        )}
                        <div className="flex flex-row gap-4">
                          <button
                            type="button"
                            className=" bg-white text-main5 border-2"
                            onClick={() => {
                              handleQuestion(
                                false,
                                assessmentinit?.questionnaire.length + 1
                              );
                              handleChoices(
                                false,
                                assessmentinit?.questionnaire.length + 1
                              );
                            }}
                          >
                            + เพิ่มคำถาม
                          </button>
                          <button
                            type="button"
                            className=" bg-white text-main5 border-2"
                            onClick={() => {
                              handleQuestion(
                                true,
                                assessmentinit?.questionnaire.length
                              );
                              handleChoices(
                                true,
                                assessmentinit?.questionnaire.length
                              );
                            }}
                          >
                            - ลบคำถาม
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <p>ตัวเลือกทั้งหมดและคะแนน</p>
                        {assessmentinit?.answer.map(
                          (_: Answer, index: number) => (
                            <React.Fragment key={index}>
                              <div className=" flex flex-row gap-4">
                                <input
                                  type="text"
                                  placeholder="ระบุตัวเลือก"
                                  className=" text-main5 font-thin w-full border-2 bg-transparent py-2 pl-4  focus:ring-0 text-sm rounded-lg"
                                  {...register(`answer.${index}.name`, {
                                    required: "กรุณาอย่าเว้นว่าง",
                                  })}
                                />
                                <input
                                  type="text"
                                  placeholder="ระบุคะแนน"
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
                              handleAnswer(
                                false,
                                assessmentinit?.answer.length + 1
                              )
                            }
                          >
                            + เพิ่มตัวเลือก
                          </button>
                          <button
                            type="button"
                            className=" bg-white text-main5 border-2"
                            onClick={() =>
                              handleAnswer(true, assessmentinit?.answer.length)
                            }
                          >
                            - ลบตัวเลือก
                          </button>
                        </div>

                        <p>คำถามทั้งหมด</p>
                        {assessmentinit?.questionnaire.map(
                          (element: Questionnaire, index: number) => (
                            <React.Fragment key={index}>
                              <div className=" flex flex-row gap-4 items-center">
                                <p className=" text-sm font-thin w-max">
                                  {index + 1}
                                </p>
                                <input
                                  type="text"
                                  placeholder="ระบุคำถาม"
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
                                  {...register(
                                    `questionnaire.${index}.reversescore`,
                                    {
                                      setValueAs: Boolean,
                                    }
                                  )}
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
                                assessmentinit?.questionnaire.length + 1
                              )
                            }
                          >
                            + เพิ่มคำถาม
                          </button>
                          <button
                            type="button"
                            className=" bg-white text-main5 border-2"
                            onClick={() =>
                              handleQuestion(
                                true,
                                assessmentinit?.questionnaire.length
                              )
                            }
                          >
                            - ลบคำถาม
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="flex flex-col rounded-2xl bg-white gap-4 p-4 w-full">
                    <p>การคิดคะแนน</p>
                    {assessmentinit?.scorerate.map(
                      (element: Scorerate, index: number) => (
                        <React.Fragment key={index}>
                          <div className=" flex flex-col gap-4">
                            <p className=" text-sm font-thin w-max justify-center items-center ">
                              หัวเรื่องด้านการคิดคะแนน
                            </p>
                            <input
                              type="text"
                              placeholder="ระบุหัวข้อด้านการประเมิน"
                              className=" text-main5 font-thin w-full border-2 bg-transparent py-2 pl-4  focus:ring-0 text-sm rounded-lg"
                              {...register(`scorerate.${index}.name`, {
                                required: "กรุณาอย่าเว้นว่าง",
                              })}
                            />
                            <div className=" flex flex-wrap gap-2 ">
                              {assessmentinit.questionnaire.map(
                                (e: Questionnaire, innerindex: number) => (
                                  <React.Fragment key={innerindex}>
                                    <div className="flex flex-row gap-2 bg-main30 px-3 py-2 rounded-2xl ">
                                      <p className=" font-thin text-sm">
                                        ข้อ {e.id}
                                      </p>
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
                                      placeholder="ระบุผลการประเมิน"
                                      className=" text-main5 font-thin w-full border-2 bg-transparent py-2 pl-4  focus:ring-0 text-sm rounded-lg"
                                      {...register(
                                        `scorerate.${index}.rate.${rateindex}.name`,
                                        {
                                          required: "กรุณาอย่าเว้นว่าง",
                                        }
                                      )}
                                    />
                                    <p className=" text-sm font-thin">
                                      มากกว่าหรือเท่ากับ
                                    </p>
                                    <input
                                      type="text"
                                      id="score"
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
                                      assessmentinit?.scorerate[index].rate
                                        .length,
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
                                      assessmentinit?.scorerate[index].rate
                                        .length - 1,
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
                            {index != assessmentinit?.scorerate.length - 1 ? (
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
                  <div className="flex flex-row gap-4 w-full">
                    <button
                      type="button"
                      className=" bg-white text-main5 border-2"
                      onClick={() =>
                        handleScorerate(
                          false,
                          assessmentinit?.scorerate.length + 1
                        )
                      }
                    >
                      + เพิ่มหัวเรื่องการคิดคะแนน
                    </button>
                    <button
                      type="button"
                      className=" bg-white text-main5 border-2"
                      onClick={() =>
                        handleScorerate(
                          true,
                          assessmentinit?.scorerate.length - 1
                        )
                      }
                    >
                      - ลบหัวเรื่องการคิดคะแนน
                    </button>
                  </div>
                  <div className="flex flex-col rounded-2xl bg-white gap-4 p-4 w-full">
                    <p>คำแนะนำ</p>
                    {assessmentinit?.advise.map((_: Advise, index: number) => (
                      <React.Fragment key={index}>
                        <TextareaAutosize
                          id="advise"
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
                            placeholder="ระบุขั้นต่ำของคะแนนรวม"
                            className=" text-main5 font-thin w-fit border-2 bg-transparent py-2 pl-4  focus:ring-0 text-sm rounded-lg"
                            {...register(`advise.${index}.rate`, {
                              valueAsNumber: true,
                              required: "กรุณาอย่าเว้นว่าง",
                            })}
                          />
                        </div>

                        {index != assessmentinit?.advise.length - 1 ? (
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
                          handleAdvise(false, assessmentinit?.advise.length + 1)
                        }
                      >
                        + เพิ่มคำแนะนำ
                      </button>
                      <button
                        type="button"
                        className=" bg-white text-main5 border-2"
                        onClick={() =>
                          handleAdvise(true, assessmentinit?.advise.length - 1)
                        }
                      >
                        - ลบคำแนะนำ
                      </button>
                    </div>
                  </div>

                  <div className="flex w-full flex-row gap-4 ">
                    {isloading ? (
                      <button
                        disabled={true}
                        className=" justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2  focus-visible:ring-offset-2 bg-gray-400 hover:bg-gray-400 transition"
                      >
                        Loading
                      </button>
                    ) : (
                      <>
                        <button
                          type="submit"
                          className=" text-white  bg-main10 hover:bg-main20 inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2  focus-visible:ring-offset-2 transition"
                        >
                          บันทึก
                        </button>
                        <button
                          type="button"
                          className="inline-flex justify-center bg-validation hover:bg-validation-hover rounded-md border border-transparent px-4 py-2 text-sm font-medium  shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                          onClick={props.onClose}
                        >
                          ยกเลิก
                        </button>
                      </>
                    )}
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
