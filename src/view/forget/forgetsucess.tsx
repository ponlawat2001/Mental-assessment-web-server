import { Navigate } from "react-router-dom";
import Logo from "/src/assets/icons/Logo.png";
import { useState } from "react";

function ForgetpasswordSuccess() {
  const [isClicked, setClicked] = useState(false);
  const Clicked = () => {
    setClicked(true);
  };
  return (
    <center>
      <div className="flex flex-col gap-4 items-center p-12 my-12 bg-white w-96 rounded-2xl">
        <img src={Logo} width={60} className="" />
        <p className=" text-xl ">Successful password reset</p>
        <p className=" font-extralight text-sm text-left opacity-80 ">
          You can now use your new password to sign in to your account
        </p>
        <button onClick={Clicked}>Sign in</button>
        {isClicked ? <Navigate to="/login" /> : <></>}
      </div>
    </center>
  );
}

export default ForgetpasswordSuccess;
