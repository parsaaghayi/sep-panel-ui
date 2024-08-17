import React, { ReactElement, useState } from "react";
import "./style.css";

type optionType = {
  label: string;
  value: string | number;
};

type SelectInputPropsType = {
  title?: string;
  iconSrc?: string;
  placeHolder?: string;
  name: string;
  required?: boolean;
  menuItems: optionType[];
  disabled?: boolean;
  selectedOption: number | string | null;
  setSelectedOption: React.Dispatch<
    React.SetStateAction<number | string | null>
  >;
  onChange: () => void;
};

const SelectInput: React.FC<SelectInputPropsType> = ({
  title,
  iconSrc,
  name,
  placeHolder,
  required,
  menuItems,
  disabled,
  selectedOption,
  setSelectedOption,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  function openMenu() {
    !disabled && setIsOpen(!isOpen);
  }
  function setSelectedOptionValue(option: optionType) {
    onChange();
    setIsOpen(false);
    setSelectedOption(option.value);
  }
  function setSelectedOptionValueToNull() {
    onChange();
    setIsOpen(false);
    setSelectedOption(null);
  }
  return (
    <div className={`selectInput-container ${disabled ? "disabled" : ""}`}>
      <div className="selectInput-title">
        <p className="selectInput-title-text" onClick={openMenu}>
          {title}
        </p>
        {required ? (
          <span className="selectInput-title-required" onClick={openMenu}>
            *
          </span>
        ) : null}
      </div>
      <div className="selectInput-input" onClick={openMenu}>
        {iconSrc && <img src={iconSrc} alt="first icon for input" />}
        {selectedOption == null ? (
          <p className="selectInput-input-placeholder">{placeHolder}</p>
        ) : (
          <p className="selectInput-input-text">{selectedOption}</p>
        )}

        <span className="selectInput-input-dropdownIcon"></span>
      </div>
      {isOpen ? (
        <div className="selectInput-menu">
          <p
            className="selectInput-menu-menuItem"
            key={0}
            onClick={() => setSelectedOptionValueToNull()}
          >
            {placeHolder}
          </p>
          {menuItems.map((menuItem: optionType, key: number) => (
            <p
              className="selectInput-menu-menuItem"
              key={key + 1}
              onClick={() => setSelectedOptionValue(menuItem)}
            >
              {menuItem.label}
            </p>
          ))}
        </div>
      ) : null}
      <div className="out-of-component" onClick={() => setIsOpen(false)}></div>
    </div>
  );
};

export default SelectInput;
