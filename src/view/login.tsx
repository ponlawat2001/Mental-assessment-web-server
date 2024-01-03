import React from "react";
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import authServices from "../services/auth";

type FormData = {
  email: string;
  password: string;
};

const MyForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    authServices.Login(data.email, data.password);
    console.log(data);
  };

  const onError: SubmitErrorHandler<FormData> = (errors) => {
    // Handle form errors here
    console.error(errors);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          {...register("email", {
            required: "This field is required",
            minLength: {
              value: 3,
              message: "Email must be at least 3 characters long",
            },
          })}
        />
        <span>{errors.email?.message}</span>
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters long",
            },
          })}
        />
        <span>{errors.password?.message}</span>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default MyForm;
