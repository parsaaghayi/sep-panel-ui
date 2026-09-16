import { CalendarSystem, Locale, MonthLabelStyle, ComponentDate } from "./types";

/* ------------------------------------------------------------------ */
/* Constants & month/weekday names                                     */
/* ------------------------------------------------------------------ */

const JALALI_MONTHS_FA = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];

const JALALI_MONTHS_EN = [
  "Farvardin",
  "Ordibehesht",
  "Khordad",
  "Tir",
  "Mordad",
  "Shahrivar",
  "Mehr",
  "Aban",
  "Azar",
  "Dey",
  "Bahman",
  "Esfand",
];

const GREGORIAN_MONTHS_FA = [
  "ژانویه",
  "فوریه",
  "مارس",
  "آوریل",
  "مه",
  "ژوئن",
  "ژوئیه",
  "اوت",
  "سپتامبر",
  "اکتبر",
  "نوامبر",
  "دسامبر",
];

const GREGORIAN_MONTHS_EN = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const WEEKDAYS_FA = ["یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه", "جمعه", "شنبه"];

const WEEKDAYS_SHORT_FA = ["ی", "د", "س", "چ", "پ", "ج", "ش"];

const WEEKDAYS_EN = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const WEEKDAYS_SHORT_EN = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const MONTH_NAMES: Record<CalendarSystem, Record<Locale, string[]>> = {
  jalali: { fa: JALALI_MONTHS_FA, en: JALALI_MONTHS_EN },
  gregorian: { fa: GREGORIAN_MONTHS_FA, en: GREGORIAN_MONTHS_EN },
};

/* ------------------------------------------------------------------ */
/* Digits                                                              */
/* ------------------------------------------------------------------ */

const PERSIAN_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

export function toFaDigits(value: string | number): string {
  return String(value).replace(/[0-9]/g, (d) => PERSIAN_DIGITS[Number(d)]);
}

export function toEnDigits(value: string | number): string {
  return String(value).replace(/[۰-۹]/g, (d) => String(PERSIAN_DIGITS.indexOf(d)));
}

export function localizeDigits(value: string | number, locale: Locale): string {
  return locale === "fa" ? toFaDigits(value) : toEnDigits(value);
}

/* ------------------------------------------------------------------ */
/* Locale helpers                                                      */
/* ------------------------------------------------------------------ */

export function getMonthNames(calendar: CalendarSystem, locale: Locale): string[] {
  return MONTH_NAMES[calendar][locale];
}

export function getMonthLabel(
  calendar: CalendarSystem,
  locale: Locale,
  month: number,
  monthLabel: MonthLabelStyle = "name",
): string {
  if (monthLabel === "number") {
    const number = localizeDigits(month, locale);
    return locale === "fa" ? `ماه ${number}` : `Month ${number}`;
  }
  return getMonthNames(calendar, locale)[month - 1];
}

export function getWeekDayLabels(locale: Locale): {
  full: string[];
  short: string[];
} {
  return {
    full: locale === "fa" ? WEEKDAYS_FA : WEEKDAYS_EN,
    short: locale === "fa" ? WEEKDAYS_SHORT_FA : WEEKDAYS_SHORT_EN,
  };
}

export function getFirstDayOfWeek(locale: Locale): number {
  return locale === "fa" ? 6 : 0; // fa: Saturday, en: Sunday
}

export function getDirection(locale: Locale): "rtl" | "ltr" {
  return locale === "fa" ? "rtl" : "ltr";
}

/* ------------------------------------------------------------------ */
/* Jalali <-> Gregorian conversion (port of jalaali-js, MIT)           */
/* ------------------------------------------------------------------ */

function div(a: number, b: number): number {
  return Math.trunc(a / b);
}

function mod(a: number, b: number): number {
  return a - Math.trunc(a / b) * b;
}

const BREAKS = [
  -61, 9, 38, 199, 426, 686, 756, 818, 1111, 1181, 1210, 1635, 2060, 2097, 2192, 2262, 2324, 2394,
  2456, 3178,
];

function jalCal(jy: number): { leap: number; gy: number; march: number } {
  const bl = BREAKS.length;
  const gy = jy + 621;
  let leapJ = -14;
  let jp = BREAKS[0];
  let jm = 0;
  let jump = 0;
  let leap = 0;
  let leapG = 0;
  let march = 0;
  let n = 0;
  let i: number;

  if (jy < jp || jy >= BREAKS[bl - 1]) {
    throw new Error(`Invalid Jalali year ${jy}`);
  }

  for (i = 1; i < bl; i += 1) {
    jm = BREAKS[i];
    jump = jm - jp;
    if (jy < jm) break;
    leapJ = leapJ + div(jump, 33) * 8 + div(mod(jump, 33), 4);
    jp = jm;
  }
  n = jy - jp;

  leapJ = leapJ + div(n, 33) * 8 + div(mod(n, 33) + 3, 4);
  if (mod(jump, 33) === 4 && jump - n === 4) leapJ += 1;

  leapG = div(gy, 4) - div((div(gy, 100) + 1) * 3, 4) - 150;

  march = 20 + leapJ - leapG;

  if (jump - n < 6) n = n - jump + div(jump + 4, 33) * 33;
  leap = mod(mod(n + 1, 33) - 1, 4);
  if (leap === -1) leap = 4;

  return { leap, gy, march };
}

function g2d(gy: number, gm: number, gd: number): number {
  let d =
    div((gy + div(gm - 8, 6) + 100100) * 1461, 4) +
    div(153 * mod(gm + 9, 12) + 2, 5) +
    gd -
    34840408;
  d = d - div(div(gy + 100100 + div(gm - 8, 6), 100) * 3, 4) + 752;
  return d;
}

function d2g(jdn: number): { gy: number; gm: number; gd: number } {
  let j = 4 * jdn + 139361631;
  j = j + div(div(4 * jdn + 183187720, 146097) * 3, 4) * 4 - 3908;
  const i = div(mod(j, 1461), 4) * 5 + 308;
  const gd = div(mod(i, 153), 5) + 1;
  const gm = mod(div(i, 153), 12) + 1;
  const gy = div(j, 1461) - 100100 + div(8 - gm, 6);
  return { gy, gm, gd };
}

function j2d(jy: number, jm: number, jd: number): number {
  const r = jalCal(jy);
  return g2d(r.gy, 3, r.march) + (jm - 1) * 31 - div(jm, 7) * (jm - 7) + jd - 1;
}

function d2j(jdn: number): { jy: number; jm: number; jd: number } {
  const gy = d2g(jdn).gy;
  let jy = gy - 621;
  const r = jalCal(jy);
  const jdn1f = g2d(gy, 3, r.march);
  let k = jdn - jdn1f;
  let jm: number;
  let jd: number;

  if (k >= 0) {
    if (k <= 185) {
      jm = 1 + div(k, 31);
      jd = mod(k, 31) + 1;
      return { jy, jm, jd };
    }
    k -= 186;
  } else {
    jy -= 1;
    k += 179;
    if (r.leap === 1) k += 1;
  }

  jm = 7 + div(k, 30);
  jd = mod(k, 30) + 1;
  return { jy, jm, jd };
}

/* ------------------------------------------------------------------ */
/* Calendar arithmetic exposed by the engine                           */
/* ------------------------------------------------------------------ */

export function isLeapYear(year: number, calendar: CalendarSystem): boolean {
  if (calendar === "gregorian") {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }
  return jalCal(year).leap === 0;
}

export function getDaysInMonth(year: number, month: number, calendar: CalendarSystem): number {
  if (calendar === "gregorian") {
    return new Date(year, month, 0).getDate();
  }
  if (month <= 6) return 31;
  if (month <= 11) return 30;
  return isLeapYear(year, calendar) ? 30 : 29;
}

/** Normalizes a Date to local midnight */
export function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

/** A date in a given calendar system: { year, month, day } */
export function toCalendarDate(date: Date, calendar: CalendarSystem): ComponentDate {
  const d = startOfDay(date);
  if (calendar === "gregorian") {
    return { year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() };
  }
  const j = d2j(g2d(d.getFullYear(), d.getMonth() + 1, d.getDate()));
  return { year: j.jy, month: j.jm, day: j.jd };
}

/** Builds a local-midnight Date from a calendar-system date */
export function fromCalendarDate(
  year: number,
  month: number,
  day: number,
  calendar: CalendarSystem,
): Date {
  if (calendar === "gregorian") {
    return new Date(year, month - 1, day);
  }
  const g = d2g(j2d(year, month, day));
  return new Date(g.gy, g.gm - 1, g.gd);
}

export function todayIn(calendar: CalendarSystem): ComponentDate {
  return toCalendarDate(new Date(), calendar);
}

export function getWeekdayIndex(date: Date, locale: Locale): number {
  const first = getFirstDayOfWeek(locale);
  return (date.getDay() - first + 7) % 7;
}

export function isSameDay(a: Date | null, b: Date | null): boolean {
  if (!a || !b) return false;
  const x = startOfDay(a);
  const y = startOfDay(b);
  return (
    x.getFullYear() === y.getFullYear() &&
    x.getMonth() === y.getMonth() &&
    x.getDate() === y.getDate()
  );
}

export function isBeforeDay(a: Date, b: Date): boolean {
  return startOfDay(a).getTime() < startOfDay(b).getTime();
}

export function isAfterDay(a: Date, b: Date): boolean {
  return startOfDay(a).getTime() > startOfDay(b).getTime();
}

/* ------------------------------------------------------------------ */
/* Formatting                                                          */
/* ------------------------------------------------------------------ */

/** Validates a calendar-system date */
export function isValidDate(
  year: number,
  month: number,
  day: number,
  calendar: CalendarSystem,
): boolean {
  if (month < 1 || month > 12 || day < 1 || year < 1) return false;
  return day <= getDaysInMonth(year, month, calendar);
}

export function formatComponentDate(
  date: ComponentDate | null,
  calendar: CalendarSystem,
  locale: Locale,
  format = "YYYY/MM/DD",
  monthLabel: MonthLabelStyle = "name",
): string {
  if (!date) return "";
  const d = date;

  const pad = (n: number) => n.toString().padStart(2, "0");

  if (format.includes("MMMM")) {
    format = format.replace("MMMM", getMonthLabel(calendar, locale, d.month, monthLabel));
  }

  format = format
    .replace("YYYY", localizeDigits(d.year, locale))
    .replace("YY", localizeDigits(d.year % 100, locale))
    .replace("MM", localizeDigits(pad(d.month), locale))
    .replace("M", localizeDigits(d.month, locale))
    .replace("DD", localizeDigits(pad(d.day), locale))
    .replace("D", localizeDigits(d.day, locale));

  return format;
}

export function formatDate(
  date: Date | null,
  calendar: CalendarSystem,
  locale: Locale,
  format = "YYYY/MM/DD",
  monthLabel: MonthLabelStyle = "name",
): string {
  if (!date) return "";
  return formatComponentDate(toCalendarDate(date, calendar), calendar, locale, format, monthLabel);
}

/* ------------------------------------------------------------------ */
/* Parsing                                                             */
/* ------------------------------------------------------------------ */

/** Parses a date string (with digits localized in either Persian or English form) */
export function parseDateString(
  value: string,
  calendar: CalendarSystem,
  locale: Locale,
  format = "YYYY/MM/DD",
): Date | null {
  if (!value || typeof value !== "string") return null;

  let rest = toEnDigits(value.trim());
  let year: number | null = null;
  let month: number | null = null;
  let day: number | null = null;

  // MMMM token: match against the localized month names or the one-shot calendar month names
  if (format.includes("MMMM")) {
    let matched = false;
    const nameSet = getMonthNames(calendar, locale);
    for (let i = 0; i < 12; i += 1) {
      const name = nameSet[i];
      if (rest.includes(name)) {
        month = i + 1;
        rest = rest.replace(name, " ");
        matched = true;
        break;
      }
    }
    if (!matched) {
      // Try the month in the *other* locale name set
      const otherLocale: Locale = locale === "fa" ? "en" : "fa";
      const altSet = getMonthNames(calendar, otherLocale);
      for (let i = 0; i < 12; i += 1) {
        if (rest.includes(altSet[i])) {
          month = i + 1;
          rest = rest.replace(altSet[i], " ");
          matched = true;
          break;
        }
      }
    }
    if (!matched) {
      // Lenient fallback: allow a numeric month even when the format says MMMM
      format = format.replace("MMMM", "MM");
    }
  }

  // Extract tokens in order (YYYY, YY, MM, M, DD, D) then literals
  const tokens: string[] = [];
  const parts = format.split(/(YYYY|YY|MM|M|DD|D|MMMM)/g);
  for (const part of parts) {
    if (
      part &&
      (part === "YYYY" ||
        part === "YY" ||
        part === "MM" ||
        part === "M" ||
        part === "DD" ||
        part === "D")
    ) {
      tokens.push(part);
    }
  }

  for (const token of tokens) {
    if (token === "YYYY") {
      const m = rest.match(/^\d{4}/);
      if (m) {
        year = Number(m[0]);
        rest = rest.slice(4);
      } else {
        const m2 = rest.match(/^\d{2}/);
        if (m2) {
          year = 2000 + Number(m2[0]);
          rest = rest.slice(2);
        }
      }
    } else if (token === "YY" || token === "MM" || token === "DD") {
      const m = rest.match(/^\d{1,2}/);
      if (m) {
        const v = Number(m[0]);
        if (token === "MM") month = v;
        if (token === "DD") day = v;
        if (token === "YY") year = 2000 + v;
        rest = rest.slice(m[0].length);
      }
    } else if (token === "M" || token === "D") {
      const m = rest.match(/^\d{1,2}/);
      if (m) {
        const v = Number(m[0]);
        if (token === "M") month = v;
        if (token === "D") day = v;
        rest = rest.slice(m[0].length);
      }
    }
    // remove one separator/literal char from the rest when possible
    const sep = rest.match(/^\D/);
    if (sep) rest = rest.slice(1);
  }

  if (year === null || month === null || day === null || !isValidDate(year, month, day, calendar)) {
    return null;
  }

  return fromCalendarDate(year, month, day, calendar);
}
