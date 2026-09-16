import * as React from "react";
import { useState } from "react";
import CalendarCore from "./CalendarCore";
import PickerShell from "./PickerShell";
import { YearPickerProps, PickerOutputValue } from "./types";
import {
  formatForDisplay,
  makeOutput,
  resolveConfig,
  resolveValue,
} from "./valueUtils";

function YearPicker<O extends "date" | "string" = "date">(
  props: YearPickerProps<O>
): React.ReactElement {
  const {
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
    ...shellProps
  } = props;

  const cfg = resolveConfig({
    calendar,
    locale,
    direction,
    monthLabel,
    format: format ?? "YYYY",
    parseFormat: parseFormat ?? "YYYY",
    parseCalendar,
    output,
    outputFormat: outputFormat ?? "YYYY",
    outputCalendar,
  });
  const [open, setOpen] = useState(false);

  const internalDate = resolveValue(value ?? null, cfg);
  const displayValue = formatForDisplay(internalDate, cfg);

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
          mode="single"
          initialView="years"
          value={internalDate}
          minDate={minDate}
          maxDate={maxDate}
          onSelectYear={(date) => {
            onChange?.(makeOutput(date, cfg) as PickerOutputValue<O>);
            setOpen(false);
          }}
        />
      )}
    </PickerShell>
  );
}

export default YearPicker;