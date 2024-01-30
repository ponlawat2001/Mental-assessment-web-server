import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import AuthServices from "@app/services/auth.service";
import { SubmitHandler, useForm } from "react-hook-form";
import Eyeclose from "@assets/icons/eye-close.png";
import Eyeopen from "@assets/icons/eye-open.png";

export default function Admindialog(props?: any) {
  const [isloading, setLoading] = useState(false);
  const [isSecret, setSecret] = useState("password");
  const [eyestate, setEyestate] = useState(false);
  const [errortext, serErrortext] = useState("");

  const secretChange = () => {
    if (isSecret == "password") {
      setSecret("text");
      setEyestate(false);
    } else {
      setSecret("password");
      setEyestate(true);
    }
  };

  type FormData = {
    email: string;
    password: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setLoading(true);
    AuthServices.createUser(data.email, data.password).then((res: string) => {
      if (res.includes("email-already-in-use")) {
        serErrortext("อีเมลนี้ถูกใช้งานไปแล้ว");
        setLoading(false);
      } else {
        AuthServices.adminCreate(data).then((_) => {
          setLoading(false);
          props.onClose();
          window.location.reload();
        });
      }
    });
  };

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
              <Dialog.Panel className="w-full gap-2 items-center max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all flex flex-col">
                <form
                  className=" justify-center flex flex-col items-center"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="flex flex-col gap-4 items-center bg-white w-96 rounded-2xl">
                    <p>เพิ่มแอดมิน</p>
                    <p className=" font-thin">
                      อีเมลต้องไม่เคยใช้งานบนแอปพลิเคชั่นนี้มากก่อน
                    </p>

                    <input
                      type="email"
                      id="email"
                      placeholder="Enter your email"
                      className=" text-main5 font-thin w-full border-2 bg-transparent py-2 pl-4  focus:ring-0 text-sm rounded-lg"
                      {...register("email", {
                        required: "Email is required",
                        minLength: {
                          value: 3,
                          message: "Email must be at least 3 characters long",
                        },
                      })}
                    />
                    {/* password */}
                    <div className="w-full relative">
                      <input
                        type={isSecret}
                        id="password"
                        placeholder="Enter your password"
                        className=" text-main5 font-thin w-full border-2 bg-transparent py-2 pl-4  focus:ring-0 text-sm rounded-lg"
                        {...register("password", {
                          required: "Password is required",
                          minLength: {
                            value: 6,
                            message:
                              "Password must be at least 6 characters long",
                          },
                        })}
                      />
                      <div className="absolute inset-y-0 right-4 pr-0 pt-0 flex items-center text-sm leading-5">
                        <img
                          className=" w-5"
                          onClick={secretChange}
                          src={eyestate ? Eyeclose : Eyeopen}
                        />
                      </div>
                    </div>
                    <span className=" text-sm font-thin">
                      {errortext
                        ? errortext
                        : errors.email?.message ?? errors.password?.message}
                    </span>
                  </div>
                  {isloading ? (
                    <button
                      disabled={true}
                      className=" bg-gray-400 hover:bg-gray-400 transition"
                    >
                      Loading
                    </button>
                  ) : (
                    <div className="flex w-full flex-row gap-4 mt-4">
                      <button
                        type="submit"
                        className=" text-white bg-validation hover:bg-validation-hover inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2  focus-visible:ring-offset-2 transition"
                      >
                        ยืนยัน
                      </button>
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium bg-main10 hover:bg-main20 shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
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
