import React, { useState, useRef, useEffect } from "react";
import "./style.css";

type optionType = {
  label: string;
  value: string | number;
};

type SelectInputPropsType = {
  label?: string;
  iconSrc?: string;
  placeHolder?: string;
  className?: string;
  required?: boolean;
  menuItems: optionType[];
  disabled?: boolean;
  selectedOption: optionType | null;
  setSelectedOption: React.Dispatch<React.SetStateAction<optionType | null>>;
  onChange: (option: optionType | null) => void;
};

const SelectInput: React.FC<SelectInputPropsType> = ({
  label,
  iconSrc,
  className,
  placeHolder,
  required,
  menuItems,
  disabled,
  selectedOption,
  setSelectedOption,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  function openMenu() {
    !disabled && setIsOpen(!isOpen);
  }
  function setSelectedOptionValue(option: optionType) {
    onChange(option);
    setIsOpen(false);
    setSelectedOption(option);
  }
  function setSelectedOptionValueToNull() {
    onChange(null);
    setIsOpen(false);
    setSelectedOption(null);
  }

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div
      ref={containerRef}
      className={`selectInput-container ${disabled ? "disabled" : ""} ${
        className ? className : ""
      }`}
    >
      <div className="selectInput-title">
        <div className="selectInput-title-text" onClick={openMenu}>
          {label}
        </div>
        {required ? (
          <span className="selectInput-title-required" onClick={openMenu}>
            *
          </span>
        ) : null}
      </div>
      <div className="selectInput-input" onClick={openMenu}>
        {iconSrc && <img src={iconSrc} alt="first icon for input" />}
        {selectedOption == null ? (
          <div className="selectInput-input-placeholder">{placeHolder}</div>
        ) : (
          <div className="selectInput-input-text">{selectedOption.label}</div>
        )}

        <span className="selectInput-input-dropdownIcon"></span>
      </div>
      {isOpen ? (
        <div className="selectInput-menu">
          <div
            className="selectInput-menu-menuItem"
            key={0}
            onClick={() => setSelectedOptionValueToNull()}
          >
            {placeHolder}
          </div>
          {menuItems.map((menuItem: optionType, key: number) => (
            <div
              className="selectInput-menu-menuItem"
              key={key + 1}
              onClick={() => setSelectedOptionValue(menuItem)}
            >
              {menuItem.label}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default SelectInput;
