import {
  toCalendarDate,
  fromCalendarDate,
  formatDate,
  parseDateString,
  getMonthLabel,
  getMonthNames,
  getDaysInMonth,
  toFaDigits,
  toEnDigits,
  localizeDigits,
  getWeekDayLabels,
  getFirstDayOfWeek,
  getDirection,
  startOfDay,
} from "./calendarUtils";

describe("calendarUtils — shamsi/miladi conversion", () => {
  test("2020-11-10 (Gregorian) is 1399/08/20 (Jalali)", () => {
    const j = toCalendarDate(new Date(2020, 10, 10), "jalali");
    expect(j).toEqual({ year: 1399, month: 8, day: 20 });
    expect(fromCalendarDate(1399, 8, 20, "jalali")).toEqual(
      new Date(2020, 10, 10)
    );
  });

  test("Nowruz anchors (سال تحویل)", () => {
    expect(toCalendarDate(new Date(2023, 2, 21), "jalali")).toEqual({
      year: 1402,
      month: 1,
      day: 1,
    });
    expect(toCalendarDate(new Date(2024, 2, 20), "jalali")).toEqual({
      year: 1403,
      month: 1,
      day: 1,
    });
    expect(toCalendarDate(new Date(2025, 2, 21), "jalali")).toEqual({
      year: 1404,
      month: 1,
      day: 1,
    });
  });

  test("2024-06-01 is 1403/03/12", () => {
    expect(toCalendarDate(new Date(2024, 5, 1), "jalali")).toEqual({
      year: 1403,
      month: 3,
      day: 12,
    });
  });

  test("round-trips the whole day across a wide date range", () => {
    for (let year = 1990; year <= 2050; year += 1) {
      for (let month = 0; month < 12; month += 1) {
        const d = new Date(year, month, 15);
        const j = toCalendarDate(d, "jalali");
        expect(fromCalendarDate(j.year, j.month, j.day, "jalali")).toEqual(
          startOfDay(d)
        );
      }
    }
  });

  test("gregorian months keep native date semantics", () => {
    expect(toCalendarDate(new Date(2024, 1, 29), "gregorian")).toEqual({
      year: 2024,
      month: 2,
      day: 29,
    });
    expect(fromCalendarDate(2024, 2, 29, "gregorian")).toEqual(
      new Date(2024, 1, 29)
    );
    expect(getDaysInMonth(2024, 2, "gregorian")).toBe(29);
    expect(getDaysInMonth(2023, 2, "gregorian")).toBe(28);
  });

  test("jalali month day counts", () => {
    expect(getDaysInMonth(1403, 1, "jalali")).toBe(31);
    expect(getDaysInMonth(1403, 7, "jalali")).toBe(30);
    expect(getDaysInMonth(1403, 12, "jalali")).toBe(30); // ۱۴۰۳ سال کبیسه است
    expect(getDaysInMonth(1402, 12, "jalali")).toBe(29); // ۱۴۰۲ معمولی است
  });
});

describe("calendarUtils — digits & labels", () => {
  test("digit conversion", () => {
    expect(toFaDigits("1403/10/25")).toBe("۱۴۰۳/۱۰/۲۵");
    expect(toEnDigits("۱۴۰۳/۱۰/۲۵")).toBe("1403/10/25");
    expect(localizeDigits(6, "fa")).toBe("۶");
    expect(localizeDigits(6, "en")).toBe("6");
  });

  test("month names per calendar + locale", () => {
    expect(getMonthNames("jalali", "fa")[5]).toBe("شهریور");
    expect(getMonthNames("jalali", "en")[5]).toBe("Shahrivar");
    expect(getMonthNames("gregorian", "fa")[5]).toBe("ژوئن");
    expect(getMonthNames("gregorian", "en")[5]).toBe("June");
  });

  test("month label by name or number", () => {
    expect(getMonthLabel("jalali", "fa", 6, "name")).toBe("شهریور");
    expect(getMonthLabel("jalali", "fa", 6, "number")).toBe("ماه ۶");
    expect(getMonthLabel("gregorian", "fa", 6, "name")).toBe("ژوئن");
    expect(getMonthLabel("gregorian", "en", 6, "name")).toBe("June");
    expect(getMonthLabel("gregorian", "en", 6, "number")).toBe("Month 6");
  });

  test("weekday + direction config", () => {
    expect(getFirstDayOfWeek("fa")).toBe(6);
    expect(getFirstDayOfWeek("en")).toBe(0);
    expect(getDirection("fa")).toBe("rtl");
    expect(getDirection("en")).toBe("ltr");
    expect(getWeekDayLabels("fa").short[6]).toBe("ش"); // شنبه
    expect(getWeekDayLabels("en").short[0]).toBe("Sun");
  });
});

describe("calendarUtils — formatting", () => {
  const d = new Date(2026, 5, 15); // 2026-06-15

  test("gregorian + fa with Persian month name (ژوئن)", () => {
    expect(formatDate(d, "gregorian", "fa", "YYYY/MMMM/DD")).toBe(
      "۲۰۲۶/ژوئن/۱۵"
    );
    expect(formatDate(d, "gregorian", "fa", "YYYY/MM/DD")).toBe("۲۰۲۶/۰۶/۱۵");
  });

  test("gregorian + en", () => {
    expect(formatDate(d, "gregorian", "en", "YYYY/MMMM/DD")).toBe(
      "2026/June/15"
    );
  });

  test("jalali + fa", () => {
    expect(formatDate(new Date(2024, 0, 15), "jalali", "fa")).toBe(
      "۱۴۰۲/۱۰/۲۵"
    );
  });

  test("month number label in format", () => {
    expect(
      formatDate(new Date(2024, 4, 1), "jalali", "fa", "YYYY/MMMM", "number")
    ).toBe("۱۴۰۳/ماه ۲");
  });

  test("null date formats to empty string", () => {
    expect(formatDate(null, "jalali", "fa")).toBe("");
  });
});

describe("calendarUtils — parsing", () => {
  test("parses jalali string values", () => {
    expect(
      parseDateString("1402/10/25", "jalali", "fa", "YYYY/MM/DD")
    ).toEqual(new Date(2024, 0, 15));
    expect(
      parseDateString("۱۴۰۲/۱۰/۲۵", "jalali", "fa", "YYYY/MM/DD")
    ).toEqual(new Date(2024, 0, 15));
    expect(
      parseDateString("1399/8/20", "jalali", "en", "YYYY/M/D")
    ).toEqual(new Date(2020, 10, 10));
  });

  test("parses julian month names in strings", () => {
    expect(
      parseDateString("1402/دی/25", "jalali", "fa", "YYYY/MMMM/DD")
    ).toEqual(new Date(2024, 0, 15));
    expect(
      parseDateString("1402/10/25", "jalali", "fa", "YYYY/MMMM/DD")
    ).toEqual(new Date(2024, 0, 15));
  });

  test("parses gregorian month names (ژوئن / June)", () => {
    expect(
      parseDateString("2026/ژوئن/15", "gregorian", "fa", "YYYY/MMMM/DD")
    ).toEqual(new Date(2026, 5, 15));
    expect(
      parseDateString("2026/June/15", "gregorian", "en", "YYYY/MMMM/DD")
    ).toEqual(new Date(2026, 5, 15));
  });

  test("rejects invalid dates", () => {
    expect(parseDateString("1402/13/01", "jalali", "fa")).toBeNull();
    expect(parseDateString("1402/12/30", "jalali", "fa")).toBeNull(); // ۱۴۰۲ معمولی → اسفند ۲۹ روز
    expect(parseDateString("", "jalali", "fa")).toBeNull();
    expect(parseDateString("garbage", "jalali", "fa")).toBeNull();
  });
});