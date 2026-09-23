# Breadcrumb Component

کامپوننت Breadcrumb برای نمایش مسیر صفحات (مسیر راهنما) با جداکننده «/» و پشتیبانی از آیتم‌های متنی و لینکی.

## ویژگی‌ها

- ✅ نمایش مسیر با جداکننده «/»
- ✅ پشتیبانی از آیتم‌های متنی (string) و ReactElement (لینک و ...)
- ✅ پشتیبانی از className سفارشی
- ✅ طراحی مطابق با UI Kit

## نحوه استفاده

```tsx
import { Breadcrumb } from "@parsaaghayi/sep-panel-ui";

function MyComponent() {
  return <Breadcrumb titles={["خانه", "محصولات", "دسته‌بندی"]} />;
}
```

## Props

| Prop        | Type                         | Default | Description                                    |
| ----------- | ---------------------------- | ------- | ---------------------------------------------- |
| `titles`    | `(string \| ReactElement)[]` | -       | آرایه عنوان‌های مسیر (اجباری)                  |
| `className` | `string`                     | -       | کلاس سفارشی اضافه‌شده به کانتینر               |

## مثال‌های استفاده

### با آیتم‌های لینکی

```tsx
<Breadcrumb
  titles={[
    "خانه",
    <a href="/products" key="products">محصولات</a>,
    <a href="/products/phones" key="phones">موبایل</a>,
  ]}
/>
```

### با یک آیتم

```tsx
<Breadcrumb titles={["صفحه اصلی"]} />
```

### با کلاس سفارشی

```tsx
<Breadcrumb titles={["خانه", "تنظیمات"]} className="my-custom-class" />
```

## نکات مهم

1. `titles` تنها prop اجباری است
2. جداکننده «/» بین همه آیتم‌ها به‌جز آخرین آیتم نمایش داده می‌شود
3. برای آیتم‌های لینکی می‌توانید از ReactElement (مثل `<a>`) استفاده کنید
4. `className` به کانتینر اصلی اضافه می‌شود