# Tabs Component

کامپوننت Tabs برای نمایش تب‌های ناوبری با قابلیت انتخاب تب فعال، مناسب برای دسته‌بندی محتوا در پنل‌های مدیریتی است.

## ویژگی‌ها

- ✅ نمایش تعداد دلخواه تب با عناوین سفارشی
- ✅ پشتیبانی از RTL و LTR (متن‌های فارسی و انگلیسی)
- ✅ تب فعال با استایل متمایز و خط زیرین (border)
- ✅ کاملاً کنترل‌شده (controlled) — تب فعال از طریق prop تعیین می‌شود
- ✅ طراحی مطابق با UI Kit

## نحوه استفاده

```tsx
import { Tabs } from "@parsaaghayi/sep-panel-ui";

function MyComponent() {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <Tabs
      tabTitles={["عمومی", "جزئیات", "تنظیمات"]}
      selectedTab={selectedTab}
      setSelectedTab={setSelectedTab}
    />
  );
}
```

## Props

| Prop            | Type                        | Default | Description                                        |
| --------------- | --------------------------- | ------- | -------------------------------------------------- |
| `tabTitles`     | `string[]`                  | -       | آرایه‌ای از عناوین تب‌ها (اجباری)                  |
| `selectedTab`   | `number`                    | -       | ایندکس تب فعال (از صفر شروع می‌شود) (اجباری)       |
| `setSelectedTab`| `(tabNumber: number) => void` | -     | تابع تغییر تب فعال که ایندکس تب کلیک‌شده را دریافت می‌کند (اجباری) |

## مثال‌های استفاده

### تب‌های فارسی

```tsx
const [selectedTab, setSelectedTab] = useState(0);

<Tabs
  tabTitles={["عمومی", "جزئیات", "تنظیمات", "پیشرفته"]}
  selectedTab={selectedTab}
  setSelectedTab={setSelectedTab}
/>;
```

### تب‌های انگلیسی

```tsx
const [selectedTab, setSelectedTab] = useState(0);

<Tabs
  tabTitles={["General", "Details", "Settings"]}
  selectedTab={selectedTab}
  setSelectedTab={setSelectedTab}
/>;
```

### شروع با تب آخر

```tsx
const [selectedTab, setSelectedTab] = useState(3);

<Tabs
  tabTitles={["عمومی", "جزئیات", "تنظیمات", "پیشرفته"]}
  selectedTab={selectedTab}
  setSelectedTab={setSelectedTab}
/>;
```

## نکات مهم

1. `selectedTab` ایندکس مبتنی بر صفر است؛ برای تب اول مقدار `0` را بدهید
2. کامپوننت کنترل‌شده است و محتوای تب‌ها را خودتان باید در کنار آن نمایش دهید
3. اگر `selectedTab` خارج از محدوده `tabTitles` باشد، هیچ تب‌ای فعال نمایش داده نمی‌شود