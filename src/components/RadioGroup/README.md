# RadioGroup Component

کامپوننت RadioGroup برای نمایش گروهی از گزینه‌های رادیویی با پشتیبانی از عنوان، حالت اجباری و چیدمان عمودی/افقی.

## ویژگی‌ها

- ✅ پشتیبانی از چیدمان عمودی (column) و افقی (row)
- ✅ نمایش عنوان گروه با ستاره اجباری (*) در صورت نیاز
- ✅ پشتیبانی از گزینه‌های غیرفعال (disabled)
- ✅ مدیریت انتخاب داخلی و فراخوانی onChange
- ✅ طراحی مطابق با UI Kit

## نحوه استفاده

```tsx
import { RadioGroup } from "@parsaaghayi/sep-panel-ui";

function MyComponent() {
  const [value, setValue] = useState("option1");

  return (
    <RadioGroup
      title="روش پرداخت"
      name="payment"
      flexDirection="column"
      selectedOptionValue={value}
      onChange={setValue}
      options={[
        { label: "درگاه پرداخت", value: "option1", id: "radio-1" },
        { label: "کارت به کارت", value: "option2", id: "radio-2" },
      ]}
    />
  );
}
```

## Props

### RadioGroup Props

| Prop                  | Type                              | Default | Description                                        |
| --------------------- | --------------------------------- | ------- | -------------------------------------------------- |
| `title`               | `string`                          | -       | عنوان گروه                                         |
| `options`             | `optionType[]`                    | -       | آرایه گزینه‌ها (اجباری)                            |
| `selectedOptionValue` | `string \| number`                | -       | مقدار اولیه گزینه انتخاب‌شده (اجباری)              |
| `flexDirection`       | `"column" \| "row"`               | -       | جهت چیدمان گزینه‌ها (اجباری)                       |
| `name`                | `string`                          | -       | نام گروه رادیویی (اجباری)                          |
| `required`            | `boolean`                         | `false` | نمایش ستاره اجباری (*) کنار عنوان                   |
| `onChange`            | `(value: string \| number) => void` | -     | تابع تغییر مقدار که مقدار گزینه انتخاب‌شده را برمی‌گرداند (اجباری) |

### optionType

| Prop       | Type               | Default | Description                    |
| ---------- | ------------------ | ------- | ------------------------------ |
| `label`    | `string`           | -       | برچسب گزینه                    |
| `value`    | `string \| number` | -       | مقدار گزینه                    |
| `id`       | `string`           | -       | شناسه منحصر به فرد گزینه       |
| `disabled` | `boolean`          | `false` | غیرفعال بودن گزینه             |

## مثال‌های استفاده

### چیدمان افقی

```tsx
<RadioGroup
  name="size"
  flexDirection="row"
  selectedOptionValue={value}
  onChange={setValue}
  options={[
    { label: "کوچک", value: "sm", id: "size-sm" },
    { label: "متوسط", value: "md", id: "size-md" },
    { label: "بزرگ", value: "lg", id: "size-lg", disabled: true },
  ]}
/>
```

### با عنوان اجباری

```tsx
<RadioGroup
  title="سؤال اجباری"
  required
  name="required-radio"
  flexDirection="column"
  selectedOptionValue={value}
  onChange={setValue}
  options={[
    { label: "بله", value: "yes", id: "req-1" },
    { label: "خیر", value: "no", id: "req-2" },
  ]}
/>
```

## نکات مهم

1. `options`، `selectedOptionValue`، `flexDirection`، `name` و `onChange` اجباری هستند
2. مقدار اولیه انتخاب با `selectedOptionValue` تنظیم می‌شود و پس از آن انتخاب داخلی کامپوننت مدیریت می‌شود
3. هر گزینه باید `id` منحصر به فرد داشته باشد (برای اتصال input به label)
4. گزینه‌های غیرفعال با `disabled: true` در آرایه `options` مشخص می‌شوند
5. `onChange` مقدار گزینه انتخاب‌شده (string یا number) را برمی‌گرداند