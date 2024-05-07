import React from "react";
import "./style.css";

type CheckboxPropsType = {
  label?: string;
  checked: boolean;
  disabled?: boolean;
  name?: string;
  id: string;
  required?: boolean;
  onChange: () => void;
};

const Checkbox: React.FC<CheckboxPropsType> = ({
  label,
  checked,
  disabled,
  name,
  id,
  required,
  onChange,
}) => {
  return (
    <div className="checkbox-container">
      <input
        type="checkbox"
        className={`checkbox-input ${disabled ? "disabled" : ""}`}
        name={name ? name : ""}
        id={id}
        disabled={disabled}
        checked={checked}
        onChange={onChange}
      />
      <span className={`checkbox-square ${disabled ? "disabled" : ""}`}></span>
      <label
        htmlFor={id}
        className={`checkbox-label ${disabled ? "disabled" : ""}`}
      >
        {label}
      </label>
      {required ? <span className="checkbox-required">*</span> : <></>}
    </div>
  );
};

export default Checkbox;
