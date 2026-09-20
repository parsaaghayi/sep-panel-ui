import {
  CalendarConfigProps,
  CalendarSystem,
  DateRange,
  DateRangeValue,
  Direction,
  Locale,
  MonthLabelStyle,
  PickerValue,
} from "./types";
import { formatDate, getDirection, parseDateString, startOfDay } from "./calendarUtils";

export interface ResolvedConfig {
  calendar: CalendarSystem;
  locale: Locale;
  direction: Direction;
  monthLabel: MonthLabelStyle;
  format: string;
  parseFormat: string;
  parseCalendar: CalendarSystem;
  output: "date" | "string";
  outputFormat: string;
  outputCalendar: CalendarSystem;
  outputLocale: Locale;
}

export function resolveConfig(props: CalendarConfigProps): ResolvedConfig {
  const locale = props.locale ?? "fa";
  const calendar = props.calendar ?? (locale === "fa" ? "jalali" : "gregorian");
  return {
    locale,
    calendar,
    direction: props.direction ?? getDirection(locale),
    monthLabel: props.monthLabel ?? "name",
    format: props.format ?? "YYYY/MM/DD",
    parseFormat: props.parseFormat ?? "YYYY/MM/DD",
    parseCalendar: props.parseCalendar ?? calendar,
    output: props.output ?? "date",
    outputFormat: props.outputFormat ?? "YYYY/MM/DD",
    outputCalendar: props.outputCalendar ?? calendar,
    outputLocale: props.outputLocale ?? locale,
  };
}

export function resolveValue(value: PickerValue, cfg: ResolvedConfig): Date | null {
  if (value === null || value === undefined) return null;
  if (value instanceof Date) {
    return isNaN(value.getTime()) ? null : startOfDay(value);
  }
  return parseDateString(value, cfg.parseCalendar, cfg.locale, cfg.parseFormat);
}

export function makeOutput(date: Date | null, cfg: ResolvedConfig): Date | string | null {
  if (!date) return null;
  if (cfg.output === "date") return date;
  return formatDate(date, cfg.outputCalendar, cfg.outputLocale, cfg.outputFormat, cfg.monthLabel);
}

export function formatForDisplay(
  date: Date | null,
  cfg: ResolvedConfig,
  formatOverride?: string,
): string {
  if (!date) return "";
  return formatDate(date, cfg.calendar, cfg.locale, formatOverride ?? cfg.format, cfg.monthLabel);
}

export function resolveRange(
  value: DateRangeValue | null | undefined,
  cfg: ResolvedConfig,
): DateRange {
  return {
    start: value ? resolveValue(value.start, cfg) : null,
    end: value ? resolveValue(value.end, cfg) : null,
  };
}

export function makeRangeOutput(range: DateRange, cfg: ResolvedConfig): DateRangeValue {
  return {
    start: makeOutput(range.start, cfg),
    end: makeOutput(range.end, cfg),
  };
}
