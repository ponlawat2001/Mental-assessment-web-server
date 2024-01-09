import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import authServices from "../../services/auth";
import Logo from "/src/assets/icons/Logo.png";
import Eyeopen from "/src/assets/icons/eye-open.png";
import Eyeclose from "/src/assets/icons/eye-close.png";
import { useState } from "react";

type FormData = {
  email: string;
  password: string;
};

function LoginScreen(props: any) {
  const [isRemember, setRemember] = useState(false);
  const [isSecret, setSecret] = useState("password");
  const [eyestate, setEyestate] = useState(false);
  const [errorsText, seterrorText] = useState("");
  const [loadingstate, setloadingstate] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const secretChange = () => {
    if (isSecret == "password") {
      setSecret("text");
      setEyestate(false);
    } else {
      setSecret("password");
      setEyestate(true);
    }
  };

  const getemail: string = localStorage.getItem("rememberemail") ?? "";

  const getpassword: string = localStorage.getItem("rememberpassword") ?? "";

  const getrememberstate: boolean =
    localStorage.getItem("rememberstate") == "true" ? true : false;

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (!isRemember) {
      localStorage.setItem("rememberemail", data.email);
      localStorage.setItem("rememberpassword", data.password);
      localStorage.setItem("rememberstate", isRemember ? "true" : "fasle");
    } else {
      console.log("remove remember state");
      localStorage.removeItem("rememberemail");
      localStorage.removeItem("rememberpassword");
      localStorage.removeItem("rememberstate");
    }
    setloadingstate(true);
    const res: string = await authServices.Login(
      data.email,
      data.password,
      props
    );
    if (res == "") {
      seterrorText("Incorrect Password or Email");
    }
    setloadingstate(false);
  };

  const onError: SubmitErrorHandler<FormData> = (errors) => {
    // Handle form errors here
    console.error(errors);
  };

  const handleChange = () => {
    setRemember(!isRemember);
  };

  const removeErrorText = () => {
    seterrorText("");
  };

  return (
    <center>
      <form
        className="min-h-screen justify-center flex items-center"
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <div className="p-12 my-12 flex flex-col gap-4 items-center bg-white w-96 rounded-2xl">
          <img src={Logo} width={60} />
          <p className=" text-2xl">Mental Assessment</p>
          <p className=" font-extralight text-sm">
            Please enter your details to sign in.
          </p>
          <input
            type="email"
            id="email"
            defaultValue={getemail}
            onFocus={removeErrorText}
            placeholder="Enter your email"
            className="font-thin w-full border-2 bg-transparent py-2 pl-4 text-gray-900  focus:ring-0 text-sm rounded-lg"
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
              defaultValue={getpassword}
              onFocus={removeErrorText}
              placeholder="Enter your password"
              className=" font-thin w-full border-2 bg-transparent py-2 pl-4 text-gray-900  focus:ring-0 text-sm rounded-lg"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
              <img
                className=" w-5"
                onClick={secretChange}
                src={eyestate ? Eyeclose : Eyeopen}
              />
            </div>
          </div>

          <div className="flex flex-row justify-between w-full">
            <div className="flex items-center">
              <input
                id="checked-checkbox"
                defaultChecked={getrememberstate}
                onChange={handleChange}
                type="checkbox"
                className="w-4 h-4 rounded focus:ring-0"
              />
              <label className="ms-2 text-sm font-medium ">Remember me</label>
            </div>
            <a href="/forget" className="ms-2 text-sm underline">
              Forget password?
            </a>
          </div>
          {errorsText != "" ? (
            <span className="font-extralight text-sm">{errorsText}</span>
          ) : (
            ""
          )}
          {errors.email?.message != null || errors.password?.message != null ? (
            <span className="font-extralight text-sm">
              {errors.email?.message ?? errors.password?.message}
            </span>
          ) : null}
          {loadingstate ? (
            <button disabled={true} className=" bg-gray-400">
              Loading
            </button>
          ) : (
            <button>Sign in</button>
          )}
        </div>
      </form>
    </center>
  );
}

export default LoginScreen;
