import React from "react";
import "./style.css";

import loading from "./../../images/loading.svg";
import more from "./../../images/more.svg";

interface ButtonPropsInt {
  label: string;
  type?:
    | "base"
    | "primary"
    | "warning"
    | "danger"
    | "link"
    | "subtle"
    | "subtleLink";
  fistIconSrc?: string;
  lastIconSrc?: string;
  clasName?: string;
  disabled?: boolean;
  loading?: boolean;
  hasMore?: boolean;
  onClick?: () => void;
}

const Button = (props: ButtonPropsInt) => {
  return (
    <button
      className={`${props.type ? props.type : "base"} ${props.clasName ? props.clasName : ""} ${props.disabled ? "disabled" : ""}`}
      disabled={props.disabled}
      onClick={() => {
        props.onClick ? props.onClick() : null;
      }}
    >
      {props.loading ? (
        <img src={loading} width={24} height={24} alt="loading icon" />
      ) : (
        <>
          {props.hasMore ? (
            <img src={more} width={24} height={24} alt="more icon" />
          ) : (
            <>
              {props.fistIconSrc ? (
                <img
                  src={props.fistIconSrc}
                  className="first-icon"
                  alt="first icon"
                />
              ) : (
                <></>
              )}
              {props.label}
              {props.lastIconSrc ? (
                <img
                  src={props.lastIconSrc}
                  className="last-icon"
                  alt="last icon"
                />
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
