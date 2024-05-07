import React, { ReactElement, useState } from "react";
import "./style.css";
import arrowBottom from "./../../images/arrow-bottom.svg";

type DropDownMenuPropsType = {
  label: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  disabled?: boolean;
  children: ReactElement;
};

const DropDownMenu: React.FC<DropDownMenuPropsType> = ({
  label,
  disabled,
  children,
  isOpen,
  setIsOpen,
}) => {
  const [animate, setAnimate] = useState(false);

  return (
    <div className="DropDownMenu-container">
      <div
        className={`DropDownMenu-button ${disabled ? "disabled" : ""} ${isOpen ? "opened" : ""}`}
        onClick={() => {
          if (isOpen) {
            setAnimate(false);
            setTimeout(() => {
              setIsOpen(false);
            }, 200);
          } else {
            setIsOpen(true);
            setTimeout(() => {
              setAnimate(true);
            }, 10);
          }
        }}
      >
        <p className="DropDownMenu-label">{label}</p>
        <img
          className="DropDownMenu-arrow"
          src={arrowBottom}
          alt="arrow bottom"
        />
      </div>
      {isOpen ? (
        <div className={`DropDownMenu-body ${animate ? "opened" : "closed"}`}>
          {children}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default DropDownMenu;
