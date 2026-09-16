import * as React from "react";
import { useState } from "react";
import {
  CalendarCoreProps,
  CalendarView,
  ComponentDate,
  DateRange,
} from "./types";
import {
  fromCalendarDate,
  getDaysInMonth,
  getFirstDayOfWeek,
  getMonthLabel,
  getWeekDayLabels,
  getWeekdayIndex,
  isSameDay,
  localizeDigits,
  startOfDay,
  toCalendarDate,
  todayIn,
  getDirection,
} from "./calendarUtils";

const CELLS = 42; // 6 rows × 7 days

function dayButtonClass(
  date: Date,
  opts: {
    value: Date | null;
    range: { start: Date | null; end: Date | null };
    hover: Date | null;
    min: Date | null;
    max: Date | null;
    isToday: boolean;
  }
): string {
  const classes = ["datePicker-calendar-day"];

  if (opts.value && isSameDay(date, opts.value)) {
    classes.push("datePicker-calendar-day-selected");
  }

  const { start, end } = opts.range;
  const inRange =
    start &&
    end &&
    date.getTime() > start.getTime() &&
    date.getTime() < end.getTime();
  if (start && isSameDay(date, start)) classes.push("datePicker-calendar-day-start");
  if (end && isSameDay(date, end)) classes.push("datePicker-calendar-day-end");
  if (inRange) classes.push("datePicker-calendar-day-inRange");

  const preview =
    start && !end && opts.hover && opts.hover.getTime() > start.getTime();
  if (preview && date.getTime() > start.getTime() && date.getTime() < opts.hover!.getTime()) {
    classes.push("datePicker-calendar-day-inRange");
  }

  if (opts.isToday) classes.push("datePicker-calendar-day-today");
  if (opts.min && date < opts.min) classes.push("datePicker-calendar-day-disabled");
  if (opts.max && date > opts.max) classes.push("datePicker-calendar-day-disabled");

  return classes.join(" ");
}

const CalendarCore: React.FC<CalendarCoreProps> = ({
  calendar,
  locale,
  direction,
  monthLabel = "name",
  mode = "single",
  value,
  range,
  initialView = "days",
  initialDate,
  minDate,
  maxDate,
  onSelectDate,
  onSelectMonth,
  onSelectYear,
  onRangeSelect,
  inline = false,
  className,
  clearable,
  onClear,
}) => {
  const initial = (): ComponentDate => {
    if (value) return toCalendarDate(value, calendar);
    if (range && range.start) return toCalendarDate(range.start, calendar);
    if (initialDate) return toCalendarDate(initialDate, calendar);
    return todayIn(calendar);
  };

  const first = initial();
  const [view, setView] = useState<CalendarView>(initialView);
  const [viewYear, setViewYear] = useState<number>(first.year);
  const [viewMonth, setViewMonth] = useState<number>(first.month);
  const [rangeStart, setRangeStart] = useState<Date | null>(
    mode === "range" && range ? range.start : null
  );
  const [rangeEnd, setRangeEnd] = useState<Date | null>(
    mode === "range" && range ? range.end : null
  );
  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  const actualDirection = direction || getDirection(locale);
  const minT = minDate ? startOfDay(minDate) : null;
  const maxT = maxDate ? startOfDay(maxDate) : null;
  const weekdayLabels = getWeekDayLabels(locale).short;

  const isToday = (date: Date) => isSameDay(date, new Date());
  const isDisabled = (date: Date) =>
    (minT && date < minT) || (maxT && date > maxT);

  const changeMonth = (increment: number) => {
    let m = viewMonth + increment;
    let y = viewYear;
    if (m > 12) {
      m = 1;
      y += 1;
    } else if (m < 1) {
      m = 12;
      y -= 1;
    }
    if (y < 1) y = 1;
    setViewMonth(m);
    setViewYear(y);
  };

  const changeYear = (increment: number) => {
    setViewYear((y) => Math.max(1, y + increment));
  };

  const handleDayClick = (date: Date) => {
    if (isDisabled(date)) return;

    if (mode === "range") {
      if (!rangeStart || (rangeStart && rangeEnd)) {
        setRangeStart(date);
        setRangeEnd(null);
        setHoverDate(null);
      } else {
        let start = rangeStart;
        let end = date;
        if (date < rangeStart) {
          start = date;
          end = rangeStart;
        }
        setRangeEnd(end);
        setHoverDate(null);
        if (onRangeSelect) onRangeSelect({ start, end });
      }
      return;
    }

    if (onSelectDate) onSelectDate(date);
  };

  const handleMonthClick = (month: number) => {
    const date = fromCalendarDate(viewYear, month, 1, calendar);
    if (isDisabled(date)) return;
    if (onSelectMonth) {
      onSelectMonth(date);
      return;
    }
    setViewMonth(month);
    setView("days");
  };

  const handleYearClick = (year: number) => {
    const date = fromCalendarDate(year, 1, 1, calendar);
    if (isDisabled(date)) return;
    if (onSelectYear) {
      onSelectYear(date);
      return;
    }
    setViewYear(year);
    setView("months");
  };

  const monthDisabled = (month: number): boolean => {
    const first = fromCalendarDate(viewYear, month, 1, calendar);
    const last = fromCalendarDate(
      viewYear,
      month,
      getDaysInMonth(viewYear, month, calendar),
      calendar
    );
    return (minT !== null && last < minT) || (maxT !== null && first > maxT);
  };

  const yearDisabled = (year: number): boolean => {
    const first = fromCalendarDate(year, 1, 1, calendar);
    const last = fromCalendarDate(year, 12, 31, calendar);
    return (minT !== null && last < minT) || (maxT !== null && first > maxT);
  };

  const hasSelection =
    (mode === "range" && !!(rangeStart || rangeEnd)) ||
    (mode === "single" && !!value);

  const monthLabelText = getMonthLabel(calendar, locale, viewMonth, monthLabel);

  /* -------------------- days grid -------------------- */
  const renderDays = () => {
    const daysInMonth = getDaysInMonth(viewYear, viewMonth, calendar);
    const firstOfMonth = fromCalendarDate(viewYear, viewMonth, 1, calendar);
    const offset = getWeekdayIndex(firstOfMonth, locale);

    const prevYear =
      viewMonth === 1 ? viewYear - 1 : viewYear;
    const prevMonth =
      viewMonth === 1 ? 12 : viewMonth - 1;
    const daysInPrev = getDaysInMonth(prevYear, prevMonth, calendar);

    const cells: JSX.Element[] = [];

    for (let i = offset - 1; i >= 0; i -= 1) {
      const day = daysInPrev - i;
      const date = fromCalendarDate(prevYear, prevMonth, day, calendar);
      cells.push(
        <div
          key={`prev-${day}-${i}`}
          className={`datePicker-calendar-day datePicker-calendar-day-otherMonth ${
            rangeStart && isSameDay(date, rangeStart) ? "datePicker-calendar-day-selected" : ""
          }`}
          onClick={() => handleDayClick(date)}
        >
          {localizeDigits(day, locale)}
        </div>
      );
    }

    for (let day = 1; day <= daysInMonth; day += 1) {
      const date = fromCalendarDate(viewYear, viewMonth, day, calendar);
      const cls = dayButtonClass(date, {
        value: mode === "single" ? value ?? null : null,
        range: { start: rangeStart, end: rangeEnd },
        hover: hoverDate,
        min: minT,
        max: maxT,
        isToday: isToday(date),
      });
      cells.push(
        <div
          key={day}
          className={cls}
          onClick={() => handleDayClick(date)}
          onMouseEnter={() => {
            if (mode === "range" && rangeStart && !rangeEnd) setHoverDate(date);
          }}
        >
          {localizeDigits(day, locale)}
        </div>
      );
    }

    const remaining = CELLS - cells.length;
    const nextYear =
      viewMonth === 12 ? viewYear + 1 : viewYear;
    const nextMonth =
      viewMonth === 12 ? 1 : viewMonth + 1;

    for (let day = 1; day <= remaining; day += 1) {
      const date = fromCalendarDate(nextYear, nextMonth, day, calendar);
      cells.push(
        <div
          key={`next-${day}`}
          className={`datePicker-calendar-day datePicker-calendar-day-otherMonth ${
            rangeStart && isSameDay(date, rangeStart) ? "datePicker-calendar-day-selected" : ""
          }`}
          onClick={() => handleDayClick(date)}
        >
          {localizeDigits(day, locale)}
        </div>
      );
    }

    return cells;
  };

  /* -------------------- months grid -------------------- */
  const renderMonths = () => {
    const cells: JSX.Element[] = [];
    const selected = value ? toCalendarDate(value, calendar) : null;

    for (let m = 1; m <= 12; m += 1) {
      const isViewMonth = viewMonth === m;
      const isSelected = selected && selected.month === m && selected.year === viewYear;
      cells.push(
        <div
          key={m}
          className={`calendarPicker-month ${
            isViewMonth ? "calendarPicker-month-viewing" : ""
          } ${isSelected ? "calendarPicker-cell-selected" : ""} ${
            monthDisabled(m) ? "calendarPicker-cell-disabled" : ""
          }`}
          onClick={() => !monthDisabled(m) && handleMonthClick(m)}
        >
          {getMonthLabel(calendar, locale, m, monthLabel)}
        </div>
      );
    }
    return cells;
  };

  /* -------------------- years grid -------------------- */
  const renderYears = () => {
    const cells: JSX.Element[] = [];
    const batchStart = Math.floor(viewYear / 12) * 12;
    const selected = value ? toCalendarDate(value, calendar) : null;

    for (let y = batchStart; y < batchStart + 12; y += 1) {
      const isViewYear = viewYear === y;
      const isSelected = selected && selected.year === y;
      cells.push(
        <div
          key={y}
          className={`calendarPicker-year ${
            isViewYear ? "calendarPicker-year-viewing" : ""
          } ${isSelected ? "calendarPicker-cell-selected" : ""} ${
            yearDisabled(y) ? "calendarPicker-cell-disabled" : ""
          }`}
          onClick={() => !yearDisabled(y) && handleYearClick(y)}
        >
          {localizeDigits(y, locale)}
        </div>
      );
    }
    return cells;
  };

  const headerLabel =
    view === "days"
      ? `${monthLabelText} ${localizeDigits(viewYear, locale)}`
      : view === "months"
      ? localizeDigits(viewYear, locale)
      : `${localizeDigits(Math.floor(viewYear / 12) * 12, locale)} – ${localizeDigits(
          Math.floor(viewYear / 12) * 12 + 11,
          locale
        )}`;

  const handleHeaderClick = () => {
    if (view === "days") setView("months");
    else if (view === "months") setView("years");
  };

  return (
    <div
      className={`datePicker-calendar ${
        actualDirection === "rtl"
          ? "datePicker-calendar-rtl"
          : "datePicker-calendar-ltr"
      } ${inline ? "calendarPicker-inline" : ""} ${
        className ? className : ""
      }`}
      style={{ direction: actualDirection }}
    >
      <div className="datePicker-calendar-header">
        <button
          className={`datePicker-calendar-navButton ${actualDirection === "rtl" ? "datePicker-calendar-navButton-rtl" : ""}`}
          type="button"
          aria-label="previous"
          onClick={() => (view === "days" ? changeMonth(-1) : changeYear(-1))}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div
          className="datePicker-calendar-monthYear calendarPicker-headerLabel"
          onClick={handleHeaderClick}
          role="button"
        >
          {headerLabel}
        </div>

        <button
          className={`datePicker-calendar-navButton ${actualDirection === "rtl" ? "datePicker-calendar-navButton-rtl" : ""}`}
          type="button"
          aria-label="next"
          onClick={() => (view === "days" ? changeMonth(1) : changeYear(1))}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {view === "days" && (
        <>
          <div className="datePicker-calendar-weekdays">
            {Array.from({ length: 7 }, (_, i) => {
              const dow = (getFirstDayOfWeek(locale) + i) % 7;
              return (
                <div key={i} className="datePicker-calendar-weekday">
                  {weekdayLabels[dow]}
                </div>
              );
            })}
          </div>
          <div className="datePicker-calendar-days">{renderDays()}</div>
        </>
      )}

      {view === "months" && (
        <div className="calendarPicker-grid calendarPicker-monthGrid">{renderMonths()}</div>
      )}

      {view === "years" && (
        <div className="calendarPicker-grid calendarPicker-yearGrid">{renderYears()}</div>
      )}

      {clearable && hasSelection && onClear && (
        <button
          className="calendarPicker-clear"
          type="button"
          onClick={onClear}
        >
          {locale === "fa" ? "پاک کردن" : "Clear"}
        </button>
      )}
    </div>
  );
};

export default CalendarCore;