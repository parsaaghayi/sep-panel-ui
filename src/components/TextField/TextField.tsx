import React, { ChangeEvent, useState, useEffect, useRef } from "react";
import "./style.css";
import Info from "./../../images/info.svg";
import Success from "./../../images/success.svg";
import Error from "./../../images/error.svg";

// Validation Rule Type
export interface ValidationRule {
  rule: (value: string) => boolean;
  message: string;
}

// TextField Props Type
type TextFieldPropsType = {
  // Basic Props
  type: "email" | "number" | "password" | "tel" | "text" | "url";
  direction?: "rtl" | "ltr";
  label?: string;
  className?: string;
  placeholder?: string;
  id: string;
  name?: string;
  value?: string | number;
  onChange: React.Dispatch<React.SetStateAction<string>>;

  // Icon Props
  firstIconSrc?: string;
  lastIconSrc?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  iconPosition?: "start" | "end";
  iconClick?: () => void;

  // Message Props
  guidMessage?: string;
  successMessage?: string;
  errorMessage?: string;

  // State Props
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;

  // HTML Input Attributes
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  autoComplete?: string;
  autoFocus?: boolean;
  tabIndex?: number;

  // Event Handlers
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onPaste?: (e: React.ClipboardEvent<HTMLInputElement>) => void;

  // Validation Props
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
  validationRules?: ValidationRule[];
  customValidator?: (value: string) => string | null;

  // Styling Props
  size?: "sm" | "md" | "lg";
  variant?: "outlined" | "filled" | "standard";
  color?: "primary" | "secondary" | "error" | "warning" | "success";
  fullWidth?: boolean;

  // Formatting Props
  formatter?: (value: string) => string;
  parser?: (value: string) => string;
  mask?: string;
  allowOnlyNumbers?: boolean;
  allowOnlyLetters?: boolean;

  // Accessibility Props
  "aria-label"?: string;
  "aria-describedby"?: string;
  role?: string;
};

const TextField: React.FC<TextFieldPropsType> = ({
  // Basic Props
  type,
  direction,
  label,
  className,
  placeholder,
  id,
  name,
  value,
  onChange,

  // Icon Props
  firstIconSrc,
  lastIconSrc,
  startIcon,
  endIcon,
  iconPosition = "end",
  iconClick,

  // Message Props
  guidMessage,
  successMessage,
  errorMessage,

  // State Props
  disabled,
  readOnly,
  required,

  // HTML Input Attributes
  maxLength,
  minLength,
  pattern,
  autoComplete,
  autoFocus,
  tabIndex,

  // Event Handlers
  onKeyDown,
  onKeyUp,
  onKeyPress,
  onFocus,
  onBlur,
  onPaste,

  // Validation Props
  validateOnChange = true,
  validateOnBlur = true,
  validationRules,
  customValidator,

  // Styling Props
  size = "md",
  variant = "outlined",
  color = "primary",
  fullWidth = false,

  // Formatting Props
  formatter,
  parser,
  allowOnlyNumbers,
  allowOnlyLetters,

  // Accessibility Props
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedby,
  role,
}) => {
  const [internalValue, setInternalValue] = useState<string>(value?.toString() || "");
  const [validationError, setValidationError] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Update internal value when external value changes
  useEffect(() => {
    setInternalValue(value?.toString() || "");
  }, [value]);

  // Validation function
  const validateInput = (inputValue: string): string => {
    if (customValidator) {
      const customError = customValidator(inputValue);
      if (customError) return customError;
    }

    if (validationRules) {
      for (const rule of validationRules) {
        if (!rule.rule(inputValue)) {
          return rule.message;
        }
      }
    }

    return "";
  };

  // Format input value
  const formatValue = (inputValue: string): string => {
    let formattedValue = inputValue;

    if (allowOnlyNumbers) {
      formattedValue = formattedValue.replace(/[^0-9]/g, "");
    }

    if (allowOnlyLetters) {
      formattedValue = formattedValue.replace(/[^a-zA-Z\u0600-\u06FF]/g, "");
    }

    if (formatter) {
      formattedValue = formatter(formattedValue);
    }

    return formattedValue;
  };

  // Parse input value
  const parseValue = (inputValue: string): string => {
    if (parser) {
      return parser(inputValue);
    }
    return inputValue;
  };

  // Handle input change
  const handleInputValue = (event: ChangeEvent<HTMLInputElement>) => {
    let inputValue = event.target.value;

    // Apply formatting
    inputValue = formatValue(inputValue);

    // Parse value
    const parsedValue = parseValue(inputValue);

    // Update internal state
    setInternalValue(inputValue);

    // Update parent component
    onChange(parsedValue);

    // Validate if needed
    if (validateOnChange) {
      const error = validateInput(parsedValue);
      setValidationError(error);
    }
  };

  // Handle focus
  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(event);
  };

  // Handle blur
  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);

    // Validate on blur if needed
    if (validateOnBlur) {
      const error = validateInput(parseValue(internalValue));
      setValidationError(error);
    }

    onBlur?.(event);
  };

  // Handle key events
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    onKeyDown?.(event);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    onKeyUp?.(event);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    onKeyPress?.(event);
  };

  // Handle paste
  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    onPaste?.(event);
  };

  // Handle icon click
  const handleIconClick = () => {
    if (iconClick) {
      iconClick();
    }
  };

  // Handle container click to focus input
  const handleContainerClick = () => {
    if (inputRef.current && !disabled && !readOnly) {
      inputRef.current.focus();
    }
  };

  // Get current error message
  const currentErrorMessage = errorMessage || validationError;

  // Get current success message
  const currentSuccessMessage = successMessage;

  // Get current guid message
  const currentGuidMessage = guidMessage;

  return (
    <div
      className={`textField-container ${fullWidth ? "textField-fullWidth" : ""} textField-${size} textField-${variant} textField-${color}`}
    >
      {label && (
        <label htmlFor={id} className="textField-label">
          {label}
          {required && <span className="textField-required"> *</span>}
        </label>
      )}
      <div
        className={`textField-input ${currentErrorMessage ? "errorMessage" : ""} ${disabled ? "disabled" : ""} ${isFocused ? "focused" : ""} ${readOnly ? "readOnly" : ""}`}
        onClick={handleContainerClick}
      >
        {/* Start Icon */}
        {(firstIconSrc || (startIcon && iconPosition === "start")) && (
          <div
            className="textField-icon textField-startIcon"
            onClick={iconClick ? handleIconClick : undefined}
            style={{ cursor: iconClick ? "pointer" : "default" }}
          >
            {firstIconSrc ? <img src={firstIconSrc} alt="start icon for input" /> : startIcon}
          </div>
        )}

        <input
          ref={inputRef}
          type={type}
          className={`textField-inputElement ${className ? className : ""}`}
          id={id}
          name={name}
          placeholder={placeholder ? placeholder : ""}
          style={{ direction: direction }}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          value={internalValue}
          maxLength={maxLength}
          minLength={minLength}
          pattern={pattern}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          tabIndex={tabIndex}
          aria-label={ariaLabel}
          aria-describedby={ariaDescribedby}
          role={role}
          onChange={handleInputValue}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          onKeyPress={handleKeyPress}
          onPaste={handlePaste}
        />

        {/* End Icon */}
        {(lastIconSrc || (endIcon && iconPosition === "end")) && (
          <div
            className="textField-icon textField-endIcon"
            onClick={iconClick ? handleIconClick : undefined}
            style={{ cursor: iconClick ? "pointer" : "default" }}
          >
            {lastIconSrc ? <img src={lastIconSrc} alt="end icon for input" /> : endIcon}
          </div>
        )}
      </div>

      {/* Messages */}
      {(currentGuidMessage || currentSuccessMessage || currentErrorMessage) && (
        <div className="textField-message">
          {currentGuidMessage ? (
            <img className="textField-guidIcon" src={Info} alt="guidMessage icon" />
          ) : currentSuccessMessage ? (
            <img className="textField-successIcon" src={Success} alt="successMessage icon" />
          ) : currentErrorMessage ? (
            <img className="textField-errorIcon" src={Error} alt="errorMessage icon" />
          ) : null}

          {currentGuidMessage ? (
            <p className="textField-guidMessage">{currentGuidMessage}</p>
          ) : currentSuccessMessage ? (
            <p className="textField-successMessage">{currentSuccessMessage}</p>
          ) : currentErrorMessage ? (
            <p className="textField-errorMessage">{currentErrorMessage}</p>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default TextField;
