import * as React from "react";
import { useState } from "react";
import CalendarCore from "./CalendarCore";
import PickerShell from "./PickerShell";
import { RangePickerProps, PickerOutputValue } from "./types";
import {
  formatForDisplay,
  makeRangeOutput,
  resolveConfig,
  resolveRange,
} from "./valueUtils";

function RangePicker<O extends "date" | "string" = "date">(
  props: RangePickerProps<O>
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
  });
  const [open, setOpen] = useState(false);

  const range = resolveRange(value, cfg);
  const startText = formatForDisplay(range.start, cfg);
  const endText = formatForDisplay(range.end, cfg);
  const displayValue =
    startText && endText
      ? `${startText}${separator}${endText}`
      : startText || endText || "";

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
            const out = makeRangeOutput(selected, cfg);
            onChange?.({
              start: out.start as PickerOutputValue<O>,
              end: out.end as PickerOutputValue<O>,
            });
            setOpen(false);
          }}
        />
      )}
    </PickerShell>
  );
}

export default RangePicker;