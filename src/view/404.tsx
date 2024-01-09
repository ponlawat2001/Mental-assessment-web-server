import { useState } from "react";
import { Navigate } from "react-router-dom";

function NopageScreen() {
  const [gobackhome, sethome] = useState(false);

  const goHome = () => {
    sethome(true);
  };
  return (
    <>
      <div className="min-h-screen flex flex-grow items-center justify-center">
        <div className="rounded-lg bg-white p-8 text-center shadow-xl">
          <p className="mb-4 text-4xl">404</p>
          <p className="text-gray-600">
            Oops! The page you are looking for could not be found.
          </p>
          <button
            className="mt-4 inline-block rounded px-4 py-2 font-semibold"
            onClick={goHome}
          >
            Go back to Home
          </button>
          {gobackhome ? <Navigate to="/" /> : <></>}
        </div>
      </div>
    </>
  );
}

export default NopageScreen;
