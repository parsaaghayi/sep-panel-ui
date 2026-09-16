import * as React from "react";
import CalendarCore from "./CalendarCore";
import { DayPickerProps, PickerOutputValue } from "./types";
import { makeOutput, resolveConfig, resolveValue } from "./valueUtils";

function DayPicker<O extends "date" | "string" = "date">(
  props: DayPickerProps<O>,
): React.ReactElement {
  const {
    id,
    className,
    label,
    value,
    onChange,
    minDate,
    maxDate,
    calendar,
    locale,
    direction,
    monthLabel,
    format,
    parseFormat,
    parseCalendar,
    output,
    outputFormat,
    outputCalendar,
  } = props;

  const cfg = resolveConfig({
    calendar,
    locale,
    direction,
    monthLabel,
    format,
    parseFormat,
    parseCalendar,
    output,
    outputFormat,
    outputCalendar,
  });

  const internalDate = resolveValue(value ?? null, cfg);

  return (
    <div
      className={`dayPicker-wrapper ${className ? className : ""}`}
      style={{ direction: cfg.direction }}
    >
      {label && (
        <label htmlFor={id} className="datePicker-label">
          {label}
        </label>
      )}
      <CalendarCore
        calendar={cfg.calendar}
        locale={cfg.locale}
        direction={cfg.direction}
        monthLabel={cfg.monthLabel}
        mode="single"
        initialView="days"
        value={internalDate}
        minDate={minDate}
        maxDate={maxDate}
        inline
        onSelectDate={(date) => onChange?.(makeOutput(date, cfg) as PickerOutputValue<O>)}
      />
    </div>
  );
}

export default DayPicker;
