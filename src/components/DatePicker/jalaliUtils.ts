import { JalaliDate } from "./types";

// تبدیل تاریخ میلادی به شمسی
export function gregorianToJalali(gy: number, gm: number, gd: number): JalaliDate {
  const g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  let jy = gy <= 1600 ? 0 : 979;
  gy -= gy <= 1600 ? 621 : 1600;
  const gy2 = gy > 2 ? gy + 1 : gy;
  let days = 365 * gy + Math.floor((gy2 + 3) / 4) - Math.floor((gy2 + 99) / 100) + Math.floor((gy2 + 399) / 400) - 80 + gd + g_d_m[gm - 1];
  jy += 33 * Math.floor(days / 12053);
  days %= 12053;
  jy += 4 * Math.floor(days / 1461);
  days %= 1461;
  if (days > 365) {
    jy += Math.floor((days - 1) / 365);
    days = (days - 1) % 365;
  }
  const jm = days < 186 ? 1 + Math.floor(days / 31) : 7 + Math.floor((days - 186) / 30);
  const jd = 1 + (days < 186 ? days % 31 : (days - 186) % 30);
  return { year: jy, month: jm, day: jd };
}

// تبدیل تاریخ شمسی به میلادی
export function jalaliToGregorian(jy: number, jm: number, jd: number): Date {
  const gy = jy <= 979 ? 621 : 1600;
  jy -= jy <= 979 ? 0 : 979;
  const gy2 = jy > 2 ? jy + 1 : jy;
  let days = 365 * jy + Math.floor((gy2 + 3) / 4) - Math.floor((gy2 + 99) / 100) + Math.floor((gy2 + 399) / 400) - 80 + jd + (jm < 7 ? (jm - 1) * 31 : (jm - 7) * 30 + 186);
  const gy3 = gy + Math.floor(days / 365) - (days % 365 === 0 ? 1 : 0);
  days = days % 365;
  if (days === 0) days = 365;
  const gm = days <= 31 ? 1 : days <= 59 ? 2 : days <= 90 ? 3 : days <= 120 ? 4 : days <= 151 ? 5 : days <= 181 ? 6 : days <= 212 ? 7 : days <= 243 ? 8 : days <= 273 ? 9 : days <= 304 ? 10 : days <= 334 ? 11 : 12;
  const gd = days - (gm === 1 ? 0 : gm === 2 ? 31 : gm === 3 ? 59 : gm === 4 ? 90 : gm === 5 ? 120 : gm === 6 ? 151 : gm === 7 ? 181 : gm === 8 ? 212 : gm === 9 ? 243 : gm === 10 ? 273 : gm === 11 ? 304 : 334);
  return new Date(gy3, gm - 1, gd);
}

// فرمت کردن تاریخ شمسی
export function formatJalaliDate(date: JalaliDate, format: string = "YYYY/MM/DD"): string {
  const year = date.year.toString();
  const month = date.month.toString().padStart(2, "0");
  const day = date.day.toString().padStart(2, "0");
  
  return format
    .replace("YYYY", year)
    .replace("MM", month)
    .replace("DD", day);
}

// تبدیل اعداد انگلیسی به فارسی
export function toPersianNumbers(str: string): string {
  const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return str.replace(/[0-9]/g, (digit) => persianNumbers[parseInt(digit)]);
}

// تبدیل اعداد فارسی به انگلیسی
export function toEnglishNumbers(str: string): string {
  const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return str.replace(/[۰-۹]/g, (digit) => persianNumbers.indexOf(digit).toString());
}

// بررسی اینکه آیا تاریخ معتبر است یا نه
export function isValidJalaliDate(year: number, month: number, day: number): boolean {
  if (year < 1 || month < 1 || month > 12 || day < 1) return false;
  
  const daysInMonth = month <= 6 ? 31 : month <= 11 ? 30 : (isLeapJalaliYear(year) ? 30 : 29);
  return day <= daysInMonth;
}

// بررسی سال کبیسه شمسی
export function isLeapJalaliYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

// دریافت تعداد روزهای ماه شمسی
export function getDaysInJalaliMonth(year: number, month: number): number {
  if (month <= 6) return 31;
  if (month <= 11) return 30;
  return isLeapJalaliYear(year) ? 30 : 29;
}

// دریافت روز هفته برای تاریخ شمسی
export function getJalaliWeekDay(year: number, month: number, day: number): number {
  const gregorianDate = jalaliToGregorian(year, month, day);
  return gregorianDate.getDay();
}

