# ProgressTracker Component

کامپوننت ProgressTracker برای نمایش مراحل یک فرآیند (مثل ثبت‌نام یا پرداخت) با دایره و خط اتصال و پشتیبانی از جهت RTL و LTR.

## ویژگی‌ها

- ✅ نمایش مراحل با دایره و خط اتصال (track)
- ✅ پشتیبانی از جهت RTL و LTR
- ✅ هایلایت مرحله فعال و مراحل تکمیل‌شده
- ✅ طراحی مطابق با UI Kit

## نحوه استفاده

```tsx
import { ProgressTracker } from "@parsaaghayi/sep-panel-ui";

function MyComponent() {
  return (
    <ProgressTracker
      direction="rtl"
      stepTitles={["ثبت اطلاعات", "پرداخت", "تأیید نهایی", "اتمام"]}
      activeStep={1}
    />
  );
}
```

## Props

| Prop         | Type             | Default | Description                                        |
| ------------ | ---------------- | ------- | -------------------------------------------------- |
| `direction`  | `"ltr" \| "rtl"` | -       | جهت نمایش مراحل (اجباری)                           |
| `stepTitles` | `string[]`       | -       | عنوان‌های مراحل (اجباری)                           |
| `activeStep` | `number`         | `1`     | ایندکس مرحله فعال (صفر-پایه)                       |

## مثال‌های استفاده

### جهت LTR

```tsx
<ProgressTracker
  direction="ltr"
  stepTitles={["Register", "Payment", "Confirm", "Done"]}
  activeStep={0}
/>
```

### مرحله میانی

```tsx
<ProgressTracker
  direction="rtl"
  stepTitles={["ثبت اطلاعات", "پرداخت", "تأیید نهایی", "اتمام"]}
  activeStep={2}
/>
```

## نکات مهم

1. `direction` و `stepTitles` اجباری هستند؛ `activeStep` پیش‌فرض `1` دارد
2. `activeStep` ایندکس صفر-پایه است (مرحله اول = 0)
3. prop `direction` تراز شروع/پایان خط اتصال (track) را به‌صورت منطقی تعیین می‌کند؛ در RTL مراحل از راست و در LTR از چپ شروع می‌شوند
4. مراحل با ایندکس کوچک‌تر یا مساوی `activeStep` به رنگ آبی و بقیه خاکستری نمایش داده می‌شوند