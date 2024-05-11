import React from "react";
import "./style.css";

import Info from "./../../images/info.svg";
import Success from "./../../images/success.svg";
import Error from "./../../images/error.svg";

type TextFieldPropsType = {
  type: "email" | "number" | "password" | "tel" | "text" | "url";
  direction?: "rtl" | "ltr";
  label?: string;
  placeholder?: string;
  id: string;
  name?: string;
  firstIconSrc?: string;
  lastIconSrc?: string;
  guidMessage?: string;
  successMessage?: string;
  errorMessage?: string;
};

const TextField: React.FC<TextFieldPropsType> = ({
  type,
  direction,
  label,
  placeholder,
  id,
  name,
  firstIconSrc,
  lastIconSrc,
  guidMessage,
  successMessage,
  errorMessage,
}) => {
  return (
    <div className="textField-container">
      {label ? (
        <label htmlFor={id} className="textField-label">
          {label}
        </label>
      ) : (
        <></>
      )}
      <div className={`textField-input ${errorMessage ? "errorMessage" : ""}`}>
        {firstIconSrc ? (
          <img src={firstIconSrc} alt="first icon for input" />
        ) : (
          <img src={Info} alt="first icon for input" />
        )}

        <input
          type={type}
          id={id}
          name={name}
          placeholder={placeholder ? placeholder : ""}
          style={{ direction: direction }}
        />
        {lastIconSrc ? (
          <img src={lastIconSrc} alt="last icon for input" />
        ) : (
          <img src={Info} alt="first icon for input" />
        )}
      </div>
      <div className="textField-message">
        {guidMessage ? (
          <img
            className="textField-guidIcon"
            src={Info}
            alt="guidMessage icon"
          />
        ) : successMessage ? (
          <img
            className="textField-successIcon"
            src={Success}
            alt="successMessage icon"
          />
        ) : errorMessage ? (
          <img
            className="textField-errorIcon"
            src={Error}
            alt="errorMessage icon"
          />
        ) : (
          <></>
        )}
        {guidMessage ? (
          <p className="textField-guidMessage">{guidMessage}</p>
        ) : successMessage ? (
          <p className="textField-successMessage">{successMessage}</p>
        ) : errorMessage ? (
          <p className="textField-errorMessage">{errorMessage}</p>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default TextField;
