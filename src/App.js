import "./App.css";
import logo from "./image/logo.png";
import React, { useState, useEffect } from "react";
function App() {
  const [screenSize, setScreenSize] = useState(getCurrentDimension());
  function getCurrentDimension() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }
  useEffect(() => {
    const updateDimension = () => {
      setScreenSize(getCurrentDimension());
    };
    window.addEventListener("resize", updateDimension);

    return () => {
      window.removeEventListener("resize", updateDimension);
    };
  }, [screenSize]);
  return (
    <div
      className="main"
      style={{ width: screenSize.width, height: screenSize.height }}
    >
      <div className="sub-main">
        <img src={logo} alt="logo" className="logo" />
        <h1>Mental Assessment</h1>
        <h6>Please enter your details to sign in.</h6>
        <input
          type="text"
          placeholder="  Enter your email"
          className="second-input"
        />
        <input
          type="text"
          placeholder="  Enter your password.."
          className="second-input"
        />
        <div className="item">
          <div>
            <input type="checkbox" id="check" />
            <label for="check">Remember Me</label>
          </div>
          <a href="www.google.com">Forget password ?</a>
        </div>

        <button>Sign in</button>
      </div>
    </div>
  );
}
export default App;
