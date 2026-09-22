import type { Meta, StoryObj } from "@storybook/react-webpack5";
import React, { useState } from "react";
import DayPicker from "./DayPicker";

const meta: Meta<typeof DayPicker> = {
  title: "Components/DayPicker",
  component: DayPicker,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    calendar: { control: { type: "select" }, options: ["jalali", "gregorian"] },
    locale: { control: { type: "select" }, options: ["fa", "en"] },
    direction: { control: { type: "select" }, options: ["rtl", "ltr"] },
    monthLabel: { control: { type: "select" }, options: ["name", "number"] },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

/* ─── Jalali inline ──────────────────────────────────────────────────── */
export const JalaliInline: Story = {
  args: {
    id: "jalali-day",
    label: "تاریخ شمسی",
    calendar: "jalali",
    locale: "fa",
    direction: "rtl",
  },
  render: (args) => {
    const [value, setValue] = useState<Date | null>(null);
    return (
      <div>
        <DayPicker {...args} value={value} onChange={setValue} />
        {value && <p style={{ marginTop: 8, fontSize: 13 }}>{value.toLocaleDateString("fa-IR")}</p>}
      </div>
    );
  },
};

/* ─── Gregorian inline ──────────────────────────────────────────────── */
export const GregorianInline: Story = {
  args: {
    id: "gregorian-day",
    label: "Pick a date",
    calendar: "gregorian",
    locale: "en",
    direction: "ltr",
  },
  render: (args) => {
    const [value, setValue] = useState<Date | null>(null);
    return (
      <div>
        <DayPicker {...args} value={value} onChange={setValue} />
        {value && <p style={{ marginTop: 8, fontSize: 13 }}>{value.toLocaleDateString("en-US")}</p>}
      </div>
    );
  },
};

/* ─── Month name vs number labels ────────────────────────────────────── */
export const MonthLabelComparison: Story = {
  render: () => {
    const [v1, setV1] = useState<Date | null>(null);
    const [v2, setV2] = useState<Date | null>(null);
    return (
      <div style={{ display: "flex", gap: 24 }}>
        <div>
          <p style={{ fontSize: 13, marginBottom: 4 }}>monthLabel = "name" (شهریور)</p>
          <DayPicker
            id="d-name"
            calendar="jalali"
            locale="fa"
            direction="rtl"
            monthLabel="name"
            value={v1}
            onChange={setV1}
          />
        </div>
        <div>
          <p style={{ fontSize: 13, marginBottom: 4 }}>monthLabel = "number" (ماه ۶)</p>
          <DayPicker
            id="d-num"
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

/* ─── Jalali → Miladi output ─────────────────────────────────────────── */
export const ShamsiToMiladiOutput: Story = {
  render: () => {
    const [value, setValue] = useState<string | null>(null);
    return (
      <div>
        <p style={{ fontSize: 13, marginBottom: 4 }}>تقویم شمسی — خروجی میلادی (string)</p>
        <DayPicker<"string">
          id="d-convert"
          calendar="jalali"
          locale="fa"
          direction="rtl"
          format="YYYY/MM/DD"
          output="string"
          outputCalendar="gregorian"
          outputFormat="YYYY-MM-DD"
          value={value}
          onChange={(v) => setValue(v)}
        />
        {value && <pre style={{ marginTop: 8, fontSize: 12, direction: "ltr" }}>{value}</pre>}
      </div>
    );
  },
};
