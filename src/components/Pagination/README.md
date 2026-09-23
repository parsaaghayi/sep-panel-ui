# Pagination Component

کامپوننت Pagination برای نمایش صفحه‌بندی با پشتیبانی از جهت RTL و LTR، نمایش بیضی (...) برای تعداد صفحات زیاد و قابلیت رفتن مستقیم به صفحه دلخواه.

## ویژگی‌ها

- ✅ پشتیبانی از RTL و LTR (prop اجباری direction)
- ✅ نمایش هوشمند شماره صفحات با بیضی (...) برای تعداد صفحات زیاد
- ✅ دکمه‌های قبلی/بعدی با غیرفعال شدن خودکار در ابتدا و انتها
- ✅ فیلد «رفتن به صفحه» برای پرش مستقیم
- ✅ حالت فقط نمایشی (بدون setPageNumber)
- ✅ طراحی مطابق با UI Kit

## نحوه استفاده

```tsx
import { Pagination } from "@parsaaghayi/sep-panel-ui";

function MyComponent() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <Pagination
      currentPage={currentPage}
      totalPage={20}
      setPageNumber={setCurrentPage}
      direction="rtl"
    />
  );
}
```

## Props

| Prop            | Type                       | Default | Description                                                       |
| --------------- | -------------------------- | ------- | ----------------------------------------------------------------- |
| `currentPage`   | `number`                   | -       | شماره صفحه فعلی (اجباری)                                          |
| `totalPage`     | `number`                   | -       | تعداد کل صفحات (اجباری)                                           |
| `className`     | `string`                   | -       | کلاس سفارشی                                                       |
| `setPageNumber` | `(pageNumber: number) => void` | -    | تابع تغییر شماره صفحه؛ اگر ست نشود، کامپوننت فقط نمایشی است       |
| `direction`     | `"rtl" \| "ltr"`           | -       | جهت نمایش (اجباری)                                                |

## مثال‌های استفاده

### فارسی (RTL)

```tsx
<Pagination
  currentPage={currentPage}
  totalPage={10}
  setPageNumber={setCurrentPage}
  direction="rtl"
/>
```

### انگلیسی (LTR)

```tsx
<Pagination
  currentPage={currentPage}
  totalPage={8}
  setPageNumber={setCurrentPage}
  direction="ltr"
/>
```

### تک صفحه

```tsx
<Pagination
  currentPage={1}
  totalPage={1}
  setPageNumber={setCurrentPage}
  direction="rtl"
/>
```

## نکات مهم

1. prop `direction` اجباری است و فقط مقادیر `"rtl"` و `"ltr"` را می‌پذیرد؛ جهت فلش‌های قبلی/بعدی بر اساس آن به صورت خودکار جابه‌جا می‌شود.
2. اگر `setPageNumber` ست نشود، کلیک روی شماره‌ها و دکمه‌ها هیچ اثری ندارد (حالت فقط نمایشی).
3. `setPageNumber` فقط در بازه ۱ تا `totalPage` فراخوانی می‌شود و اگر صفحه فعلی همان مقدار باشد، فراخوانی نمی‌شود.
4. اگر `currentPage` برابر ۰ یا کمتر باشد، کامپوننت چیزی رندر نمی‌کند.
5. برای رفتن به صفحه دلخواه می‌توانید شماره را در فیلد انتهای کامپوننت وارد کرده و Enter بزنید یا روی دکمه «برو» کلیک کنید.