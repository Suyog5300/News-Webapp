import React from "react";
import loading from "./loading.gif";

const spinner = () => {
  return (
    <div className="text-center w-25 m-auto my-2">
      <img className="w-50" src={loading} alt="loading" />
    </div>
  );
};

export default spinner;
