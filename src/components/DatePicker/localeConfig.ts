import { LocaleConfig } from "./types";

export const localeConfigs: Record<string, LocaleConfig> = {
  fa: {
    months: [
      "فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور",
      "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"
    ],
    weekDays: [
      "شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه", "جمعه"
    ],
    weekDaysShort: ["ش", "ی", "د", "س", "چ", "پ", "ج"],
    direction: "rtl",
    firstDayOfWeek: 0 // شنبه
  },
  en: {
    months: [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ],
    weekDays: [
      "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ],
    weekDaysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    direction: "ltr",
    firstDayOfWeek: 0 // Sunday
  }
};

