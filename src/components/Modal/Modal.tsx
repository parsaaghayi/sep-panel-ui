import React, { EventHandler, useEffect, useState } from "react";
import "./style.css";

import warning from "./../../images/warning.svg";
import error from "./../../images/error.svg";
import Button from "../Button";

type ModalPropsType = {
  title: string;
  type?: "base" | "warning" | "danger";
  showModal: boolean;
  children: React.ReactElement;
  onClickOutClose?: boolean;
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
  onClickOutClose = cancelButtonLabel === undefined || cancelButtonLabel === ""
    ? true
    : false,
  onSubmit,
}) => {
  const [showModalState, setshowModalState] = useState(showModal);
  const [isOpen, setIsOpen] = useState(showModal);
  useEffect(() => {
    if (!showModalState) {
      setTimeout(() => {
        setIsOpen(false);
      }, 300);
    }
  }, [showModalState]);

  function handleModalClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const target = e.target as HTMLElement;
    if (target.classList.contains("modal-container")) {
      setshowModalState(false);
    }
  }

  return (
    <>
      {isOpen ? (
        <div
          className={`modal-container ${showModalState ? "show" : ""}`}
          onClick={(e) => {
            if (onClickOutClose) {
              handleModalClick(e);
            }
          }}
        >
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
            {submitButtonLabel || cancelButtonLabel ? (
              <div className="modal-footer">
                {cancelButtonLabel ? (
                  <Button
                    label={cancelButtonLabel}
                    type="subtle"
                    onClick={() => setshowModalState(false)}
                  />
                ) : (
                  <></>
                )}

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
