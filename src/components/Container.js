import React from "react";

const Container = ({ className, children }) => (
  <div className={`container lg:w-2/4 mx-auto p-4 ${className}`}>
    {children}
  </div>
);

export default Container;
