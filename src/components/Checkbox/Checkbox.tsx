import React from "react";
import "./style.css";

type CheckboxPropsType = {
  label?: string;
  checked: boolean;
  className?: string;
  disabled?: boolean;
  name?: string;
  id: string;
  required?: boolean;
  onChange: React.Dispatch<React.SetStateAction<boolean>>;
};

const Checkbox: React.FC<CheckboxPropsType> = ({
  label,
  checked,
  className,
  disabled,
  name,
  id,
  required,
  onChange,
}) => {
  function toggle() {
    onChange(!checked);
  }
  return (
    <div className={`checkbox-container ${className ? className : ""}`}>
      <input
        type="checkbox"
        className={`checkbox-input ${disabled ? "disabled" : ""}`}
        name={name ? name : ""}
        id={id}
        disabled={disabled}
        checked={checked}
        onChange={toggle}
      />
      <span className={`checkbox-square ${disabled ? "disabled" : ""}`}></span>
      <label
        htmlFor={id}
        className={`checkbox-label ${disabled ? "disabled" : ""}`}
      >
        {label}
      </label>
      {required && <span className="checkbox-required">*</span>}
    </div>
  );
};

export default Checkbox;
