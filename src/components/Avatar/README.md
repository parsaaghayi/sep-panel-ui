# Avatar Component

کامپوننت Avatar برای نمایش تصویر پروفایل کاربر با پس‌زمینه آبی روشن و تصویر پیش‌فرض داخلی در پروژه‌های React است.

## ویژگی‌ها

- ✅ نمایش تصویر پروفایل با قابلیت تنظیم آدرس (picUrl)
- ✅ تصویر پیش‌فرض داخلی (avatar.svg) در صورت نبودن آدرس
- ✅ قابلیت افزودن کلاس سفارشی (className)
- ✅ نمایش تصویر با حالت cover و وسط‌چین (center)
- ✅ طراحی مطابق با UI Kit

## نحوه استفاده

```tsx
import { Avatar } from "@parsaaghayi/sep-panel-ui";

function MyComponent() {
  return <Avatar picUrl="https://example.com/profile.jpg" />;
}
```

## Props

| Prop       | Type     | Default              | Description                              |
| ---------- | -------- | -------------------- | ---------------------------------------- |
| `picUrl`   | `string` | تصویر پیش‌فرض داخلی (avatar.svg) | آدرس تصویر پروفایل        |
| `className`| `string` | -                    | کلاس CSS اضافی برای کانتینر آواتار       |

## مثال‌های استفاده

### آواتار پیش‌فرض

```tsx
<Avatar />
```

### با تصویر سفارشی

```tsx
<Avatar picUrl="https://example.com/user-avatar.jpg" />
```

### با کلاس سفارشی

```tsx
<Avatar className="extra-class" />
```

## نکات مهم

1. اگر `picUrl` داده نشود، تصویر پیش‌فرض داخلی (avatar.svg) نمایش داده می‌شود
2. تصویر با `background-size: cover` نمایش داده می‌شود؛ برای بهترین نتیجه از تصاویر مربعی استفاده کنید
3. پس‌زمینه کانتینر به‌صورت پیش‌فرض `lightblue` است و در صورت نبود تصویر قابل مشاهده است