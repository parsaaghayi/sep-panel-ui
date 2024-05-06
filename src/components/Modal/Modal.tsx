import React, { useState } from "react";
import "./style.css";

import warning from "./../../images/warning.svg";
import error from "./../../images/error.svg";
import Button from "../Button";

interface ButtonPropsInt {
  title: string;
  type?: "base" | "warning" | "danger";
  showModal: boolean;
  children: React.ReactElement;
  submitButtonLabel: string;
  cancelButtonLabel?: string;
  onSubmit: () => void;
}

const Modal = (props: ButtonPropsInt) => {
  const [showModal, setshowModal] = useState(props.showModal);
  return (
    <>
      {showModal ? (
        <div className="modal-body">
          <h2 className="modal-title">
            {props.type === "warning" || props.type === "danger" ? (
              <img
                src={props.type === "warning" ? warning : error}
                alt={props.type === "warning" ? "warning icon" : "danger icon"}
              />
            ) : (
              <></>
            )}
            {props.title}
          </h2>
          <div className="modal-description">{props.children}</div>
          <div className="modal-footer">
            <Button
              label={
                props.cancelButtonLabel ? props.cancelButtonLabel : "انصراف"
              }
              type="subtle"
              onClick={() => setshowModal(false)}
            />
            <Button
              label={props.submitButtonLabel}
              type={
                props.type === "danger"
                  ? "danger"
                  : props.type === "warning"
                    ? "warning"
                    : "primary"
              }
              onClick={() => props.onSubmit()}
            />
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Modal;
