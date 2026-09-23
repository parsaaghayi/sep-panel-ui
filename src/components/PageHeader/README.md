# PageHeader Component

کامپوننت PageHeader برای نمایش سربرگ صفحات شامل مسیر راهنما (Breadcrumb)، عنوان، دکمه‌های عملیات و ناحیه فیلترها.

## ویژگی‌ها

- ✅ نمایش خودکار Breadcrumb از روی `breadcrumbTitles`
- ✅ نمایش عنوان صفحه
- ✅ پشتیبانی از آرایه‌ای از دکمه‌ها (ReactElement[])
- ✅ رندر `children` به‌عنوان ناحیه فیلترها
- ✅ طراحی مطابق با UI Kit

## نحوه استفاده

```tsx
import { PageHeader, Button } from "@parsaaghayi/sep-panel-ui";

function MyComponent() {
  return (
    <PageHeader
      breadcrumbTitles={["خانه", "گزارش‌ها", "گزارش فروش"]}
      title="گزارش فروش"
      buttons={[
        <Button key="add" colorType="primary" label="افزودن" />,
        <Button key="export" label="خروجی اکسل" />,
      ]}
    >
      <input type="text" placeholder="فیلتر جستجو" />
    </PageHeader>
  );
}
```

## Props

| Prop               | Type                         | Default | Description                                                          |
| ------------------ | ---------------------------- | ------- | -------------------------------------------------------------------- |
| `breadcrumbTitles` | `(string \| ReactElement)[]` | -       | عنوان‌های مسیر راهنما که به Breadcrumb داده می‌شود (اجباری)          |
| `title`            | `string`                     | -       | عنوان صفحه (اجباری)                                                  |
| `buttons`          | `ReactElement[]`             | -       | آرایه‌ای از دکمه‌ها که در سمت مقابل عنوان نمایش داده می‌شوند          |
| `children`         | `ReactNode`                  | -       | محتوای ناحیه فیلترها که زیر عنوان و دکمه‌ها رندر می‌شود              |

## مثال‌های استفاده

### بدون دکمه

```tsx
<PageHeader breadcrumbTitles={["خانه", "تنظیمات"]} title="تنظیمات حساب" />
```

### با چند دکمه و فیلتر

```tsx
<PageHeader
  breadcrumbTitles={["مدیریت", "کاربران"]}
  title="کاربران"
  buttons={[
    <Button key="1" colorType="primary" label="کاربر جدید" />,
    <Button key="2" colorType="danger" label="غیرفعال‌سازی" />,
  ]}
>
  <div style={{ display: "flex", gap: "8px" }}>
    <input type="text" placeholder="جستجوی نام" />
    <Button label="فیلتر پیشرفته" colorType="secondary" />
  </div>
</PageHeader>
```

## نکات مهم

1. `breadcrumbTitles` و `title` اجباری هستند
2. `children` به‌عنوان ناحیه فیلترها (زیر عنوان و دکمه‌ها) رندر می‌شود
3. `buttons` یک آرایه از ReactElement است؛ به هر دکمه یک `key` یکتا بدهید
4. هر دکمه داخل یک div جداگانه رندر می‌شود