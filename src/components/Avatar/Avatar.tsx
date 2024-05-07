import React from "react";
import "./style.css";

import avatar from "./../../images/avatar.svg";

type AvatarPropsType = {
  picUrl?: string;
};

const Avatar: React.FC<AvatarPropsType> = ({ picUrl }) => {
  return (
    <div
      className="avatar-container"
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
