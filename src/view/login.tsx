import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import authServices from "../services/auth";
import Logo from "../assets/icons/Logo.png";
import { useState } from "react";

type FormData = {
  email: string;
  password: string;
};

function LoginScreen(props: any) {
  const [isRemember, setRemember] = useState(false);
  const [isSecret, setSecret] = useState("password");
  const [eyestate, setEyestate] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    authServices.Login(data.email, data.password, props);
    console.log(data);
  };

  const onError: SubmitErrorHandler<FormData> = (errors) => {
    // Handle form errors here
    console.error(errors);
  };

  const handleChange = () => {
    setRemember(!isRemember);
  };

  return (
    <center>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <div className="flex flex-col gap-4 items-center p-12 my-12 bg-white w-96 rounded-2xl">
          <img src={Logo} width={60} className="" />
          <p className=" text-2xl">Mental Assessment</p>
          <p className=" font-extralight text-sm">
            Please enter your details to sign in.
          </p>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            className="font-thin w-full border-2 bg-transparent py-2 pl-4 text-gray-900  focus:ring-0 text-sm rounded-lg"
            {...register("email", {
              required: "This field is required",
              minLength: {
                value: 3,
                message: "Email must be at least 3 characters long",
              },
            })}
          />
          <input
            type={isSecret}
            id="password"
            placeholder="Enter your password"
            className=" font-thin w-full border-2 bg-transparent py-2 pl-4 text-gray-900  focus:ring-0 text-sm rounded-lg"
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            })}
          />
          <div className="flex flex-row justify-between w-full">
            <div className="flex items-center">
              <input
                id="checked-checkbox"
                checked={isRemember}
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
          {errors.email?.message != null ? (
            <span className="font-extralight text-sm">
              {errors.email?.message ?? errors.password?.message}
            </span>
          ) : (
            ""
          )}

          <button>Sign in</button>
        </div>
      </form>
    </center>
  );
}

export default LoginScreen;
