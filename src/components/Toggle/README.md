# Toggle Component

کامپوننت Toggle یک سوییچ روشن/خاموش ساده و سبک برای نمایش و تغییر وضعیت‌های باینری (فعال/غیرفعال) در پروژه‌های React است.

## ویژگی‌ها

- ✅ نمایش وضعیت روشن (active) و خاموش (not-active) با آیکون‌های تیک و ضربدر
- ✅ پشتیبانی از حالت غیرفعال (disabled)
- ✅ طراحی مطابق با UI Kit
- ✅ بدون نیاز به state داخلی — کاملاً کنترل‌شده (controlled)

## نحوه استفاده

```tsx
import { Toggle } from "@parsaaghayi/sep-panel-ui";

function MyComponent() {
  const [status, setStatus] = useState(false);

  return (
    <Toggle
      status={status}
      onChange={() => setStatus((prev) => !prev)}
    />
  );
}
```

## Props

| Prop       | Type       | Default | Description                          |
| ---------- | ---------- | ------- | ------------------------------------ |
| `status`   | `boolean`  | -       | وضعیت روشن/خاموش سوییچ (اجباری)     |
| `disabled` | `boolean`  | `false` | غیرفعال کردن سوییچ                   |
| `onChange` | `() => void` | -     | تابع فراخوانی هنگام کلیک (اجباری)   |

## مثال‌های استفاده

### سوییچ روشن

```tsx
<Toggle status={true} onChange={() => console.log("toggle")} />
```

### سوییچ خاموش و غیرفعال

```tsx
<Toggle status={false} disabled onChange={() => {}} />
```

### تعاملی با useState

```tsx
const [status, setStatus] = useState(false);

<Toggle status={status} onChange={() => setStatus((prev) => !prev)} />;
```

## نکات مهم

1. کامپوننت کاملاً کنترل‌شده است؛ وضعیت نمایش فقط از طریق prop `status` تعیین می‌شود
2. هنگام `disabled` بودن، کلیک روی سوییچ `onChange` را فراخوانی نمی‌کند
3. `onChange` هیچ آرگومانی دریافت نمی‌کند؛ مقدار جدید را باید خودتان در state مدیریت کنید