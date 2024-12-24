import React from "react";

const Background: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div
      className="h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://vrthaimagazine.com.au/wp-content/uploads/2023/07/cover2-scaled.jpg')",
      }}
    >
      {children}
    </div>
  );
};

export default Background;
