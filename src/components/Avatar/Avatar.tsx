import React from "react";
import "./style.css";

import avatar from "./../../images/avatar.svg";

type AvatarPropsType = {
  picUrl?: string;
  className?: string;
};

const Avatar: React.FC<AvatarPropsType> = ({ picUrl, className }) => {
  return (
    <div
      className={`avatar-container ${className ? className : ""}`}
      style={{
        background: `lightblue url('${picUrl ? picUrl : avatar}')`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    ></div>
  );
};

export default Avatar;
