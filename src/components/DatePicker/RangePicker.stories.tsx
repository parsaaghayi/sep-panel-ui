import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import RangePicker from "./RangePicker";

const meta: Meta<typeof RangePicker> = {
  title: "Components/RangePicker",
  component: RangePicker,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    calendar: { control: { type: "select" }, options: ["jalali", "gregorian"] },
    locale: { control: { type: "select" }, options: ["fa", "en"] },
    direction: { control: { type: "select" }, options: ["rtl", "ltr"] },
    monthLabel: { control: { type: "select" }, options: ["name", "number"] },
    size: { control: { type: "select" }, options: ["sm", "md", "lg"] },
    variant: { control: { type: "select" }, options: ["outlined", "filled", "standard"] },
    color: {
      control: { type: "select" },
      options: ["primary", "secondary", "error", "warning", "success"],
    },
    rangePresets: { control: false },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

/* ─── Jalali (شمسی) ────────────────────────────────────────────────── */
export const ShamsiRange: Story = {
  args: {
    id: "jalali-range",
    label: "بازه تاریخ",
    placeholder: "تاریخ شروع – پایان",
    calendar: "jalali",
    locale: "fa",
    direction: "rtl",
    size: "md",
    variant: "outlined",
    color: "primary",
  },
  render: (args) => {
    const [value, setValue] = useState<{ start: Date | null; end: Date | null } | null>(null);
    return (
      <div style={{ width: "360px" }}>
        <RangePicker {...args} value={value} onChange={setValue} />
        {value && (
          <pre style={{ marginTop: 8, fontSize: 12, direction: "ltr" }}>
            {JSON.stringify(value, null, 2)}
          </pre>
        )}
      </div>
    );
  },
};

/* ─── Gregorian (میلادی) ────────────────────────────────────────────── */
export const MiladiRange: Story = {
  args: {
    id: "gregorian-range",
    label: "Date Range",
    placeholder: "Start – End",
    calendar: "gregorian",
    locale: "en",
    direction: "ltr",
    size: "md",
    variant: "outlined",
    color: "primary",
  },
  render: (args) => {
    const [value, setValue] = useState<{ start: Date | null; end: Date | null } | null>(null);
    return (
      <div style={{ width: "360px" }}>
        <RangePicker {...args} value={value} onChange={setValue} />
        {value && (
          <pre style={{ marginTop: 8, fontSize: 12 }}>{JSON.stringify(value, null, 2)}</pre>
        )}
      </div>
    );
  },
};

/* ─── Jalali month names vs numbers ─────────────────────────────────── */
export const MonthLabels: Story = {
  render: () => {
    const [v1, setV1] = useState<{ start: Date | null; end: Date | null } | null>(null);
    const [v2, setV2] = useState<{ start: Date | null; end: Date | null } | null>(null);
    return (
      <div style={{ display: "flex", gap: 24 }}>
        <div style={{ width: "340px" }}>
          <p style={{ fontSize: 13, marginBottom: 4 }}>monthLabel = "name" → شهریور</p>
          <RangePicker
            id="r-name"
            label="بازه با نام ماه"
            calendar="jalali"
            locale="fa"
            direction="rtl"
            monthLabel="name"
            value={v1}
            onChange={setV1}
          />
        </div>
        <div style={{ width: "340px" }}>
          <p style={{ fontSize: 13, marginBottom: 4 }}>monthLabel = "number" → ماه ۶</p>
          <RangePicker
            id="r-num"
            label="بازه با شماره ماه"
            calendar="jalali"
            locale="fa"
            direction="rtl"
            monthLabel="number"
            value={v2}
            onChange={setV2}
          />
        </div>
      </div>
    );
  },
};

/* ─── Show Shamsi → output Miladi string ─────────────────────────────── */
export const ShamsiToMiladiOutput: Story = {
  render: () => {
    const [value, setValue] = useState<{
      start: string | null;
      end: string | null;
    } | null>(null);
    return (
      <div style={{ width: "360px" }}>
        <p style={{ fontSize: 13, marginBottom: 4 }}>نمایش شمسی — خروجی میلادی (string)</p>
        <RangePicker<"string">
          id="shamsi-miladi-out"
          label="بازه تاریخ"
          calendar="jalali"
          locale="fa"
          direction="rtl"
          format="YYYY/MM/DD"
          output="string"
          outputCalendar="gregorian"
          outputFormat="YYYY-MM-DD"
          value={value}
          onChange={setValue}
        />
        {value && (
          <pre style={{ marginTop: 8, fontSize: 12, direction: "ltr" }}>
            {value.start} → {value.end}
          </pre>
        )}
      </div>
    );
  },
};

/* ─── Quick range presets ────────────────────────────────────────────── */
export const RangePresets: Story = {
  args: {
    id: "range-presets",
    label: "بازه تاریخ",
    placeholder: "تاریخ شروع – پایان",
    calendar: "jalali",
    locale: "fa",
    direction: "rtl",
    size: "md",
    variant: "outlined",
    color: "primary",
    rangePresets: [
      { label: "هفته اخیر", amount: 1, unit: "week" },
      { label: "دو هفته اخیر", amount: 2, unit: "week" },
      { label: "سه هفته اخیر", amount: 3, unit: "week" },
      { label: "ماه اخیر", amount: 1, unit: "month" },
    ],
  },
  argTypes: {
    presetsPosition: {
      control: { type: "select" },
      options: ["bottom", "start", "end"],
    },
  },
  render: (args) => {
    const [value, setValue] = useState<{ start: Date | null; end: Date | null } | null>(null);
    return (
      <div style={{ width: "360px" }}>
        <RangePicker {...args} value={value} onChange={setValue} />
        {value && (
          <pre style={{ marginTop: 8, fontSize: 12, direction: "ltr" }}>
            {JSON.stringify(value, null, 2)}
          </pre>
        )}
      </div>
    );
  },
};

/* ─── Presets in different positions ─────────────────────────────────── */
export const PresetPositions: Story = {
  render: () => {
    const mk = () => useState<{ start: Date | null; end: Date | null } | null>(null);
    const [v1, s1] = mk();
    const [v2, s2] = mk();
    const [v3, s3] = mk();
    const presets = [
      { label: "هفته اخیر", amount: 1, unit: "week" as const },
      { label: "دو هفته اخیر", amount: 2, unit: "week" as const },
      { label: "ماه اخیر", amount: 1, unit: "month" as const },
    ];
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 24, width: "360px" }}>
        <div>
          <p style={{ fontSize: 13, marginBottom: 4 }}>presetsPosition = "end"</p>
          <RangePicker
            id="p-end"
            label="بازه تاریخ"
            calendar="jalali"
            locale="fa"
            direction="rtl"
            value={v1}
            onChange={s1}
            rangePresets={presets}
          />
        </div>
        <div>
          <p style={{ fontSize: 13, marginBottom: 4 }}>presetsPosition = "start"</p>
          <RangePicker
            id="p-start"
            label="بازه تاریخ"
            calendar="jalali"
            locale="fa"
            direction="rtl"
            value={v2}
            onChange={s2}
            rangePresets={presets}
            presetsPosition="start"
          />
        </div>
        <div>
          <p style={{ fontSize: 13, marginBottom: 4 }}>presetsPosition = "bottom"</p>
          <RangePicker
            id="p-bottom"
            label="بازه تاریخ"
            calendar="jalali"
            locale="fa"
            direction="rtl"
            value={v3}
            onChange={s3}
            rangePresets={presets}
            presetsPosition="bottom"
          />
        </div>
      </div>
    );
  },
};

/* ─── Sizes ──────────────────────────────────────────────────────────── */
export const Sizes: Story = {
  render: () => {
    const [v1, setV1] = useState<{ start: Date | null; end: Date | null } | null>(null);
    const [v2, setV2] = useState<{ start: Date | null; end: Date | null } | null>(null);
    const [v3, setV3] = useState<{ start: Date | null; end: Date | null } | null>(null);
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "340px" }}>
        <RangePicker
          id="r-sm"
          label="کوچک"
          size="sm"
          calendar="jalali"
          locale="fa"
          direction="rtl"
          value={v1}
          onChange={setV1}
        />
        <RangePicker
          id="r-md"
          label="متوسط"
          size="md"
          calendar="jalali"
          locale="fa"
          direction="rtl"
          value={v2}
          onChange={setV2}
        />
        <RangePicker
          id="r-lg"
          label="بزرگ"
          size="lg"
          calendar="jalali"
          locale="fa"
          direction="rtl"
          value={v3}
          onChange={setV3}
        />
      </div>
    );
  },
};

/* ─── Variants ───────────────────────────────────────────────────────── */
export const Variants: Story = {
  render: () => {
    const [v1, setV1] = useState<{ start: Date | null; end: Date | null } | null>(null);
    const [v2, setV2] = useState<{ start: Date | null; end: Date | null } | null>(null);
    const [v3, setV3] = useState<{ start: Date | null; end: Date | null } | null>(null);
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "340px" }}>
        <RangePicker
          id="r-out"
          label="Outlined"
          variant="outlined"
          calendar="jalali"
          locale="fa"
          direction="rtl"
          value={v1}
          onChange={setV1}
        />
        <RangePicker
          id="r-fill"
          label="Filled"
          variant="filled"
          calendar="jalali"
          locale="fa"
          direction="rtl"
          value={v2}
          onChange={setV2}
        />
        <RangePicker
          id="r-std"
          label="Standard"
          variant="standard"
          calendar="jalali"
          locale="fa"
          direction="rtl"
          value={v3}
          onChange={setV3}
        />
      </div>
    );
  },
};

/* ─── Colors ─────────────────────────────────────────────────────────── */
export const Colors: Story = {
  render: () => {
    const mk = () => useState<{ start: Date | null; end: Date | null } | null>(null);
    const [v1, s1] = mk();
    const [v2, s2] = mk();
    const [v3, s3] = mk();
    const [v4, s4] = mk();
    const [v5, s5] = mk();
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "340px" }}>
        <RangePicker
          id="r-pri"
          label="primary"
          color="primary"
          calendar="jalali"
          locale="fa"
          direction="rtl"
          value={v1}
          onChange={s1}
        />
        <RangePicker
          id="r-sec"
          label="secondary"
          color="secondary"
          calendar="jalali"
          locale="fa"
          direction="rtl"
          value={v2}
          onChange={s2}
        />
        <RangePicker
          id="r-err"
          label="error"
          color="error"
          calendar="jalali"
          locale="fa"
          direction="rtl"
          value={v3}
          onChange={s3}
        />
        <RangePicker
          id="r-wrn"
          label="warning"
          color="warning"
          calendar="jalali"
          locale="fa"
          direction="rtl"
          value={v4}
          onChange={s4}
        />
        <RangePicker
          id="r-suc"
          label="success"
          color="success"
          calendar="jalali"
          locale="fa"
          direction="rtl"
          value={v5}
          onChange={s5}
        />
      </div>
    );
  },
};

/* ─── Messages ───────────────────────────────────────────────────────── */
export const WithMessages: Story = {
  render: () => {
    const [v1, s1] = useState<{ start: Date | null; end: Date | null } | null>(null);
    const [v2, s2] = useState<{ start: Date | null; end: Date | null } | null>(null);
    const [v3, s3] = useState<{ start: Date | null; end: Date | null } | null>(null);
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "340px" }}>
        <RangePicker
          id="r-guid"
          label="با راهنما"
          guidMessage="بازه تاریخ را انتخاب کنید"
          calendar="jalali"
          locale="fa"
          direction="rtl"
          value={v1}
          onChange={s1}
        />
        <RangePicker
          id="r-suc"
          label="موفق"
          successMessage="انتخاب شد"
          calendar="jalali"
          locale="fa"
          direction="rtl"
          value={v2}
          onChange={s2}
        />
        <RangePicker
          id="r-err"
          label="خطا"
          errorMessage="بازه نامعتبر"
          calendar="jalali"
          locale="fa"
          direction="rtl"
          value={v3}
          onChange={s3}
        />
      </div>
    );
  },
};

/* ─── Disabled ───────────────────────────────────────────────────────── */
export const Disabled: Story = {
  args: {
    id: "r-disabled",
    label: "غیرفعال",
    disabled: true,
    calendar: "jalali",
    locale: "fa",
    direction: "rtl",
  },
  render: (args) => (
    <div style={{ width: "340px" }}>
      <RangePicker {...args} onChange={() => {}} />
    </div>
  ),
};

/* ─── Icons ──────────────────────────────────────────────────────────── */
export const WithIcons: Story = {
  args: {
    id: "r-icons",
    label: "بازه با آیکون",
    firstIconSrc: "/src/images/search.svg",
    lastIconSrc: "/src/images/arrow-bottom.svg",
    calendar: "jalali",
    locale: "fa",
    direction: "rtl",
  },
  render: (args) => {
    const [value, setValue] = useState<{ start: Date | null; end: Date | null } | null>(null);
    return (
      <div style={{ width: "340px" }}>
        <RangePicker {...args} value={value} onChange={setValue} />
      </div>
    );
  },
};
