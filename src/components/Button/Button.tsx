import React from "react";
import "./style.css";

import loadingIcon from "./../../images/loading.svg";
import more from "./../../images/more.svg";

type ButtonPropsType = {
  label: string;
  type?: "submit" | "reset" | "button";
  colorType?:
    | "base"
    | "primary"
    | "secondary"
    | "warning"
    | "danger"
    | "link"
    | "subtle"
    | "subtleLink";
  fistIconSrc?: string;
  lastIconSrc?: string;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  hasMore?: boolean;
  onClick?: () => void;
};

const Button: React.FC<ButtonPropsType> = ({
  label,
  type,
  colorType,
  fistIconSrc,
  lastIconSrc,
  className,
  disabled,
  loading,
  hasMore,
  onClick,
}) => {
  return (
    <button
      className={`button ${colorType ? colorType : "base"} ${className ? className : ""} ${disabled ? "disabled" : ""}`}
      disabled={disabled}
      type={type ? type : "button"}
      onClick={() => {
        onClick ? onClick() : null;
      }}
    >
      {loading ? (
        <img src={loadingIcon} width={24} height={24} alt="loading icon" />
      ) : (
        <>
          {hasMore ? (
            <img src={more} width={24} height={24} alt="more icon" />
          ) : (
            <>
              {fistIconSrc ? (
                <img
                  src={fistIconSrc}
                  className="first-icon"
                  alt="first icon"
                />
              ) : (
                <></>
              )}
              {label}
              {lastIconSrc ? (
                <img src={lastIconSrc} className="last-icon" alt="last icon" />
              ) : (
                <></>
              )}
            </>
          )}
        </>
      )}
    </button>
  );
};

export default Button;
