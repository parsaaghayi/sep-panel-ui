# SelectInput Component

کامپوننت SelectInput برای انتخاب یک گزینه از میان لیست گزینه‌ها با پشتیبانی کامل از صفحه‌کلید، جهت RTL/LTR و موقعیت‌های مختلف منوی کشویی.

## ویژگی‌ها

- ✅ پشتیبانی از RTL و LTR (موقعیت‌های start/end به صورت منطقی و بر اساس جهت پیاده شده‌اند)
- ✅ موقعیت‌های مختلف منو: auto، bottom، top و ترکیب آن‌ها با start/end
- ✅ پشتیبانی کامل از صفحه‌کلید (Enter، Space، ArrowUp/ArrowDown، Home، End، Escape)
- ✅ بستن منو با کلیک بیرون از کامپوننت
- ✅ حالت غیرفعال (disabled)
- ✅ نمایش ستاره برای فیلد اجباری (required)
- ✅ پشتیبانی از آیکون ورودی (iconSrc)
- ✅ قابلیت‌های accessibility (role="combobox" / listbox / option)

## نحوه استفاده

```tsx
import { SelectInput } from "@parsaaghayi/sep-panel-ui";

function MyComponent() {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <SelectInput
      label="انتخاب"
      placeHolder="یک گزینه را انتخاب کنید"
      menuItems={[
        { label: "گزینه ۱", value: 1 },
        { label: "گزینه ۲", value: 2 },
        { label: "گزینه ۳", value: 3 },
      ]}
      selectedOption={selectedOption}
      setSelectedOption={setSelectedOption}
      onChange={(option) => console.log("select", option)}
    />
  );
}
```

## Props

| Prop               | Type                                                                                   | Default      | Description                                                                 |
| ------------------ | -------------------------------------------------------------------------------------- | ------------ | --------------------------------------------------------------------------- |
| `label`            | `string`                                                                               | -            | برچسب فیلد                                                                  |
| `iconSrc`          | `string`                                                                               | -            | مسیر آیکون نمایش داده شده در ابتدای ورودی                                   |
| `placeHolder`      | `string`                                                                               | -            | متن راهنما؛ همچنین به عنوان اولین آیتم منو (پاک کردن انتخاب) نمایش داده می‌شود |
| `className`        | `string`                                                                               | -            | کلاس سفارشی برای کانتینر                                                    |
| `required`         | `boolean`                                                                              | `false`      | نمایش ستاره کنار برچسب برای فیلد اجباری                                     |
| `menuItems`        | `{ label: string; value: string \| number }[]`                                         | -            | لیست گزینه‌ها (اجباری)                                                      |
| `disabled`         | `boolean`                                                                              | `false`      | غیرفعال کردن کامپوننت                                                       |
| `selectedOption`   | `{ label: string; value: string \| number } \| null`                                   | -            | گزینه انتخاب‌شده (اجباری)                                                   |
| `setSelectedOption`| `React.Dispatch<React.SetStateAction<{ label: string; value: string \| number } \| null>>` | -            | setter وضعیت گزینه انتخاب‌شده (اجباری)                                      |
| `onChange`         | `(option: { label: string; value: string \| number } \| null) => void`                 | -            | تابعی که هنگام انتخاب یا پاک کردن گزینه فراخوانی می‌شود (اجباری)            |
| `dropdownPosition` | `"auto" \| "bottom" \| "bottom-start" \| "bottom-end" \| "top" \| "top-start" \| "top-end"` | `"bottom"`   | موقعیت باز شدن منوی کشویی                                                   |

## مثال‌های استفاده

### فارسی با موقعیت پیش‌فرض

```tsx
<SelectInput
  label="دسته‌بندی"
  required
  placeHolder="انتخاب دسته‌بندی"
  menuItems={menuItems}
  selectedOption={selectedOption}
  setSelectedOption={setSelectedOption}
  onChange={(option) => console.log("select", option)}
/>
```

### منوی باز شونده به سمت بالا

```tsx
<SelectInput
  label="بالای فیلد (top-start)"
  dropdownPosition="top-start"
  placeHolder="مکان منو"
  menuItems={menuItems}
  selectedOption={selectedOption}
  setSelectedOption={setSelectedOption}
  onChange={(option) => console.log("select", option)}
/>
```

### غیرفعال و بدون برچسب

```tsx
<SelectInput
  disabled
  placeHolder="غیرقابل انتخاب"
  menuItems={menuItems}
  selectedOption={selectedOption}
  setSelectedOption={setSelectedOption}
  onChange={(option) => console.log("select", option)}
/>
```

## نکات مهم

1. `dropdownPosition` با مقدار `"auto"` بر اساس فضای خالی بالای ورودی، موقعیت `bottom` یا `top` را به صورت خودکار انتخاب می‌کند.
2. مقادیر `start` و `end` منطقی هستند: در حالت RTL، `start` یعنی راست و `end` یعنی چپ؛ در حالت LTR برعکس.
3. منوی کشویی با `calc(100% + 4px)` به ورودی چسبیده است و چه برچسب داشته باشد چه نداشته باشد، دقیقاً زیر ورودی باز می‌شود.
4. اولین آیتم منو همیشه `placeHolder` است و با کلیک روی آن، انتخاب پاک می‌شود (`onChange(null)`).
5. `onChange` و `setSelectedOption` هر دو باید ست شوند؛ `onChange` برای اطلاع‌رسانی به والد و `setSelectedOption` برای مدیریت state داخلی.