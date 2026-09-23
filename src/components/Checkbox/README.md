# Checkbox Component

کامپوننت Checkbox یک چک‌باکس قابل تنظیم با برچسب، حالت غیرفعال و نشانگر فیلد اجباری برای فرم‌های React است.

## ویژگی‌ها

- ✅ نمایش برچسب کنار چک‌باکس
- ✅ پشتیبانی از حالت غیرفعال (disabled)
- ✅ نمایش ستاره (`*`) برای فیلدهای اجباری
- ✅ قابلیت افزودن کلاس سفارشی (className)
- ✅ پشتیبانی از attribute های استاندارد input مانند `name` و `id`
- ✅ کاملاً کنترل‌شده (controlled) — وضعیت تیک از طریق prop تعیین می‌شود
- ✅ طراحی مطابق با UI Kit

## نحوه استفاده

```tsx
import { Checkbox } from "@parsaaghayi/sep-panel-ui";

function MyComponent() {
  const [checked, setChecked] = useState(false);

  return (
    <Checkbox
      id="terms"
      label="شرایط را می‌پذیرم"
      checked={checked}
      onChange={setChecked}
    />
  );
}
```

## Props

| Prop       | Type                                  | Default | Description                                        |
| ---------- | ------------------------------------- | ------- | -------------------------------------------------- |
| `label`    | `string`                              | -       | برچسب کنار چک‌باکس                                 |
| `checked`  | `boolean`                             | -       | وضعیت تیک خوردن (اجباری)                          |
| `className`| `string`                              | -       | کلاس CSS اضافی برای کانتینر چک‌باکس                |
| `disabled` | `boolean`                             | -       | غیرفعال کردن چک‌باکس                               |
| `name`     | `string`                              | -       | نام input برای ارسال در فرم                        |
| `id`       | `string`                              | -       | شناسه منحصر به فرد input (اجباری — برای اتصال label) |
| `required` | `boolean`                             | -       | نمایش ستاره (`*`) کنار برچسب                       |
| `onChange` | `React.Dispatch<React.SetStateAction<boolean>>` | - | تابع تغییر وضعیت که مقدار جدید (boolean) را دریافت می‌کند (اجباری) |

## مثال‌های استفاده

### چک‌باکس تیک‌خورده

```tsx
<Checkbox
  id="agreement"
  label="توافق‌نامه خوانده شده"
  checked={true}
  onChange={() => console.log("change")}
/>
```

### فیلد اجباری

```tsx
<Checkbox
  id="terms"
  label="شرایط را می‌پذیرم"
  checked={checked}
  required
  onChange={setChecked}
/>
```

### چک‌باکس غیرفعال

```tsx
<Checkbox
  id="disabled-checkbox"
  label="غیرفعال"
  checked={true}
  disabled
  onChange={() => {}}
/>
```

### تعاملی با useState

```tsx
const [checked, setChecked] = useState(false);

<Checkbox id="interactive" label="کلیک کنید" checked={checked} onChange={setChecked} />;
```

## نکات مهم

1. `onChange` مقدار جدید (برعکس وضعیت فعلی) را به‌صورت boolean دریافت می‌کند؛ می‌توانید مستقیماً `setState` را به آن بدهید
2. prop `id` اجباری است و برای اتصال `label` به input استفاده می‌شود
3. هنگام `disabled` بودن، کلیک روی چک‌باکس `onChange` را فراخوانی نمی‌کند
4. `required` فقط نشانگر ستاره را نمایش می‌دهد و اعتبارسنجی خودکار انجام نمی‌دهد