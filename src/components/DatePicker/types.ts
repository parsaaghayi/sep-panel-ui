import type { ReactNode } from "react";

export type CalendarSystem = "jalali" | "gregorian";
export type Locale = "fa" | "en";
export type MonthLabelStyle = "name" | "number";
export type Direction = "rtl" | "ltr";
export type PickerSize = "sm" | "md" | "lg";
export type PickerVariant = "outlined" | "filled" | "standard";
export type PickerColor = "primary" | "secondary" | "error" | "warning" | "success";

/** A date expressed inside a specific calendar system */
export interface ComponentDate {
  year: number;
  month: number;
  day: number;
}

export type PickerValue = Date | string | null;

/** The type of value `onChange` emits, derived from the `output` choice */
export type PickerOutputValue<O extends "date" | "string"> = O extends "date"
  ? Date | null
  : string | null;

/**
 * Value-aware configuration shared by all pickers.
 *
 * You can fully decouple what you give the component (`value`), what it shows
 * inside the trigger (`format`), and what it returns (`output`).
 *
 * Examples:
 *  - Show Shamsi but return Miladi:
 *      calendar="jalali" output="string" outputCalendar="gregorian"
 *  - Show Gregorian months with Persian names (ژوئن):
 *      calendar="gregorian" locale="fa" format="YYYY/MMMM/DD"
 *  - Show months as numbers instead of names:
 *      calendar="jalali" monthLabel="number" format="YYYY/MMMM"
 */
export interface CalendarConfigProps {
  /** Calendar shown (and by default used for parsing/output) */
  calendar?: CalendarSystem;
  /** Display language: digits, weekday names & Gregorian month names */
  locale?: Locale;
  /** Text direction of the widget */
  direction?: Direction;
  /** How months are written: by localized name or by number ("ماه ۶", "Month 6") */
  monthLabel?: MonthLabelStyle;
  /** Format used to render the selected value inside the trigger */
  format?: string;
  /** Format used to parse a string `value` (default: "YYYY/MM/DD") */
  parseFormat?: string;
  /** Calendar used to parse a string `value` (default: `calendar`) */
  parseCalendar?: CalendarSystem;
  /** What `onChange` emits: a real Date or a formatted string (default: "date") */
  output?: "date" | "string";
  /** Format used to stringify the output when `output === "string"` */
  outputFormat?: string;
  /** Calendar used to render the string output (default: `calendar`) */
  outputCalendar?: CalendarSystem;
}

/** Styling / accessibility props shared by the input-based pickers */
export interface PickerInputProps {
  id?: string;
  label?: string;
  className?: string;
  placeholder?: string;
  firstIconSrc?: string;
  lastIconSrc?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  iconPosition?: "start" | "end";
  iconClick?: () => void;
  guidMessage?: string;
  successMessage?: string;
  errorMessage?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  size?: PickerSize;
  variant?: PickerVariant;
  color?: PickerColor;
  fullWidth?: boolean;
  "aria-label"?: string;
  "aria-describedby"?: string;
  role?: string;
}

export interface DatePickerProps<O extends "date" | "string" = "date">
  extends CalendarConfigProps, PickerInputProps {
  output?: O;
  value?: PickerValue;
  onChange?: (value: PickerOutputValue<O>) => void;
  minDate?: Date;
  maxDate?: Date;
}

export interface DateRangeValue {
  start: PickerValue;
  end: PickerValue;
}

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export interface RangePickerProps<O extends "date" | "string" = "date">
  extends CalendarConfigProps, PickerInputProps {
  output?: O;
  value?: DateRangeValue | null;
  onChange?: (value: { start: PickerOutputValue<O>; end: PickerOutputValue<O> }) => void;
  minDate?: Date;
  maxDate?: Date;
  /** Separator shown between start and end (default: "–") */
  separator?: string;
}

export interface DayPickerProps<O extends "date" | "string" = "date"> extends CalendarConfigProps {
  output?: O;
  id?: string;
  className?: string;
  label?: string;
  value?: PickerValue;
  onChange?: (value: PickerOutputValue<O>) => void;
  minDate?: Date;
  maxDate?: Date;
}

export interface MonthPickerProps<O extends "date" | "string" = "date">
  extends CalendarConfigProps, PickerInputProps {
  output?: O;
  value?: PickerValue;
  onChange?: (value: PickerOutputValue<O>) => void;
  minDate?: Date;
  maxDate?: Date;
}

export interface YearPickerProps<O extends "date" | "string" = "date">
  extends CalendarConfigProps, PickerInputProps {
  output?: O;
  value?: PickerValue;
  onChange?: (value: PickerOutputValue<O>) => void;
  minDate?: Date;
  maxDate?: Date;
}

/* ------------------------------------------------------------------ */
/* Internal building blocks                                            */
/* ------------------------------------------------------------------ */

export type CalendarView = "days" | "months" | "years";

export type CalendarSelectEvent = (date: Date) => void;

export interface CalendarCoreProps {
  calendar: CalendarSystem;
  locale: Locale;
  direction: Direction;
  monthLabel?: MonthLabelStyle;
  mode?: "single" | "range";
  /** Selected date (single mode) */
  value?: Date | null;
  /** Selected range (range mode) */
  range?: DateRange | null;
  initialView?: CalendarView;
  /** Where the calendar starts when no value exists (defaults to today) */
  initialDate?: Date | null;
  minDate?: Date | null;
  maxDate?: Date | null;
  onSelectDate?: CalendarSelectEvent;
  onSelectMonth?: CalendarSelectEvent;
  onSelectYear?: CalendarSelectEvent;
  onRangeSelect?: (range: DateRange) => void;
  /** Renders inline instead of absolutely positioned popover */
  inline?: boolean;
  className?: string;
  clearable?: boolean;
  onClear?: () => void;
}

export interface PickerShellProps extends PickerInputProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Rendered display value inside the input */
  displayValue: string;
  locale: Locale;
  direction: Direction;
  children?: ReactNode;
}

export interface LocaleConfig {
  months: string[];
  weekDays: string[];
  weekDaysShort: string[];
  direction: Direction;
  firstDayOfWeek: number;
}

export interface JalaliDate {
  year: number;
  month: number;
  day: number;
}
