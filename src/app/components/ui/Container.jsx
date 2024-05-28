import React from "react";

const Container = ({ children }) => {
  return <div className="max-w-screen-xl m-auto p-5 flex justify-center items-center h-screen">{children}</div>;
};

export default Container;