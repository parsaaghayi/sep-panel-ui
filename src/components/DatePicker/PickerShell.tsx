import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { PickerShellProps, DropdownPositionType } from "./types";
import "./style.css";

const PickerShell: React.FC<PickerShellProps> = ({
  id,
  label,
  className,
  placeholder,
  firstIconSrc,
  lastIconSrc,
  startIcon,
  endIcon,
  iconPosition = "end",
  iconClick,
  guidMessage,
  successMessage,
  errorMessage,
  disabled = false,
  readOnly = false,
  required = false,
  size = "md",
  variant = "outlined",
  color = "primary",
  fullWidth = false,
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedby,
  role,
  open,
  onOpenChange,
  displayValue,
  direction,
  dropdownPosition,
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [resolvedPosition, setResolvedPosition] = useState<
    Exclude<DropdownPositionType, "auto">
  >(dropdownPosition && dropdownPosition !== "auto" ? dropdownPosition : "bottom");

  function resolvePosition() {
    const requested = dropdownPosition ?? "bottom";
    if (requested !== "auto") {
      setResolvedPosition(requested);
      return;
    }
    if (inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      setResolvedPosition(spaceBelow >= spaceAbove ? "bottom" : "top");
    }
  }

  useEffect(() => {
    if (open) resolvePosition();
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onOpenChange(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onOpenChange(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onOpenChange]);

  const canToggle = !disabled && !readOnly;

  const handleContainerClick = () => {
    if (!canToggle) return;
    onOpenChange(!open);
  };

  const handleIconClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (iconClick) {
      iconClick();
    } else if (canToggle) {
      onOpenChange(!open);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`datePicker-container datePicker-dropdown-${resolvedPosition} ${
        fullWidth ? "datePicker-fullWidth" : ""
      } datePicker-${size} datePicker-${variant} datePicker-${color}`}
      style={{ direction }}
    >
      {label && (
        <label htmlFor={id} className="datePicker-label">
          {label}
          {required && <span className="datePicker-required"> *</span>}
        </label>
      )}

      <div
        className={`datePicker-input ${errorMessage ? "errorMessage" : ""} ${disabled ? "disabled" : ""} ${isFocused ? "focused" : ""} ${readOnly ? "readOnly" : ""}`}
      >
        {(firstIconSrc || (startIcon && iconPosition === "start")) && (
          <div
            className="datePicker-icon datePicker-startIcon"
            onClick={handleIconClick}
            style={{ cursor: iconClick || canToggle ? "pointer" : "default" }}
          >
            {firstIconSrc ? <img src={firstIconSrc} alt="start icon" /> : startIcon}
          </div>
        )}

        <input
          ref={inputRef}
          type="text"
          className={`datePicker-inputElement ${className ? className : ""}`}
          id={id}
          placeholder={placeholder || ""}
          value={displayValue}
          readOnly
          disabled={disabled}
          required={required}
          aria-label={ariaLabel}
          aria-describedby={ariaDescribedby}
          role={role}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onClick={handleContainerClick}
        />

        {(lastIconSrc || (endIcon && iconPosition === "end")) && (
          <div
            className="datePicker-icon datePicker-endIcon"
            onClick={handleIconClick}
            style={{ cursor: iconClick || canToggle ? "pointer" : "default" }}
          >
            {lastIconSrc ? <img src={lastIconSrc} alt="end icon" /> : endIcon}
          </div>
        )}
      </div>

      {open && children}

      {(guidMessage || successMessage || errorMessage) && (
        <div className="datePicker-message">
          {guidMessage ? (
            <img
              className="datePicker-guidIcon"
              src="/src/images/info.svg"
              alt="guidMessage icon"
            />
          ) : successMessage ? (
            <img
              className="datePicker-successIcon"
              src="/src/images/success.svg"
              alt="successMessage icon"
            />
          ) : errorMessage ? (
            <img
              className="datePicker-errorIcon"
              src="/src/images/error.svg"
              alt="errorMessage icon"
            />
          ) : null}

          {guidMessage ? (
            <p className="datePicker-guidMessage">{guidMessage}</p>
          ) : successMessage ? (
            <p className="datePicker-successMessage">{successMessage}</p>
          ) : errorMessage ? (
            <p className="datePicker-errorMessage">{errorMessage}</p>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default PickerShell;
