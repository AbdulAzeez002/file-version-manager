import React from "react";

const ErrorMessage = ({ data }) => {
  return <p className="text-red-500 text-sm">{data}</p>;
};

export default ErrorMessage;
