import React, { useState, useEffect, useRef } from "react";
import { CalendarProps, JalaliDate } from "./types";
import { 
  gregorianToJalali, 
  jalaliToGregorian, 
  formatJalaliDate, 
  toPersianNumbers,
  isValidJalaliDate,
  getDaysInJalaliMonth,
  getJalaliWeekDay
} from "./jalaliUtils";
import { localeConfigs } from "./localeConfig";
import "./style.css";

const Calendar: React.FC<CalendarProps> = ({
  selectedDate,
  onDateSelect,
  onClose,
  locale = "fa",
  direction = "rtl",
  minDate,
  maxDate
}) => {
  const [currentDate, setCurrentDate] = useState<JalaliDate>(() => {
    if (selectedDate) {
      const jalali = gregorianToJalali(
        selectedDate.getFullYear(),
        selectedDate.getMonth() + 1,
        selectedDate.getDate()
      );
      return jalali;
    }
    const now = new Date();
    return gregorianToJalali(now.getFullYear(), now.getMonth() + 1, now.getDate());
  });

  const calendarRef = useRef<HTMLDivElement>(null);
  const config = localeConfigs[locale];

  // بستن تقویم با کلیک خارج از آن
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  // تغییر ماه
  const changeMonth = (increment: number) => {
    setCurrentDate(prev => {
      let newMonth = prev.month + increment;
      let newYear = prev.year;

      if (newMonth > 12) {
        newMonth = 1;
        newYear++;
      } else if (newMonth < 1) {
        newMonth = 12;
        newYear--;
      }

      return { year: newYear, month: newMonth, day: 1 };
    });
  };

  // انتخاب تاریخ
  const handleDateClick = (day: number) => {
    if (isValidJalaliDate(currentDate.year, currentDate.month, day)) {
      const selectedJalaliDate = { year: currentDate.year, month: currentDate.month, day };
      const gregorianDate = jalaliToGregorian(selectedJalaliDate.year, selectedJalaliDate.month, selectedJalaliDate.day);
      
      // بررسی محدودیت‌های تاریخ
      if (minDate && gregorianDate < minDate) return;
      if (maxDate && gregorianDate > maxDate) return;
      
      onDateSelect(gregorianDate);
      onClose();
    }
  };

  // تولید روزهای ماه
  const generateDays = () => {
    const daysInMonth = getDaysInJalaliMonth(currentDate.year, currentDate.month);
    const firstDayOfMonth = getJalaliWeekDay(currentDate.year, currentDate.month, 1);
    const days = [];

    // روزهای ماه قبل
    const prevMonth = currentDate.month === 1 ? 12 : currentDate.month - 1;
    const prevYear = currentDate.month === 1 ? currentDate.year - 1 : currentDate.year;
    const daysInPrevMonth = getDaysInJalaliMonth(prevYear, prevMonth);
    
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i;
      days.push(
        <div
          key={`prev-${day}`}
          className="datePicker-calendar-day datePicker-calendar-day-otherMonth"
        >
          {locale === "fa" ? toPersianNumbers(day.toString()) : day.toString()}
        </div>
      );
    }

    // روزهای ماه جاری
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = selectedDate && 
        gregorianToJalali(selectedDate.getFullYear(), selectedDate.getMonth() + 1, selectedDate.getDate()).day === day &&
        gregorianToJalali(selectedDate.getFullYear(), selectedDate.getMonth() + 1, selectedDate.getDate()).month === currentDate.month &&
        gregorianToJalali(selectedDate.getFullYear(), selectedDate.getMonth() + 1, selectedDate.getDate()).year === currentDate.year;
      
      const isToday = day === currentDate.day && 
        gregorianToJalali(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()).month === currentDate.month &&
        gregorianToJalali(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()).year === currentDate.year;

      const gregorianDate = jalaliToGregorian(currentDate.year, currentDate.month, day);
      const isDisabled = (minDate && gregorianDate < minDate) || (maxDate && gregorianDate > maxDate);

      days.push(
        <div
          key={day}
          className={`datePicker-calendar-day ${isSelected ? "datePicker-calendar-day-selected" : ""} ${isToday ? "datePicker-calendar-day-today" : ""} ${isDisabled ? "datePicker-calendar-day-disabled" : ""}`}
          onClick={() => !isDisabled && handleDateClick(day)}
        >
          {locale === "fa" ? toPersianNumbers(day.toString()) : day.toString()}
        </div>
      );
    }

    // روزهای ماه بعد
    const nextMonth = currentDate.month === 12 ? 1 : currentDate.month + 1;
    const nextYear = currentDate.month === 12 ? currentDate.year + 1 : currentDate.year;
    const remainingDays = 42 - days.length; // 6 rows × 7 days = 42
    
    for (let day = 1; day <= remainingDays; day++) {
      days.push(
        <div
          key={`next-${day}`}
          className="datePicker-calendar-day datePicker-calendar-day-otherMonth"
        >
          {locale === "fa" ? toPersianNumbers(day.toString()) : day.toString()}
        </div>
      );
    }

    return days;
  };

  return (
    <div 
      ref={calendarRef}
      className={`datePicker-calendar ${direction === "rtl" ? "datePicker-calendar-rtl" : "datePicker-calendar-ltr"}`}
      style={{ direction }}
    >
      {/* Header */}
      <div className="datePicker-calendar-header">
        <button
          className="datePicker-calendar-navButton"
          onClick={() => changeMonth(-1)}
          type="button"
        >
          {direction === "rtl" ? ">" : "<"}
        </button>
        
        <div className="datePicker-calendar-monthYear">
          {config.months[currentDate.month - 1]} {locale === "fa" ? toPersianNumbers(currentDate.year.toString()) : currentDate.year}
        </div>
        
        <button
          className="datePicker-calendar-navButton"
          onClick={() => changeMonth(1)}
          type="button"
        >
          {direction === "rtl" ? "<" : ">"}
        </button>
      </div>

      {/* Days of week */}
      <div className="datePicker-calendar-weekdays">
        {config.weekDaysShort.map((day, index) => (
          <div key={index} className="datePicker-calendar-weekday">
            {day}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <div className="datePicker-calendar-days">
        {generateDays()}
      </div>
    </div>
  );
};

export default Calendar;

