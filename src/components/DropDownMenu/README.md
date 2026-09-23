# DropDownMenu Component

کامپوننت DropDownMenu یک منوی کشویی کنترل‌شده (controlled) است که محتوای دلخواه را زیر یک دکمه نمایش می‌دهد و از جهت‌های منطقی start/end برای باز شدن پشتیبانی می‌کند.

## ویژگی‌ها

- ✅ کامپوننت کنترل‌شده (isOpen/setIsOpen)
- ✅ باز شدن منو در جهت منطقی start یا end (بر اساس جهت RTL/LTR)
- ✅ انیمیشن باز و بسته شدن منو
- ✅ حالت غیرفعال (disabled)
- ✅ قابلیت قرار دادن هر محتوای دلخواه در بدنه منو (children)
- ✅ طراحی مطابق با UI Kit

## نحوه استفاده

```tsx
import { DropDownMenu } from "@parsaaghayi/sep-panel-ui";

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropDownMenu
      label="منوی کشویی"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      openningDirection="end"
    >
      <ul>
        <li>گزینه اول</li>
        <li>گزینه دوم</li>
        <li>گزینه سوم</li>
      </ul>
    </DropDownMenu>
  );
}
```

## Props

| Prop               | Type                                        | Default | Description                                   |
| ------------------ | ------------------------------------------- | ------- | --------------------------------------------- |
| `label`            | `string`                                    | -       | برچسب دکمه (اجباری)                           |
| `isOpen`           | `boolean`                                   | -       | وضعیت باز بودن منو (اجباری)                   |
| `setIsOpen`        | `React.Dispatch<React.SetStateAction<boolean>>` | -    | setter وضعیت باز بودن منو (اجباری)            |
| `disabled`         | `boolean`                                   | `false` | غیرفعال کردن دکمه                             |
| `openningDirection`| `"start" \| "end"`                          | -       | جهت باز شدن منو (اجباری)                      |
| `children`         | `ReactElement`                              | -       | محتوای منو (اجباری)                           |

## مثال‌های استفاده

### باز شدن به سمت end (در RTL: چپ)

```tsx
<DropDownMenu
  label="title"
  isOpen={isOpen}
  setIsOpen={setIsOpen}
  openningDirection="end"
>
  {menuItems}
</DropDownMenu>
```

### باز شدن به سمت start (در RTL: راست)

```tsx
<DropDownMenu
  label="title"
  isOpen={isOpen}
  setIsOpen={setIsOpen}
  openningDirection="start"
>
  {menuItems}
</DropDownMenu>
```

### غیرفعال

```tsx
<DropDownMenu
  label="title"
  isOpen={false}
  setIsOpen={setIsOpen}
  openningDirection="end"
  disabled
>
  {menuItems}
</DropDownMenu>
```

## نکات مهم

1. `openningDirection` فقط مقادیر منطقی `"start"` و `"end"` را می‌پذیرد (نه right/left). در حالت RTL، `start` یعنی راست و `end` یعنی چپ؛ در حالت LTR برعکس.
2. این کامپوننت کنترل‌شده است؛ وضعیت باز/بسته بودن باید توسط والد با `isOpen` و `setIsOpen` مدیریت شود.
3. `children` باید یک عنصر React واحد باشد (ReactElement).
4. بستن منو با انیمیشن حدود ۲۰۰ میلی‌ثانیه طول می‌کشد و `setIsOpen(false)` پس از آن فراخوانی می‌شود.