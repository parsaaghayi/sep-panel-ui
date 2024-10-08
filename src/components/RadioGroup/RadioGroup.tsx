import React, { useState } from "react";
import "./style.css";

type optionType = {
  label: string;
  value: string | number;
  id: string;
  disabled?: boolean;
};

type RadioGroupPropsType = {
  title?: string;
  options: optionType[];
  selectedOptionValue: string | number;
  flexDirection: "column" | "row";
  name: string;
  required?: boolean;
  onChange: (value: string | number) => void;
};

const RadioGroup: React.FC<RadioGroupPropsType> = ({
  title,
  options,
  selectedOptionValue,
  flexDirection,
  name,
  required,
  onChange,
}) => {
  const [selectedOption, setSelectedOption] = useState(selectedOptionValue);
  return (
    <div className={`radioGroup-container ${flexDirection}`}>
      {title && required ? (
        <div className="radioGroup-header">
          <span className="radioGroup-required">*</span>
          <h2 className="radioGroup-title">{title}</h2>
        </div>
      ) : title ? (
        <div className="radioGroup-header">
          <h2 className="radioGroup-title">{title}</h2>
        </div>
      ) : required ? (
        <div className="radioGroup-header">
          <span className="radioGroup-required">*</span>
        </div>
      ) : (
        <></>
      )}

      {options.map((option: optionType) => (
        <div className="radioGroup-body" key={option.value}>
          <input
            type="radio"
            className={`radioGroup-input ${option.disabled ? "disabled" : ""}`}
            name={name}
            id={option.id}
            disabled={option.disabled}
            checked={selectedOption === option.value ? true : false}
            onChange={() => {
              onChange(option.value);
              setSelectedOption(option.value);
            }}
          />
          <span
            className={`radioGroup-circle ${option.disabled ? "disabled" : ""}`}
          ></span>
          <label
            htmlFor={option.id}
            className={`radioGroup-label ${option.disabled ? "disabled" : ""}`}
          >
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
};

export default RadioGroup;
