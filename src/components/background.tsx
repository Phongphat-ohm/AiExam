import React from "react";

const Background: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div
      className="h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage:
          "url('/images/bg/libs.jpg')",
      }}
    >
      {children}
    </div>
  );
};

export default Background;
