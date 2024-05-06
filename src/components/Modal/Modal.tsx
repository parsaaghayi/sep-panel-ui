import React, { useState } from "react";
import "./style.css";

import warning from "./../../images/warning.svg";
import error from "./../../images/error.svg";
import Button from "../Button";

type ModalPropsType = {
  title: string;
  type?: "base" | "warning" | "danger";
  showModal: boolean;
  children: React.ReactElement;
  submitButtonLabel?: string;
  cancelButtonLabel?: string;
} & (
  | { submitButtonLabel: string; onSubmit: () => void }
  | { submitButtonLabel?: never; onSubmit?: () => void }
);

const Modal: React.FC<ModalPropsType> = ({
  title,
  type,
  showModal,
  children,
  submitButtonLabel,
  cancelButtonLabel,
  onSubmit,
}) => {
  const [showModalState, setshowModalState] = useState(showModal);
  return (
    <>
      {showModalState ? (
        <div className="modal-body">
          <h2 className="modal-title">
            {type === "warning" || type === "danger" ? (
              <img
                src={type === "warning" ? warning : error}
                alt={type === "warning" ? "warning icon" : "danger icon"}
              />
            ) : (
              <></>
            )}
            {title}
          </h2>
          <div className="modal-description">{children}</div>
          <div className="modal-footer">
            <Button
              label={cancelButtonLabel ? cancelButtonLabel : "انصراف"}
              type="subtle"
              onClick={() => setshowModalState(false)}
            />
            {submitButtonLabel ? (
              <Button
                label={submitButtonLabel}
                type={
                  type === "danger"
                    ? "danger"
                    : type === "warning"
                      ? "warning"
                      : "primary"
                }
                onClick={() => onSubmit()}
              />
            ) : (
              <></>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Modal;
