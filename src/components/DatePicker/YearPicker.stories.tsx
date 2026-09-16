import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import YearPicker from './YearPicker';

const meta: Meta<typeof YearPicker> = {
  title: 'Components/YearPicker',
  component: YearPicker,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    calendar:   { control: { type: 'select' }, options: ['jalali', 'gregorian'] },
    locale:     { control: { type: 'select' }, options: ['fa', 'en'] },
    direction:  { control: { type: 'select' }, options: ['rtl', 'ltr'] },
    size:       { control: { type: 'select' }, options: ['sm', 'md', 'lg'] },
    variant:    { control: { type: 'select' }, options: ['outlined', 'filled', 'standard'] },
    color:      { control: { type: 'select' }, options: ['primary', 'secondary', 'error', 'warning', 'success'] },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

/* ─── Jalali year ────────────────────────────────────────────────────── */
export const ShamsiYear: Story = {
  args: {
    id: 'jalali-year',
    label: 'سال را انتخاب کنید',
    placeholder: 'انتخاب سال',
    calendar: 'jalali',
    locale: 'fa',
    direction: 'rtl',
    size: 'md',
    variant: 'outlined',
    color: 'primary',
  },
  render: (args) => {
    const [value, setValue] = useState<Date | null>(null);
    return (
      <div style={{ width: '280px' }}>
        <YearPicker {...args} value={value} onChange={setValue} />
        {value && <p style={{ marginTop: 8, fontSize: 13 }}>سال: {value.toLocaleDateString('fa-IR', { year: 'numeric' })}</p>}
      </div>
    );
  },
};

/* ─── Gregorian year ─────────────────────────────────────────────────── */
export const MiladiYear: Story = {
  args: {
    id: 'greg-year',
    label: 'Select year',
    placeholder: 'Choose year',
    calendar: 'gregorian',
    locale: 'en',
    direction: 'ltr',
    size: 'md',
    variant: 'outlined',
    color: 'primary',
  },
  render: (args) => {
    const [value, setValue] = useState<Date | null>(null);
    return (
      <div style={{ width: '280px' }}>
        <YearPicker {...args} value={value} onChange={setValue} />
        {value && <p style={{ marginTop: 8, fontSize: 13 }}>Year: {value.getFullYear()}</p>}
      </div>
    );
  },
};

/* ─── Shamsi to Miladi output ────────────────────────────────────────── */
export const ShamsiToMiladiOutput: Story = {
  render: () => {
    const [value, setValue] = useState<string | null>(null);
    return (
      <div style={{ width: '280px' }}>
        <p style={{ fontSize: 13, marginBottom: 4 }}>نمایش شمسی — خروجی میلادی (string)</p>
        <YearPicker<"string">
          id="y-convert"
          label="سال شمسی"
          calendar="jalali"
          locale="fa"
          direction="rtl"
          format="YYYY"
          output="string"
          outputCalendar="gregorian"
          outputFormat="YYYY"
          value={value}
          onChange={(v) => setValue(v)}
        />
        {value && <pre style={{ marginTop: 8, fontSize: 12, direction: 'ltr' }}>{value}</pre>}
      </div>
    );
  },
};

/* ─── Sizes ──────────────────────────────────────────────────────────── */
export const Sizes: Story = {
  render: () => {
    const [v1, setV1] = useState<Date | null>(null);
    const [v2, setV2] = useState<Date | null>(null);
    const [v3, setV3] = useState<Date | null>(null);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '280px' }}>
        <YearPicker id="y-sm" label="کوچک" size="sm" calendar="jalali" locale="fa" direction="rtl" value={v1} onChange={setV1} />
        <YearPicker id="y-md" label="متوسط"  size="md" calendar="jalali" locale="fa" direction="rtl" value={v2} onChange={setV2} />
        <YearPicker id="y-lg" label="بزرگ"  size="lg" calendar="jalali" locale="fa" direction="rtl" value={v3} onChange={setV3} />
      </div>
    );
  },
};

/* ─── Variants ───────────────────────────────────────────────────────── */
export const Variants: Story = {
  render: () => {
    const [v1, setV1] = useState<Date | null>(null);
    const [v2, setV2] = useState<Date | null>(null);
    const [v3, setV3] = useState<Date | null>(null);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '280px' }}>
        <YearPicker id="y-out" label="Outlined" variant="outlined" calendar="jalali" locale="fa" direction="rtl" value={v1} onChange={setV1} />
        <YearPicker id="y-fill" label="Filled" variant="filled" calendar="jalali" locale="fa" direction="rtl" value={v2} onChange={setV2} />
        <YearPicker id="y-std" label="Standard" variant="standard" calendar="jalali" locale="fa" direction="rtl" value={v3} onChange={setV3} />
      </div>
    );
  },
};

/* ─── Colors ─────────────────────────────────────────────────────────── */
export const Colors: Story = {
  render: () => {
    const mk = () => useState<Date | null>(null);
    const [v1, s1] = mk(); const [v2, s2] = mk(); const [v3, s3] = mk();
    const [v4, s4] = mk(); const [v5, s5] = mk();
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '280px' }}>
        <YearPicker id="y-pri" label="primary" color="primary" calendar="jalali" locale="fa" direction="rtl" value={v1} onChange={s1} />
        <YearPicker id="y-sec" label="secondary" color="secondary" calendar="jalali" locale="fa" direction="rtl" value={v2} onChange={s2} />
        <YearPicker id="y-err" label="error" color="error" calendar="jalali" locale="fa" direction="rtl" value={v3} onChange={s3} />
        <YearPicker id="y-wrn" label="warning" color="warning" calendar="jalali" locale="fa" direction="rtl" value={v4} onChange={s4} />
        <YearPicker id="y-suc" label="success" color="success" calendar="jalali" locale="fa" direction="rtl" value={v5} onChange={s5} />
      </div>
    );
  },
};

/* ─── Messages ───────────────────────────────────────────────────────── */
export const WithMessages: Story = {
  render: () => {
    const [v1, s1] = useState<Date | null>(null);
    const [v2, s2] = useState<Date | null>(null);
    const [v3, s3] = useState<Date | null>(null);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '280px' }}>
        <YearPicker id="y-guid" label="با راهنما" guidMessage="سال را انتخاب کنید" calendar="jalali" locale="fa" direction="rtl" value={v1} onChange={s1} />
        <YearPicker id="y-suc" label="موفق" successMessage="انتخاب شد" calendar="jalali" locale="fa" direction="rtl" value={v2} onChange={s2} />
        <YearPicker id="y-err" label="خطا" errorMessage="سال نامعتبر" calendar="jalali" locale="fa" direction="rtl" value={v3} onChange={s3} />
      </div>
    );
  },
};

/* ─── Disabled ───────────────────────────────────────────────────────── */
export const Disabled: Story = {
  args: {
    id: 'y-disabled',
    label: 'غیرفعال',
    disabled: true,
    calendar: 'jalali',
    locale: 'fa',
    direction: 'rtl',
  },
  render: (args) => (
    <div style={{ width: '280px' }}>
      <YearPicker {...args} onChange={() => {}} />
    </div>
  ),
};

/* ─── Icons ──────────────────────────────────────────────────────────── */
export const WithIcons: Story = {
  args: {
    id: 'y-icons',
    label: 'سال با آیکون',
    firstIconSrc: '/src/images/search.svg',
    lastIconSrc: '/src/images/arrow-bottom.svg',
    calendar: 'jalali',
    locale: 'fa',
    direction: 'rtl',
  },
  render: (args) => {
    const [value, setValue] = useState<Date | null>(null);
    return (
      <div style={{ width: '280px' }}>
        <YearPicker {...args} value={value} onChange={setValue} />
      </div>
    );
  },
};