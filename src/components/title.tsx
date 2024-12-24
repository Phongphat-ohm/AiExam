import React, { FC } from "react";

interface HHH {
  introduction: string;
}

const Title: FC<HHH> = ({ introduction }) => {
  return (
    <div className="">
        <center>
      <h1>{introduction}</h1>
      </center>
    </div>
  );
};

export default Title;
