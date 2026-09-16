<div align="center">

# @parsaaghayi/sep-panel-ui

A React component library built on the [Atlassian Design System](https://atlassian.design) with native **Shamsi (Jalali)** and **Gregorian** calendar support.

[![npm version](https://img.shields.io/npm/v/@parsaaghayi/sep-panel-ui?label=npm)](https://www.npmjs.com/package/@parsaaghayi/sep-panel-ui)
[![license](https://img.shields.io/npm/l/@parsaaghayi/sep-panel-ui)](./LICENSE)
[![storybook](https://img.shields.io/badge/Storybook-FF4785?logo=storybook)](./storybook-static/iframe.html)

</div>

---

## Features

- **Dual calendar system** — Jalali (Shamsi) and Gregorian with full date math (no `jalaali-js` runtime dependency — the algorithm is ported directly into the library)
- **Locale-aware** — `locale="fa"` gives Persian digit rendering and month/weekday names; `locale="en"` gives English
- **Decoupled input / display / output** — show a Shamsi calendar but return a Gregorian `Date`, or show month names but return numbers — every combination works via `calendar`, `outputCalendar`, `format`, and `outputFormat`
- **5 calendar components** — `DatePicker`, `RangePicker`, `DayPicker`, `MonthPicker`, `YearPicker`
- **Consistent design system** — every picker supports the same `size`, `variant`, `color`, `icon`, and `message` props
- **Fully typed** — ships with `.d.ts` declarations; generic `<O>` parameter on every picker ties `output` to the `onChange` return type
- **Peer-deps only** — requires `react` (18 or 19) as a peer dependency; no hidden runtime libraries

## Contents

| Section                                         | Description                                                 |
| ----------------------------------------------- | ----------------------------------------------------------- |
| [Installation](#installation)                   | npm / yarn                                                  |
| [Calendar Pickers](#calendar-pickers)           | DatePicker, RangePicker, DayPicker, MonthPicker, YearPicker |
| [Shared Calendar Props](#shared-calendar-props) | calendar, locale, format, output, monthLabel, etc.          |
| [Styling Props](#styling-props)                 | size, variant, color, icons, messages, disabled             |
| [Other Components](#other-components)           | Button, TextField, Modal, Toggle, etc.                      |
| [Development](#development)                     | scripts, local setup                                        |
| [License](#license)                             |

---

## Installation

```bash
npm install @parsaaghayi/sep-panel-ui
# or
yarn add @parsaaghayi/sep-panel-ui
```

Peer dependencies: `react` and `react-dom` (`^18.3.1 || ^19.0.0`).

---

## Calendar Pickers

### DatePicker

Single date selection with a trigger input and a popup calendar.

```tsx
import { DatePicker } from "@parsaaghayi/sep-panel-ui";

function App() {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <DatePicker
      id="start-date"
      label="تاریخ شروع"
      calendar="jalali"
      locale="fa"
      direction="rtl"
      format="YYYY/MM/DD"
      value={date}
      onChange={setDate}
      size="md"
      variant="outlined"
      color="primary"
    />
  );
}
```

**Show Shamsi, return Gregorian:**

```tsx
<DatePicker
  calendar="jalali"
  locale="fa"
  direction="rtl"
  format="YYYY/MM/DD"
  output="string"
  outputCalendar="gregorian"
  outputFormat="YYYY-MM-DD"
  onChange={(val) => {
    // val is a Gregorian date string like "2025-03-21"
  }}
/>
```

---

### RangePicker

Select a start and end date. Works identically to `DatePicker` but manages a `{ start, end }` range.

```tsx
import { RangePicker } from "@parsaaghayi/sep-panel-ui";

<RangePicker
  calendar="jalali"
  locale="fa"
  direction="rtl"
  separator="تا"
  value={range}
  onChange={setRange}
/>;
```

---

### DayPicker

An inline (always-visible) calendar without a trigger input. Ideal for embedded date choosers.

```tsx
import { DayPicker } from "@parsaaghayi/sep-panel-ui";

<DayPicker calendar="jalali" locale="fa" direction="rtl" />;
```

---

### MonthPicker

Opens to the month-selection view directly; uses a trigger input and popup like `DatePicker`.

```tsx
import { MonthPicker } from "@parsaaghayi/sep-panel-ui";

<MonthPicker
  calendar="jalali"
  locale="fa"
  direction="rtl"
  monthLabel="name" // "شهریور" | "ماه ۶"
  format="YYYY/MM"
/>;
```

---

### YearPicker

Opens to the year-selection view directly.

```tsx
import { YearPicker } from "@parsaaghayi/sep-panel-ui";

<YearPicker calendar="jalali" locale="fa" direction="rtl" format="YYYY" />;
```

---

## Shared Calendar Props

Every picker accepts these props to control calendar behaviour:

| Prop             | Type                      | Default        | Description                                                |
| ---------------- | ------------------------- | -------------- | ---------------------------------------------------------- |
| `calendar`       | `"jalali" \| "gregorian"` | `"jalali"`     | Calendar shown in the popup                                |
| `locale`         | `"fa" \| "en"`            | `"fa"`         | Digit rendering and month/weekday names                    |
| `direction`      | `"rtl" \| "ltr"`          | `"rtl"`        | Text direction of the widget                               |
| `monthLabel`     | `"name" \| "number"`      | `"name"`       | Show month name or number                                  |
| `format`         | `string`                  | —              | Display format for the trigger input (e.g. `"YYYY/MM/DD"`) |
| `parseFormat`    | `string`                  | `"YYYY/MM/DD"` | Format used to parse a string `value`                      |
| `parseCalendar`  | `"jalali" \| "gregorian"` | `calendar`     | Calendar used to parse the string value                    |
| `output`         | `"date" \| "string"`      | `"date"`       | Type emitted by `onChange`                                 |
| `outputFormat`   | `string`                  | `"YYYY/MM/DD"` | Format for string output                                   |
| `outputCalendar` | `"jalali" \| "gregorian"` | `calendar`     | Calendar used for string output                            |
| `minDate`        | `Date`                    | —              | Earliest selectable date                                   |
| `maxDate`        | `Date`                    | —              | Latest selectable date                                     |

### Format tokens

| Token  | Example               | Description                 |
| ------ | --------------------- | --------------------------- |
| `YYYY` | `1404` / `2025`       | 4-digit year                |
| `YY`   | `04` / `25`           | 2-digit year                |
| `MMMM` | `فروردین` / `January` | Full month name (localized) |
| `MM`   | `01` – `12`           | 2-digit month number        |
| `M`    | `1` – `12`            | Month number                |
| `DD`   | `01` – `31`           | 2-digit day                 |
| `D`    | `1` – `31`            | Day number                  |

---

## Styling Props

All input-based pickers (`DatePicker`, `RangePicker`, `MonthPicker`, `YearPicker`) share these design-system props:

| Prop        | Type      | Values                                                          | Default      |
| ----------- | --------- | --------------------------------------------------------------- | ------------ |
| `size`      | `string`  | `"sm" \| "md" \| "lg"`                                          | `"md"`       |
| `variant`   | `string`  | `"outlined" \| "filled" \| "standard"`                          | `"outlined"` |
| `color`     | `string`  | `"primary" \| "secondary" \| "error" \| "warning" \| "success"` | `"primary"`  |
| `disabled`  | `boolean` | —                                                               | `false`      |
| `readOnly`  | `boolean` | —                                                               | `false`      |
| `required`  | `boolean` | —                                                               | `false`      |
| `fullWidth` | `boolean` | —                                                               | `false`      |

**Icons:**

```tsx
<DatePicker
  startIcon={<CalendarIcon />}
  endIcon={<ChevronDown />}
  iconPosition="start"
  iconClick={() => console.log("clicked")}
/>
```

Or provide image URLs:

```tsx
<DatePicker firstIconSrc="/icons/search.svg" lastIconSrc="/icons/chevron.svg" />
```

**Messages:**

```tsx
<DatePicker guidMessage="سال را انتخاب کنید" />
<DatePicker successMessage="انتخاب شد" />
<DatePicker errorMessage="تاریخ معتبر نیست" />
```

---

## Other Components

The library also ships the following UI components (non-calendar):

| Component         | Description                                                    |
| ----------------- | -------------------------------------------------------------- |
| `Button`          | Multi-purpose button with `colorType`, `hasMore`, icon support |
| `TextField`       | Input with validation, formatting, icons, and message support  |
| `Checkbox`        | Controlled checkbox with label and required indicator          |
| `Toggle`          | On/off switch with disabled state                              |
| `SelectInput`     | Dropdown select with search and async loading                  |
| `Modal`           | Overlay dialog with `warning`/`danger` variants                |
| `Tabs`            | Tab navigation                                                 |
| `Breadcrumb`      | Path breadcrumb                                                |
| `Pagination`      | Page navigation with RTL support                               |
| `RadioGroup`      | Radio button group                                             |
| `Progressbar`     | Progress bar                                                   |
| `ProgressTracker` | Step-based tracker                                             |
| `DropDownMenu`    | Animated dropdown container                                    |
| `PageHeader`      | Page header with breadcrumb and action buttons                 |
| `Avatar`          | User avatar with fallback image                                |

See the **Storybook** (`npm run storybook`) for interactive examples of every component.

---

## Development

```bash
# install dependencies
npm install

# run Storybook
npm run storybook

# run tests
npm test

# run tests in watch mode
npm run test:watch

# type-check
npm run typecheck

# build the library
npm run build

# build storybook static
npm run build-storybook
```

---

## License

[MIT](./LICENSE) &copy; Parsa Aghayi
