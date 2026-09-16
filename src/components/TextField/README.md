# TextField Component

یک کامپوننت TextField پیشرفته و قابل تنظیم با قابلیت‌های فراوان برای استفاده در پروژه‌های React.

## 🚀 قابلیت‌های جدید

### 📝 **Event Handlers**

- `onKeyDown`: مدیریت رویداد فشردن کلید
- `onKeyUp`: مدیریت رویداد رها کردن کلید
- `onKeyPress`: مدیریت رویداد فشار کلید
- `onFocus`: مدیریت رویداد فوکوس
- `onBlur`: مدیریت رویداد از دست دادن فوکوس
- `onPaste`: مدیریت رویداد paste

### 🏷️ **HTML Input Attributes**

- `maxLength`: حداکثر طول ورودی
- `minLength`: حداقل طول ورودی
- `pattern`: الگوی regex برای validation
- `readOnly`: حالت فقط خواندنی
- `required`: فیلد اجباری
- `autoComplete`: تکمیل خودکار
- `autoFocus`: فوکوس خودکار
- `tabIndex`: ترتیب tab

### ✅ **Validation System**

- `validateOnChange`: اعتبارسنجی هنگام تغییر
- `validateOnBlur`: اعتبارسنجی هنگام از دست دادن فوکوس
- `validationRules`: قوانین اعتبارسنجی سفارشی
- `customValidator`: اعتبارسنجی سفارشی

### 🎨 **Advanced Styling**

- `size`: اندازه (sm, md, lg)
- `variant`: نوع نمایش (outlined, filled, standard)
- `color`: رنگ (primary, secondary, error, warning, success)
- `fullWidth`: عرض کامل

### 🎯 **Icon System**

- `startIcon`: آیکون شروع
- `endIcon`: آیکون پایان
- `iconPosition`: موقعیت آیکون (start, end)
- `iconClick`: کلیک روی آیکون

### 🔧 **Input Formatting**

- `formatter`: فرمت کردن ورودی
- `parser`: تجزیه ورودی
- `mask`: ماسک ورودی
- `allowOnlyNumbers`: فقط اعداد
- `allowOnlyLetters`: فقط حروف

### ♿ **Accessibility**

- `aria-label`: برچسب aria
- `aria-describedby`: توضیحات aria
- `role`: نقش عنصر

## 📖 نحوه استفاده

### استفاده پایه

```tsx
import TextField from "./TextField";

const [value, setValue] = useState("");

<TextField
  type="text"
  label="نام کاربری"
  id="username"
  value={value}
  onChange={setValue}
  placeholder="نام کاربری خود را وارد کنید"
/>;
```

### استفاده پیشرفته

```tsx
const [value, setValue] = useState("");
const validationRules = [
  { rule: (val) => val.length >= 3, message: "حداقل ۳ کاراکتر" },
  { rule: (val) => /^[a-zA-Z]+$/.test(val), message: "فقط حروف انگلیسی" },
];

<TextField
  type="text"
  label="نام کامل"
  id="fullname"
  value={value}
  onChange={setValue}
  placeholder="نام کامل خود را وارد کنید"
  required
  maxLength={50}
  minLength={2}
  size="lg"
  variant="outlined"
  color="primary"
  fullWidth
  validateOnChange
  validateOnBlur
  validationRules={validationRules}
  allowOnlyLetters
  startIcon={<span>👤</span>}
  endIcon={<span>✓</span>}
  iconClick={() => console.log("Icon clicked")}
  onFocus={() => console.log("Focused")}
  onBlur={() => console.log("Blurred")}
  aria-label="نام کامل"
/>;
```

### با فرمت کردن ورودی

```tsx
const [phone, setPhone] = useState("");

const formatter = (val) => {
  const cleaned = val.replace(/\D/g, "");
  const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
  if (match) {
    return [match[1], match[2], match[3]].filter(Boolean).join("-");
  }
  return cleaned;
};

<TextField
  type="tel"
  label="شماره تلفن"
  id="phone"
  value={phone}
  onChange={setPhone}
  formatter={formatter}
  allowOnlyNumbers
  startIcon={<span>📞</span>}
/>;
```

## 🎨 انواع نمایش

### اندازه‌ها

- `sm`: کوچک (32px)
- `md`: متوسط (40px) - پیش‌فرض
- `lg`: بزرگ (48px)

### انواع

- `outlined`: با حاشیه
- `filled`: پر شده
- `standard`: استاندارد

### رنگ‌ها

- `primary`: آبی
- `secondary`: بنفش
- `error`: قرمز
- `warning`: زرد
- `success`: سبز

## ✅ Validation

### قوانین اعتبارسنجی

```tsx
const validationRules = [
  {
    rule: (value) => value.length >= 5,
    message: "حداقل ۵ کاراکتر وارد کنید",
  },
  {
    rule: (value) => /^[a-zA-Z0-9]+$/.test(value),
    message: "فقط حروف و اعداد مجاز است",
  },
];
```

### اعتبارسنجی سفارشی

```tsx
const customValidator = (value) => {
  if (value.includes("@")) {
    return "کاراکتر @ مجاز نیست";
  }
  return null; // بدون خطا
};
```

## 🎯 Icons

### آیکون‌های ساده

```tsx
<TextField
  startIcon={<span>🔍</span>}
  endIcon={<span>❌</span>}
  iconClick={() => console.log("Icon clicked")}
/>
```

### آیکون‌های تصویری

```tsx
<TextField firstIconSrc="/icons/search.svg" lastIconSrc="/icons/clear.svg" />
```

## 🔧 Formatting

### فقط اعداد

```tsx
<TextField allowOnlyNumbers formatter={(val) => val.replace(/\D/g, "")} />
```

### فقط حروف

```tsx
<TextField allowOnlyLetters formatter={(val) => val.replace(/[^a-zA-Z\u0600-\u06FF]/g, "")} />
```

### فرمت شماره تلفن

```tsx
const phoneFormatter = (val) => {
  const cleaned = val.replace(/\D/g, "");
  const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
  if (match) {
    return [match[1], match[2], match[3]].filter(Boolean).join("-");
  }
  return cleaned;
};
```

## ♿ Accessibility

### برچسب‌های aria

```tsx
<TextField aria-label="نام کاربری" aria-describedby="username-help" role="textbox" />
```

### توضیحات

```tsx
<div id="username-help">نام کاربری باید حداقل ۳ کاراکتر باشد</div>
<TextField
  aria-describedby="username-help"
/>
```

## 🧪 Testing

### تست پایه

```tsx
import { render, fireEvent, screen } from "@testing-library/react";

test("renders TextField with label", () => {
  render(<TextField type="text" label="Test Label" id="test-id" value="" onChange={() => {}} />);

  expect(screen.getByLabelText("Test Label")).toBeInTheDocument();
});
```

### تست validation

```tsx
test("shows validation error", () => {
  const validationRules = [{ rule: (val) => val.length >= 5, message: "حداقل ۵ کاراکتر" }];

  render(
    <TextField
      type="text"
      id="test-id"
      value=""
      onChange={() => {}}
      validationRules={validationRules}
      validateOnChange
    />,
  );

  const input = screen.getByRole("textbox");
  fireEvent.change(input, { target: { value: "hi" } });

  expect(screen.getByText("حداقل ۵ کاراکتر")).toBeInTheDocument();
});
```

## 📚 Props کامل

| Prop               | Type                                                            | Default      | Description                             |
| ------------------ | --------------------------------------------------------------- | ------------ | --------------------------------------- |
| `type`             | `string`                                                        | -            | نوع input (text, email, password, etc.) |
| `id`               | `string`                                                        | -            | شناسه منحصر به فرد                      |
| `value`            | `string \| number`                                              | -            | مقدار                                   |
| `onChange`         | `function`                                                      | -            | تابع تغییر مقدار                        |
| `label`            | `string`                                                        | -            | برچسب                                   |
| `placeholder`      | `string`                                                        | -            | متن راهنما                              |
| `direction`        | `"rtl" \| "ltr"`                                                | -            | جهت متن                                 |
| `size`             | `"sm" \| "md" \| "lg"`                                          | `"md"`       | اندازه                                  |
| `variant`          | `"outlined" \| "filled" \| "standard"`                          | `"outlined"` | نوع نمایش                               |
| `color`            | `"primary" \| "secondary" \| "error" \| "warning" \| "success"` | `"primary"`  | رنگ                                     |
| `fullWidth`        | `boolean`                                                       | `false`      | عرض کامل                                |
| `disabled`         | `boolean`                                                       | `false`      | غیرفعال                                 |
| `readOnly`         | `boolean`                                                       | `false`      | فقط خواندنی                             |
| `required`         | `boolean`                                                       | `false`      | اجباری                                  |
| `maxLength`        | `number`                                                        | -            | حداکثر طول                              |
| `minLength`        | `number`                                                        | -            | حداقل طول                               |
| `pattern`          | `string`                                                        | -            | الگوی regex                             |
| `autoComplete`     | `string`                                                        | -            | تکمیل خودکار                            |
| `autoFocus`        | `boolean`                                                       | `false`      | فوکوس خودکار                            |
| `validateOnChange` | `boolean`                                                       | `true`       | اعتبارسنجی هنگام تغییر                  |
| `validateOnBlur`   | `boolean`                                                       | `true`       | اعتبارسنجی هنگام blur                   |
| `validationRules`  | `ValidationRule[]`                                              | -            | قوانین اعتبارسنجی                       |
| `customValidator`  | `function`                                                      | -            | اعتبارسنجی سفارشی                       |
| `allowOnlyNumbers` | `boolean`                                                       | `false`      | فقط اعداد                               |
| `allowOnlyLetters` | `boolean`                                                       | `false`      | فقط حروف                                |
| `formatter`        | `function`                                                      | -            | فرمت کردن                               |
| `parser`           | `function`                                                      | -            | تجزیه کردن                              |
| `startIcon`        | `ReactNode`                                                     | -            | آیکون شروع                              |
| `endIcon`          | `ReactNode`                                                     | -            | آیکون پایان                             |
| `iconClick`        | `function`                                                      | -            | کلیک آیکون                              |
| `onFocus`          | `function`                                                      | -            | رویداد فوکوس                            |
| `onBlur`           | `function`                                                      | -            | رویداد blur                             |
| `onKeyDown`        | `function`                                                      | -            | رویداد keyDown                          |
| `onKeyUp`          | `function`                                                      | -            | رویداد keyUp                            |
| `onPaste`          | `function`                                                      | -            | رویداد paste                            |
| `aria-label`       | `string`                                                        | -            | برچسب aria                              |
| `aria-describedby` | `string`                                                        | -            | توضیحات aria                            |
| `role`             | `string`                                                        | -            | نقش عنصر                                |

## 🎨 CSS Classes

### کلاس‌های اصلی

- `.textField-container`: کانتینر اصلی
- `.textField-label`: برچسب
- `.textField-input`: کانتینر input
- `.textField-inputElement`: عنصر input
- `.textField-icon`: آیکون‌ها
- `.textField-message`: پیام‌ها

### کلاس‌های وضعیت

- `.errorMessage`: حالت خطا
- `.disabled`: غیرفعال
- `.focused`: فوکوس شده
- `.readOnly`: فقط خواندنی

### کلاس‌های اندازه

- `.textField-sm`: کوچک
- `.textField-md`: متوسط
- `.textField-lg`: بزرگ

### کلاس‌های نوع

- `.textField-outlined`: با حاشیه
- `.textField-filled`: پر شده
- `.textField-standard`: استاندارد

### کلاس‌های رنگ

- `.textField-primary`: آبی
- `.textField-secondary`: بنفش
- `.textField-error`: قرمز
- `.textField-warning`: زرد
- `.textField-success`: سبز
