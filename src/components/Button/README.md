# Button Component

کامپوننت Button برای نمایش دکمه‌های قابل تنظیم با انواع رنگ، آیکون و حالت‌های loading و disabled در پروژه‌های React.

## ویژگی‌ها

- ✅ پشتیبانی از ۸ نوع رنگ (base, primary, secondary, warning, danger, link, subtle, subtleLink)
- ✅ پشتیبانی از آیکون اول و آخر (fistIconSrc/lastIconSrc)
- ✅ حالت loading با نمایش آیکون بارگذاری
- ✅ حالت hasMore برای نمایش آیکون «بیشتر»
- ✅ پشتیبانی از disabled
- ✅ پشتیبانی از className سفارشی
- ✅ طراحی مطابق با UI Kit

## نحوه استفاده

```tsx
import { Button } from "@parsaaghayi/sep-panel-ui";

function MyComponent() {
  return (
    <Button
      label="ذخیره"
      colorType="primary"
      onClick={() => console.log("clicked")}
    />
  );
}
```

## Props

| Prop         | Type                                                                                                                              | Default      | Description                                        |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------- | ------------ | -------------------------------------------------- |
| `label`      | `string`                                                                                                                          | -            | متن دکمه (اجباری)                                  |
| `type`       | `"submit" \| "reset" \| "button"`                                                                                                 | `"button"`   | نوع دکمه                                           |
| `colorType`  | `"base" \| "primary" \| "secondary" \| "warning" \| "danger" \| "link" \| "subtle" \| "subtleLink"`                               | `"base"`     | نوع رنگ دکمه                                       |
| `fistIconSrc`| `string`                                                                                                                          | -            | مسیر آیکون اول (سمت شروع)                          |
| `lastIconSrc`| `string`                                                                                                                          | -            | مسیر آیکون آخر (سمت پایان)                         |
| `className`  | `string`                                                                                                                          | -            | کلاس سفارشی اضافه‌شده به دکمه                      |
| `disabled`   | `boolean`                                                                                                                         | `false`      | غیرفعال کردن دکمه                                  |
| `loading`    | `boolean`                                                                                                                         | `false`      | نمایش حالت بارگذاری (جایگزین محتوای دکمه)          |
| `hasMore`    | `boolean`                                                                                                                         | `false`      | نمایش آیکون «بیشتر» به‌جای برچسب و آیکون‌ها        |
| `onClick`    | `() => void`                                                                                                                      | -            | تابع کلیک روی دکمه                                 |

## مثال‌های استفاده

### دکمه اصلی با آیکون

```tsx
<Button
  label="افزودن کاربر"
  colorType="primary"
  fistIconSrc="/icons/add.svg"
  onClick={handleAdd}
/>
```

### دکمه در حالت loading

```tsx
<Button label="در حال ذخیره..." colorType="primary" loading />
```

### دکمه غیرفعال

```tsx
<Button label="حذف" colorType="danger" disabled />
```

## نکات مهم

1. `label` تنها prop اجباری است
2. در حالت `loading`، محتوای دکمه (برچسب و آیکون‌ها) با آیکون بارگذاری جایگزین می‌شود
3. در حالت `hasMore`، آیکون «بیشتر» به‌جای برچسب و آیکون‌ها نمایش داده می‌شود
4. نام prop آیکون اول در سورس `fistIconSrc` است (با همین املای خاص) و باید دقیقاً همین‌طور استفاده شود
5. `colorType` پیش‌فرض `"base"` دارد و در صورت عدم تنظیم، دکمه با استایل پایه نمایش داده می‌شود