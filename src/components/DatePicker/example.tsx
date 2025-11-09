import React, { useState } from 'react';
import DatePicker from './DatePicker';

// مثال استفاده از DatePicker
const DatePickerExample: React.FC = () => {
  const [persianDate, setPersianDate] = useState<Date | null>(null);
  const [englishDate, setEnglishDate] = useState<Date | null>(null);

  return (
    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <h2>DatePicker Examples</h2>
      
      {/* DatePicker فارسی */}
      <div>
        <h3>DatePicker فارسی (RTL)</h3>
        <DatePicker
          id="persian-datepicker"
          label="تاریخ شروع"
          placeholder="تاریخ را انتخاب کنید"
          value={persianDate}
          onChange={setPersianDate}
          locale="fa"
          direction="rtl"
          size="md"
          variant="outlined"
          color="primary"
        />
        {persianDate && (
          <p>تاریخ انتخاب شده: {persianDate.toLocaleDateString('fa-IR')}</p>
        )}
      </div>

      {/* DatePicker انگلیسی */}
      <div>
        <h3>DatePicker انگلیسی (LTR)</h3>
        <DatePicker
          id="english-datepicker"
          label="Start Date"
          placeholder="Select date"
          value={englishDate}
          onChange={setEnglishDate}
          locale="en"
          direction="ltr"
          size="md"
          variant="outlined"
          color="primary"
        />
        {englishDate && (
          <p>Selected date: {englishDate.toLocaleDateString('en-US')}</p>
        )}
      </div>

      {/* DatePicker با آیکون */}
      <div>
        <h3>DatePicker با آیکون</h3>
        <DatePicker
          id="datepicker-with-icon"
          label="تاریخ با آیکون"
          placeholder="تاریخ را انتخاب کنید"
          value={persianDate}
          onChange={setPersianDate}
          locale="fa"
          direction="rtl"
          firstIconSrc="/src/images/search.svg"
          lastIconSrc="/src/images/arrow-bottom.svg"
        />
      </div>

      {/* DatePicker با محدودیت */}
      <div>
        <h3>DatePicker با محدودیت تاریخ</h3>
        <DatePicker
          id="restricted-datepicker"
          label="تاریخ محدود"
          placeholder="تاریخ را انتخاب کنید"
          value={persianDate}
          onChange={setPersianDate}
          locale="fa"
          direction="rtl"
          minDate={new Date(2024, 0, 1)}
          maxDate={new Date(2024, 11, 31)}
        />
      </div>

      {/* DatePicker با پیام خطا */}
      <div>
        <h3>DatePicker با پیام خطا</h3>
        <DatePicker
          id="error-datepicker"
          label="تاریخ با خطا"
          placeholder="تاریخ را انتخاب کنید"
          value={persianDate}
          onChange={setPersianDate}
          locale="fa"
          direction="rtl"
          errorMessage="تاریخ معتبر انتخاب کنید"
        />
      </div>
    </div>
  );
};

export default DatePickerExample;

