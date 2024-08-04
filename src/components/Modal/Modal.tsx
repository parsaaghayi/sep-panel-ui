import React, { useEffect, useState } from "react";
import "./style.css";
import warning from "./../../images/warning.svg";
import error from "./../../images/error.svg";
import Button from "../Button";

type ModalPropsType = {
  title: string;
  type?: "base" | "warning" | "danger";
  className?: string;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
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
  className,
  showModal,
  setShowModal,
  children,
  submitButtonLabel,
  cancelButtonLabel,
  onClickOutClose = cancelButtonLabel === undefined || cancelButtonLabel === ""
    ? true
    : false,
  onSubmit,
}) => {
  useEffect(() => {
    if (!showModal) {
      setTimeout(() => {
        setShowModal(false);
      }, 300);
    }
  }, [showModal]);

  function handleModalClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const target = e.target as HTMLElement;
    if (target.classList.contains("modal-container")) {
      setShowModal(false);
    }
  }

  return (
    <>
      {showModal && (
        <div
          className={`modal-container ${showModal ? "show" : ""} ${className ? className : ""}`}
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
            {submitButtonLabel ||
              (cancelButtonLabel && (
                <div className="modal-footer">
                  {cancelButtonLabel && (
                    <div className="modal-button">
                      <Button
                        label={cancelButtonLabel}
                        colorType="subtle"
                        onClick={() => setShowModal(false)}
                      />
                    </div>
                  )}

                  {submitButtonLabel && (
                    <div className="modal-button">
                      <Button
                        label={submitButtonLabel}
                        colorType={
                          type === "danger"
                            ? "danger"
                            : type === "warning"
                              ? "warning"
                              : "primary"
                        }
                        onClick={() => onSubmit()}
                      />
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
