
# Breadcrumb

## معرفی

کامپوننت `Breadcrumb` برای نمایش نوار راهنمای مسیر یا مسیریاب در صفحات وب طراحی شده است. این کامپوننت به شما امکان می‌دهد تا لیستی از عناوین یا عناصر React را به عنوان ورودی دریافت کرده و آن‌ها را به صورت یک مسیر نمایش دهید.

## استفاده

```jsx
import { Breadcrumb } from "@parsaaghayi/sep-panel-ui";

<Breadcrumb
  titles={["Home", <a href="/products">Products</a>, "Details"]}
  className="custom-class"
/>;
```

## پراپرتی‌ها

| نام         | نوع        | توضیحات                                                            |
| ----------- | ---------- | ------------------------------------------------------------------ |
| `titles`    | `string[]` | ReactElement[]                                                     |
| `className` | `string`   | (اختیاری) کلاس‌های CSS اضافی که به container مسیریاب اضافه می‌شود. |
