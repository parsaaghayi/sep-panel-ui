# Modal Component

کامپوننت Modal برای نمایش پنجره‌های گفتگو (Dialog) با سه نوع base، warning و danger و دکمه‌های تأیید/انصراف قابل تنظیم.

## ویژگی‌ها

- ✅ سه نوع نمایش: base، warning و danger (با آیکون و رنگ دکمه متفاوت)
- ✅ دکمه‌های تأیید و انصراف با برچسب دلخواه
- ✅ بستن مودال با کلیک روی پس‌زمینه (قابل تنظیم با onClickOutClose)
- ✅ انیمیشن بسته شدن
- ✅ قابلیت قرار دادن هر محتوای دلخواه در بدنه (children)
- ✅ طراحی مطابق با UI Kit

## نحوه استفاده

```tsx
import { Modal } from "@parsaaghayi/sep-panel-ui";

function MyComponent() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setShowModal(true)}>
        باز کردن مودال
      </button>
      {showModal && (
        <Modal
          title="مودال تأیید"
          showModal={showModal}
          setShowModal={setShowModal}
          submitButtonLabel="تأیید"
          onSubmit={() => console.log("submit")}
          cancelButtonLabel="انصراف"
        >
          <p>آیا از انجام این عملیات مطمئن هستید؟</p>
        </Modal>
      )}
    </>
  );
}
```

## Props

| Prop               | Type                                        | Default                                        | Description                                                                 |
| ------------------ | ------------------------------------------- | ---------------------------------------------- | --------------------------------------------------------------------------- |
| `title`            | `string`                                    | -                                              | عنوان مودال (اجباری)                                                        |
| `type`             | `"base" \| "warning" \| "danger"`           | `"base"`                                       | نوع مودال؛ در warning و danger آیکون هشدار/خطا کنار عنوان نمایش داده می‌شود |
| `className`        | `string`                                    | -                                              | کلاس سفارشی                                                                 |
| `showModal`        | `boolean`                                   | -                                              | وضعیت نمایش مودال (اجباری)                                                  |
| `setShowModal`     | `React.Dispatch<React.SetStateAction<boolean>>` | -                                           | setter وضعیت نمایش (اجباری)                                                 |
| `children`         | `ReactElement`                              | -                                              | محتوای بدنه مودال (اجباری)                                                  |
| `onClickOutClose`  | `boolean`                                   | بستگی به `cancelButtonLabel` دارد              | بستن مودال با کلیک روی پس‌زمینه                                             |
| `submitButtonLabel`| `string`                                    | -                                              | برچسب دکمه تأیید؛ همراه با `onSubmit` باید ست شود                           |
| `cancelButtonLabel`| `string`                                    | -                                              | برچسب دکمه انصراف                                                           |
| `onSubmit`         | `() => void`                                | -                                              | تابعی که با کلیک روی دکمه تأیید فراخوانی می‌شود؛ همراه با `submitButtonLabel` باید ست شود |

## مثال‌های استفاده

### مودال هشدار (warning)

```tsx
<Modal
  title="مودال هشدار"
  type="warning"
  showModal={showModal}
  setShowModal={setShowModal}
  submitButtonLabel="تأیید"
  onSubmit={() => alert("submit")}
  cancelButtonLabel="انصراف"
  onClickOutClose={false}
>
  <p>این متن بخش توضیحات مودال است.</p>
</Modal>
```

### مودال خطر (danger)

```tsx
<Modal
  title="مودال خطر"
  type="danger"
  showModal={showModal}
  setShowModal={setShowModal}
  submitButtonLabel="حذف"
  onSubmit={() => alert("submit")}
  cancelButtonLabel="انصراف"
>
  <p>این عملیات قابل بازگشت نیست.</p>
</Modal>
```

### بدون دکمه (فقط اطلاع‌رسانی)

```tsx
<Modal
  title="اطلاع‌رسانی"
  showModal={showModal}
  setShowModal={setShowModal}
>
  <p>این مودال فقط برای نمایش پیام است.</p>
</Modal>
```

## نکات مهم

1. `submitButtonLabel` و `onSubmit` باید با هم ست شوند یا هر دو حذف شوند؛ ست کردن یکی بدون دیگری از نظر تایپ مجاز نیست.
2. مقدار پیش‌فرض `onClickOutClose` به `cancelButtonLabel` وابسته است: اگر `cancelButtonLabel` خالی یا undefined باشد، `true` است و در غیر این صورت `false`.
3. رنگ دکمه تأیید بر اساس `type` تعیین می‌شود: danger → قرمز، warning → هشدار، base → primary.
4. دکمه انصراف همیشه `setShowModal(false)` را صدا می‌زند.
5. وقتی `showModal` به `false` تغییر کند، پس از ۳۰۰ میلی‌ثانیه (برای اتمام انیمیشن) دوباره `setShowModal(false)` فراخوانی می‌شود.