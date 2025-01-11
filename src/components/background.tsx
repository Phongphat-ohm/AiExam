import React from "react";

const Background: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div
      className="h-screen bg-cover bg-center flex items-center justify-center relative"
      style={{
        backgroundImage: "url('/images/bg/libs.jpg')",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      {children}
    </div>
  );
};

export default Background;
