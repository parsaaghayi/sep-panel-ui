import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import MonthPicker from './MonthPicker';

const meta: Meta<typeof MonthPicker> = {
  title: 'Components/MonthPicker',
  component: MonthPicker,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    calendar:   { control: { type: 'select' }, options: ['jalali', 'gregorian'] },
    locale:     { control: { type: 'select' }, options: ['fa', 'en'] },
    direction:  { control: { type: 'select' }, options: ['rtl', 'ltr'] },
    monthLabel: { control: { type: 'select' }, options: ['name', 'number'] },
    size:       { control: { type: 'select' }, options: ['sm', 'md', 'lg'] },
    variant:    { control: { type: 'select' }, options: ['outlined', 'filled', 'standard'] },
    color:      { control: { type: 'select' }, options: ['primary', 'secondary', 'error', 'warning', 'success'] },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

/* ─── Jalali month name ──────────────────────────────────────────────── */
export const ShamsiMonthName: Story = {
  args: {
    id: 'jalali-month-name',
    label: 'ماه را انتخاب کنید',
    placeholder: 'انتخاب ماه',
    calendar: 'jalali',
    locale: 'fa',
    direction: 'rtl',
    monthLabel: 'name',
    size: 'md',
    variant: 'outlined',
    color: 'primary',
  },
  render: (args) => {
    const [value, setValue] = useState<Date | null>(null);
    return (
      <div style={{ width: '280px' }}>
        <MonthPicker {...args} value={value} onChange={setValue} />
        {value && <p style={{ marginTop: 8, fontSize: 13 }}>ماه انتخاب شده: {value.toLocaleDateString('fa-IR', { year: 'numeric', month: 'long' })}</p>}
      </div>
    );
  },
};

/* ─── Jalali month number ────────────────────────────────────────────── */
export const ShamsiMonthNumber: Story = {
  args: {
    id: 'jalali-month-num',
    label: 'ماه را انتخاب کنید (شماره)',
    placeholder: 'انتخاب ماه',
    calendar: 'jalali',
    locale: 'fa',
    direction: 'rtl',
    monthLabel: 'number',
    size: 'md',
    variant: 'outlined',
    color: 'primary',
  },
  render: (args) => {
    const [value, setValue] = useState<Date | null>(null);
    return (
      <div style={{ width: '280px' }}>
        <MonthPicker {...args} value={value} onChange={setValue} />
        {value && <p style={{ marginTop: 8, fontSize: 13 }}>ماه: {value.toLocaleDateString('fa-IR', { year: 'numeric', month: 'long' })}</p>}
      </div>
    );
  },
};

/* ─── Gregorian month (ژوئن / June) ──────────────────────────────────── */
export const MiladiMonthFa: Story = {
  args: {
    id: 'greg-month-fa',
    label: 'انتخاب ماه میلادی',
    placeholder: 'انتخاب ماه',
    calendar: 'gregorian',
    locale: 'fa',
    direction: 'rtl',
    size: 'md',
  },
  render: (args) => {
    const [value, setValue] = useState<Date | null>(null);
    return (
      <div style={{ width: '280px' }}>
        <MonthPicker {...args} value={value} onChange={setValue} />
        {value && <p style={{ marginTop: 8, fontSize: 13 }}>{value.toLocaleDateString('fa-IR', { year: 'numeric', month: 'long' })}</p>}
      </div>
    );
  },
};

export const MiladiMonthEn: Story = {
  args: {
    id: 'greg-month-en',
    label: 'Pick month',
    placeholder: 'Choose month',
    calendar: 'gregorian',
    locale: 'en',
    direction: 'ltr',
    size: 'md',
  },
  render: (args) => {
    const [value, setValue] = useState<Date | null>(null);
    return (
      <div style={{ width: '280px' }}>
        <MonthPicker {...args} value={value} onChange={setValue} />
        {value && <p style={{ marginTop: 8, fontSize: 13 }}>{value.toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</p>}
      </div>
    );
  },
};

/* ─── Name vs Number side-by-side ────────────────────────────────────── */
export const MonthLabelComparison: Story = {
  render: () => {
    const [v1, setV1] = useState<Date | null>(null);
    const [v2, setV2] = useState<Date | null>(null);
    return (
      <div style={{ display: 'flex', gap: 24 }}>
        <div style={{ width: '280px' }}>
          <p style={{ fontSize: 13, marginBottom: 4 }}>monthLabel = "name" → شهریور</p>
          <MonthPicker
            id="m-name"
            label="نام ماه"
            calendar="jalali"
            locale="fa"
            direction="rtl"
            monthLabel="name"
            value={v1}
            onChange={setV1}
          />
        </div>
        <div style={{ width: '280px' }}>
          <p style={{ fontSize: 13, marginBottom: 4 }}>monthLabel = "number" → ماه ۶</p>
          <MonthPicker
            id="m-num"
            label="شماره ماه"
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

/* ─── Sizes ──────────────────────────────────────────────────────────── */
export const Sizes: Story = {
  render: () => {
    const [v1, setV1] = useState<Date | null>(null);
    const [v2, setV2] = useState<Date | null>(null);
    const [v3, setV3] = useState<Date | null>(null);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '280px' }}>
        <MonthPicker id="m-sm" label="کوچک" size="sm" calendar="jalali" locale="fa" direction="rtl" value={v1} onChange={setV1} />
        <MonthPicker id="m-md" label="متوسط" size="md" calendar="jalali" locale="fa" direction="rtl" value={v2} onChange={setV2} />
        <MonthPicker id="m-lg" label="بزرگ" size="lg" calendar="jalali" locale="fa" direction="rtl" value={v3} onChange={setV3} />
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
        <MonthPicker id="m-out" label="Outlined" variant="outlined" calendar="jalali" locale="fa" direction="rtl" value={v1} onChange={setV1} />
        <MonthPicker id="m-fill" label="Filled" variant="filled" calendar="jalali" locale="fa" direction="rtl" value={v2} onChange={setV2} />
        <MonthPicker id="m-std" label="Standard" variant="standard" calendar="jalali" locale="fa" direction="rtl" value={v3} onChange={setV3} />
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
        <MonthPicker id="m-pri" label="primary" color="primary" calendar="jalali" locale="fa" direction="rtl" value={v1} onChange={s1} />
        <MonthPicker id="m-sec" label="secondary" color="secondary" calendar="jalali" locale="fa" direction="rtl" value={v2} onChange={s2} />
        <MonthPicker id="m-err" label="error" color="error" calendar="jalali" locale="fa" direction="rtl" value={v3} onChange={s3} />
        <MonthPicker id="m-wrn" label="warning" color="warning" calendar="jalali" locale="fa" direction="rtl" value={v4} onChange={s4} />
        <MonthPicker id="m-suc" label="success" color="success" calendar="jalali" locale="fa" direction="rtl" value={v5} onChange={s5} />
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
        <MonthPicker id="m-guid" label="با راهنما" guidMessage="ماه را انتخاب کنید" calendar="jalali" locale="fa" direction="rtl" value={v1} onChange={s1} />
        <MonthPicker id="m-suc" label="موفق" successMessage="انتخاب شد" calendar="jalali" locale="fa" direction="rtl" value={v2} onChange={s2} />
        <MonthPicker id="m-err" label="خطا" errorMessage="ماه نامعتبر" calendar="jalali" locale="fa" direction="rtl" value={v3} onChange={s3} />
      </div>
    );
  },
};

/* ─── Disabled ───────────────────────────────────────────────────────── */
export const Disabled: Story = {
  args: {
    id: 'm-disabled',
    label: 'غیرفعال',
    disabled: true,
    calendar: 'jalali',
    locale: 'fa',
    direction: 'rtl',
  },
  render: (args) => (
    <div style={{ width: '280px' }}>
      <MonthPicker {...args} onChange={() => {}} />
    </div>
  ),
};

/* ─── Icons ──────────────────────────────────────────────────────────── */
export const WithIcons: Story = {
  args: {
    id: 'm-icons',
    label: 'ماه با آیکون',
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
        <MonthPicker {...args} value={value} onChange={setValue} />
      </div>
    );
  },
};
