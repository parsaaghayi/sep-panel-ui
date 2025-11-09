import React, { useState, useEffect, useRef } from "react";
import { DatePickerProps } from "./types";
import { gregorianToJalali, formatJalaliDate, toPersianNumbers } from "./jalaliUtils";
import { localeConfigs } from "./localeConfig";
import Calendar from "./Calendar";
import "./style.css";

const DatePicker: React.FC<DatePickerProps> = ({
  id,
  label,
  className,
  placeholder,
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
  disabled = false,
  readOnly = false,
  required = false,
  
  // Locale Props
  locale = "fa",
  direction,
  
  // Date Props
  minDate,
  maxDate,
  format = "YYYY/MM/DD",
  
  // Styling Props
  size = "md",
  variant = "outlined",
  color = "primary",
  fullWidth = false,
  
  // Accessibility Props
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedby,
  role,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [displayValue, setDisplayValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const config = localeConfigs[locale];
  const actualDirection = direction || config.direction;

  // تبدیل مقدار اولیه به فرمت نمایش
  useEffect(() => {
    if (value) {
      let date: Date;
      if (typeof value === "string") {
        date = new Date(value);
      } else {
        date = value;
      }
      
      if (!isNaN(date.getTime())) {
        if (locale === "fa") {
          const jalali = gregorianToJalali(date.getFullYear(), date.getMonth() + 1, date.getDate());
          const formatted = formatJalaliDate(jalali, format);
          setDisplayValue(toPersianNumbers(formatted));
        } else {
          const year = date.getFullYear();
          const month = (date.getMonth() + 1).toString().padStart(2, "0");
          const day = date.getDate().toString().padStart(2, "0");
          setDisplayValue(format.replace("YYYY", year.toString()).replace("MM", month).replace("DD", day));
        }
      }
    } else {
      setDisplayValue("");
    }
  }, [value, locale, format]);

  // بستن تقویم با کلیک خارج از آن
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // مدیریت تغییر تاریخ
  const handleDateSelect = (date: Date) => {
    onChange(date);
    setIsOpen(false);
  };

  // مدیریت کلیک روی input
  const handleInputClick = () => {
    if (!disabled && !readOnly) {
      setIsOpen(!isOpen);
    }
  };

  // مدیریت focus
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  // مدیریت کلیک روی آیکون
  const handleIconClick = () => {
    if (iconClick) {
      iconClick();
    } else if (!disabled && !readOnly) {
      setIsOpen(!isOpen);
    }
  };

  // مدیریت کلیک روی container
  const handleContainerClick = () => {
    if (!disabled && !readOnly) {
      inputRef.current?.focus();
      setIsOpen(!isOpen);
    }
  };

  // دریافت پیام خطا
  const currentErrorMessage = errorMessage;
  const currentSuccessMessage = successMessage;
  const currentGuidMessage = guidMessage;

  return (
    <div 
      ref={containerRef}
      className={`datePicker-container ${fullWidth ? "datePicker-fullWidth" : ""} datePicker-${size} datePicker-${variant} datePicker-${color}`}
      style={{ direction: actualDirection }}
    >
      {label && (
        <label htmlFor={id} className="datePicker-label">
          {label}
          {required && <span className="datePicker-required"> *</span>}
        </label>
      )}
      
      <div
        className={`datePicker-input ${currentErrorMessage ? "errorMessage" : ""} ${disabled ? "disabled" : ""} ${isFocused ? "focused" : ""} ${readOnly ? "readOnly" : ""}`}
        onClick={handleContainerClick}
      >
        {/* Start Icon */}
        {(firstIconSrc || (startIcon && iconPosition === "start")) && (
          <div 
            className="datePicker-icon datePicker-startIcon"
            onClick={handleIconClick}
            style={{ cursor: iconClick || !disabled ? "pointer" : "default" }}
          >
            {firstIconSrc ? (
              <img src={firstIconSrc} alt="start icon for date picker" />
            ) : (
              startIcon
            )}
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
          onFocus={handleFocus}
          onBlur={handleBlur}
          onClick={handleInputClick}
        />
        
        {/* End Icon */}
        {(lastIconSrc || (endIcon && iconPosition === "end")) && (
          <div 
            className="datePicker-icon datePicker-endIcon"
            onClick={handleIconClick}
            style={{ cursor: iconClick || !disabled ? "pointer" : "default" }}
          >
            {lastIconSrc ? (
              <img src={lastIconSrc} alt="end icon for date picker" />
            ) : (
              endIcon
            )}
          </div>
        )}
      </div>
      
      {/* Calendar */}
      {isOpen && (
        <Calendar
          selectedDate={value instanceof Date ? value : value ? new Date(value) : null}
          onDateSelect={handleDateSelect}
          onClose={() => setIsOpen(false)}
          locale={locale}
          direction={actualDirection}
          minDate={minDate}
          maxDate={maxDate}
        />
      )}
      
      {/* Messages */}
      {(currentGuidMessage || currentSuccessMessage || currentErrorMessage) && (
        <div className="datePicker-message">
          {currentGuidMessage ? (
            <img
              className="datePicker-guidIcon"
              src="/src/images/info.svg"
              alt="guidMessage icon"
            />
          ) : currentSuccessMessage ? (
            <img
              className="datePicker-successIcon"
              src="/src/images/success.svg"
              alt="successMessage icon"
            />
          ) : currentErrorMessage ? (
            <img
              className="datePicker-errorIcon"
              src="/src/images/error.svg"
              alt="errorMessage icon"
            />
          ) : null}
          
          {currentGuidMessage ? (
            <p className="datePicker-guidMessage">{currentGuidMessage}</p>
          ) : currentSuccessMessage ? (
            <p className="datePicker-successMessage">{currentSuccessMessage}</p>
          ) : currentErrorMessage ? (
            <p className="datePicker-errorMessage">{currentErrorMessage}</p>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default DatePicker;

