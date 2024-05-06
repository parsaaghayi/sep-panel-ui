import React from "react";
import "./style.css";
import cross from "./../../images/cross.svg";
import check from "./../../images/check.svg";
import dot from "./../../images/dot.svg";

type ToggleProps = {
  status: boolean;
  disabled?: boolean;
  onChange: () => void;
};

const Toggle: React.FC<ToggleProps> = ({
  status,
  disabled = false,
  onChange,
}) => {
  function handleClick() {
    if (!disabled) {
      onChange();
    }
  }

  return (
    <div className="toggle-container">
      <div
        className={`toggle-body ${status ? "active" : "not-active"} ${disabled ? "disable" : ""}`}
        onClick={handleClick}
      >
        {status ? (
          <img src={check} alt="check icon" />
        ) : (
          <img src={cross} alt="cross icon" />
        )}
        <img src={dot} alt="dot icon" />
      </div>
    </div>
  );
};

export default Toggle;
