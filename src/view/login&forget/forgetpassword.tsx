import { useState } from "react";
import Logo from "@assets/icons/Logo.png";
import authServices from "@services/auth.service";
import { SubmitHandler, useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";

type FormData = {
  email: string;
};

function Forgetpassword() {
  const [loadingstate, setloadingstate] = useState(false);
  const [errorsText, seterrorText] = useState("");
  const [isSuccess, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setloadingstate(true);
    const res: any = await authServices.Resetpassword(data.email);
    console.log(res["result"]);
    if (res["message"] != "Email sended") {
      seterrorText("Email Not Found!");
    } else {
      setSuccess(true);
    }
    setloadingstate(false);
  };

  const removeErrorText = () => {
    seterrorText("");
  };
  return (
    <center>
      <form
        className="min-h-screen justify-center flex items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        {isSuccess ? <Navigate to="/forgetsuccess" /> : <></>}
        <div className="w-96 p-12 my-12 gap-4 items-center flex flex-col bg-white rounded-2xl">
          <img src={Logo} width={60} className="" />
          <p className=" text-2xl text-left ">Forget password</p>
          <p className=" font-extralight text-sm text-left opacity-80 ">
            Enter the email associated with your account and we'll send you a
            link to reset your password
          </p>

          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            onClick={removeErrorText}
            className="font-thin w-full border-2 bg-transparent py-2 pl-4 text-gray-900  focus:ring-0 text-sm rounded-lg"
            {...register("email", {
              required: "Email is required",
              minLength: {
                value: 3,
                message: "Email must be at least 3 characters long",
              },
            })}
          />
          {errorsText != "" ? (
            <span className="font-extralight text-sm">{errorsText}</span>
          ) : (
            ""
          )}
          {errors.email?.message != null ? (
            <span className="font-extralight text-sm">
              {errors.email?.message}
            </span>
          ) : null}
          {loadingstate ? (
            <button disabled={true} className=" bg-gray-400">
              Loading
            </button>
          ) : (
            <button>Continue</button>
          )}
        </div>
      </form>
    </center>
  );
}

export default Forgetpassword;
