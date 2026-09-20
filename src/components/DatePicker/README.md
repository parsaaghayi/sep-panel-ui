# DatePicker Component

کامپوننت DatePicker برای انتخاب تاریخ با پشتیبانی از تقویم شمسی (Jalali) و میلادی (Gregorian).

## ویژگی‌ها

- ✅ پشتیبانی از تقویم شمسی (Jalali) و میلادی (Gregorian)
- ✅ پشتیبانی از RTL و LTR
- ✅ قابلیت تنظیم آیکون (firstIcon/lastIcon)
- ✅ پشتیبانی از محدودیت‌های تاریخ (minDate/maxDate)
- ✅ طراحی مطابق با UI Kit
- ✅ پشتیبانی از پیام‌های راهنما، موفقیت و خطا
- ✅ قابلیت‌های accessibility

## نحوه استفاده

```tsx
import { DatePicker } from "@parsaaghayi/sep-panel-ui";

function MyComponent() {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <DatePicker
      id="start-date"
      label="تاریخ شروع"
      placeholder="تاریخ را انتخاب کنید"
      value={date}
      onChange={setDate}
      locale="fa"
      direction="rtl"
      firstIconSrc="/path/to/calendar-icon.svg"
    />
  );
}
```

## Props

### Basic Props

- `id`: شناسه منحصر به فرد (اجباری)
- `label`: برچسب فیلد
- `placeholder`: متن راهنما
- `value`: مقدار تاریخ انتخاب شده
- `onChange`: تابع تغییر مقدار

### Icon Props

- `firstIconSrc`: مسیر آیکون اول
- `lastIconSrc`: مسیر آیکون آخر
- `startIcon`: کامپوننت آیکون اول
- `endIcon`: کامپوننت آیکون آخر
- `iconPosition`: موقعیت آیکون ("start" | "end")

### Locale Props

- `locale`: زبان ("fa" | "en") - پیش‌فرض: "fa"
- `direction`: جهت ("rtl" | "ltr") - پیش‌فرض: بر اساس locale

### Date Props

- `minDate`: حداقل تاریخ قابل انتخاب
- `maxDate`: حداکثر تاریخ قابل انتخاب
- `format`: فرمت نمایش تاریخ - پیش‌فرض: "YYYY/MM/DD"
- `output`: نوع خروجی onChange ("date" | "string") - پیش‌فرض: "date"
- `outputFormat`: فرمت رشته خروجی وقتی `output="string"` - پیش‌فرض: "YYYY/MM/DD"
- `outputCalendar`: تقویم خروجی (پیش‌فرض: تقویم نمایش)
- `outputLocale`: زبان ارقام خروجی ("fa" | "en") - برای «نمایش فارسی + خروجی لاتین» این را "en" بدهید (پیش‌فرض: `locale`)

### Styling Props

- `size`: اندازه ("sm" | "md" | "lg") - پیش‌فرض: "md"
- `variant`: نوع ("outlined" | "filled" | "standard") - پیش‌فرض: "outlined"
- `color`: رنگ ("primary" | "secondary" | "error" | "warning" | "success") - پیش‌فرض: "primary"
- `fullWidth`: عرض کامل

### State Props

- `disabled`: غیرفعال
- `readOnly`: فقط خواندنی
- `required`: اجباری

### Message Props

- `guidMessage`: پیام راهنما
- `successMessage`: پیام موفقیت
- `errorMessage`: پیام خطا

## مثال‌های استفاده

### DatePicker فارسی

```tsx
<DatePicker
  id="persian-date"
  label="تاریخ شروع"
  locale="fa"
  direction="rtl"
  value={date}
  onChange={setDate}
  firstIconSrc="/calendar-icon.svg"
/>
```

### DatePicker انگلیسی

```tsx
<DatePicker
  id="english-date"
  label="Start Date"
  locale="en"
  direction="ltr"
  value={date}
  onChange={setDate}
/>
```

### با محدودیت تاریخ

```tsx
<DatePicker
  id="restricted-date"
  label="تاریخ"
  minDate={new Date(2024, 0, 1)}
  maxDate={new Date(2024, 11, 31)}
  value={date}
  onChange={setDate}
/>
```

### با پیام‌های مختلف

```tsx
<DatePicker
  id="date-with-messages"
  label="تاریخ"
  value={date}
  onChange={setDate}
  errorMessage="تاریخ معتبر انتخاب کنید"
  successMessage="تاریخ با موفقیت انتخاب شد"
  guidMessage="لطفاً تاریخ معتبر انتخاب کنید"
/>
```

### نمایش فارسی اما خروجی لاتین

برای اینکه در فیلد ارقام فارسی (۱۴۰۵/۰۶/۱۵) دیده شود اما مقدار خروجی با ارقام لاتین (1405-06-15) برگردد، به‌جای `locale` از `outputLocale` استفاده کنید:

```tsx
<DatePicker
  id="fa-display-latin-out"
  label="تاریخ"
  calendar="jalali"
  locale="fa"
  direction="rtl"
  format="YYYY/MM/DD"
  output="string"
  outputFormat="YYYY-MM-DD"
  outputLocale="en"
  value={value}
  onChange={(v) => console.log(v)} // "1405-06-15"
/>
```

نکته: وقتی `value` برابر null/undefined باشد، `onChange` هنگام mount فراخوانی نمی‌شود و فیلد خالی باقی می‌ماند (مقدار پیش‌فرض خودکار تنظیم نمی‌شود).

## نکات مهم

1. برای استفاده از تقویم شمسی، `locale` را روی "fa" تنظیم کنید
2. برای RTL، `direction` را روی "rtl" تنظیم کنید
3. آیکون‌ها باید در مسیر صحیح قرار گیرند
4. تاریخ‌ها به صورت خودکار بین شمسی و میلادی تبدیل می‌شوند
