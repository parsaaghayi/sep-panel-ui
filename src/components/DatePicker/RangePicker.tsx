import * as React from "react";
import { useState } from "react";
import CalendarCore from "./CalendarCore";
import PickerShell from "./PickerShell";
import { RangePickerProps, PickerOutputValue, DateRange } from "./types";
import { formatForDisplay, makeRangeOutput, resolveConfig, resolveRange } from "./valueUtils";
import { addDays, addMonths, startOfDay } from "./calendarUtils";

function RangePicker<O extends "date" | "string" = "date">(
  props: RangePickerProps<O>,
): React.ReactElement {
  const {
    value,
    onChange,
    minDate,
    maxDate,
    separator = "–",
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
    outputLocale,
    rangePresets,
    presetsPosition = "end",
    ...shellProps
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
    outputLocale,
  });
  const [open, setOpen] = useState(false);

  const range = resolveRange(value, cfg);
  const startText = formatForDisplay(range.start, cfg);
  const endText = formatForDisplay(range.end, cfg);
  const displayValue =
    startText && endText ? `${startText}${separator}${endText}` : startText || endText || "";

  const emitRange = (selected: DateRange) => {
    onChange?.(makeRangeOutput(selected, cfg) as {
      start: PickerOutputValue<O>;
      end: PickerOutputValue<O>;
    });
    setOpen(false);
  };

  return (
    <PickerShell
      {...shellProps}
      open={open}
      onOpenChange={setOpen}
      displayValue={displayValue}
      locale={cfg.locale}
      direction={cfg.direction}
    >
      {open && (
        <div
          className={
            rangePresets?.length
              ? `datePicker-dropdownRow datePicker-dropdownRow-${presetsPosition}`
              : ""
          }
        >
          <CalendarCore
            calendar={cfg.calendar}
            locale={cfg.locale}
            direction={cfg.direction}
            monthLabel={cfg.monthLabel}
            mode="range"
            initialView="days"
            range={range}
            minDate={minDate}
            maxDate={maxDate}
            onRangeSelect={(selected) => {
              emitRange(selected);
            }}
          />
          {rangePresets?.length ? (
            <div className="datePicker-presets" role="group" aria-label="range presets">
              {rangePresets.map((preset) => {
                const today = startOfDay(new Date());
                const start =
                  preset.unit === "month"
                    ? addMonths(today, -preset.amount, cfg.calendar)
                    : preset.unit === "year"
                      ? addMonths(today, -preset.amount * 12, cfg.calendar)
                      : addDays(today, -preset.amount * (preset.unit === "week" ? 7 : 1));
                const minT = minDate ? startOfDay(minDate) : null;
                const disabled = minT !== null && start < minT;
                return (
                  <button
                    key={preset.label}
                    type="button"
                    className={`datePicker-preset ${disabled ? "datePicker-preset-disabled" : ""}`}
                    disabled={disabled}
                    onClick={() => emitRange({ start, end: today })}
                  >
                    {preset.label}
                  </button>
                );
              })}
            </div>
          ) : null}
        </div>
      )}
    </PickerShell>
  );
}

export default RangePicker;