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
      <div className="min-h-screen justify-center flex items-center">
        <div className="w-96 p-12 my-12 gap-4 items-center flex flex-col bg-white rounded-2xl">
          <img src={Logo} width={60} className="" />
          <p className=" text-xl ">Successful password reset</p>
          <p className=" font-extralight text-sm text-left opacity-80 ">
            You can now use your new password to sign in to your account
          </p>
          <button onClick={Clicked}>Sign in</button>
          {isClicked ? <Navigate to="/login" /> : <></>}
        </div>
      </div>
    </center>
  );
}

export default ForgetpasswordSuccess;
