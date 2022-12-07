import React, { useState } from "react";
import Signin from "../../Components/Signin-button/signin";
import Signup from "../../Components/Signin-button/signup";

const SwitchPage = () => {
  const [index, setIndex] = useState(false);
  const toggleIndex = () => {
    setIndex((prevState) => !prevState);
  };
  return (
    <div className="container">
      {!index ? <Signin /> : <Signup />}
      <p onClick={toggleIndex}>
        {!index ? "New user? Click here " : "Already have an acount?"}
      </p>
    </div>
  );
};

export default SwitchPage;