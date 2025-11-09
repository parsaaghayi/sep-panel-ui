import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import DatePicker from './DatePicker';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    locale: {
      control: { type: 'select' },
      options: ['fa', 'en'],
    },
    direction: {
      control: { type: 'select' },
      options: ['rtl', 'ltr'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: { type: 'select' },
      options: ['outlined', 'filled', 'standard'],
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'error', 'warning', 'success'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Persian DatePicker
export const Persian: Story = {
  args: {
    id: 'persian-datepicker',
    label: 'تاریخ شروع',
    placeholder: 'تاریخ را انتخاب کنید',
    locale: 'fa',
    direction: 'rtl',
    size: 'md',
    variant: 'outlined',
    color: 'primary',
  },
  render: (args) => {
    const [value, setValue] = useState<Date | null>(null);
    return (
      <div style={{ width: '300px' }}>
        <DatePicker
          {...args}
          value={value}
          onChange={setValue}
        />
      </div>
    );
  },
};

// English DatePicker
export const English: Story = {
  args: {
    id: 'english-datepicker',
    label: 'Start Date',
    placeholder: 'Select date',
    locale: 'en',
    direction: 'ltr',
    size: 'md',
    variant: 'outlined',
    color: 'primary',
  },
  render: (args) => {
    const [value, setValue] = useState<Date | null>(null);
    return (
      <div style={{ width: '300px' }}>
        <DatePicker
          {...args}
          value={value}
          onChange={setValue}
        />
      </div>
    );
  },
};

// With Icons
export const WithIcons: Story = {
  args: {
    id: 'datepicker-with-icons',
    label: 'تاریخ شروع',
    placeholder: 'تاریخ را انتخاب کنید',
    locale: 'fa',
    direction: 'rtl',
    firstIconSrc: '/src/images/search.svg',
    lastIconSrc: '/src/images/arrow-bottom.svg',
    size: 'md',
    variant: 'outlined',
    color: 'primary',
  },
  render: (args) => {
    const [value, setValue] = useState<Date | null>(null);
    return (
      <div style={{ width: '300px' }}>
        <DatePicker
          {...args}
          value={value}
          onChange={setValue}
        />
      </div>
    );
  },
};

// Different Sizes
export const Sizes: Story = {
  render: () => {
    const [value1, setValue1] = useState<Date | null>(null);
    const [value2, setValue2] = useState<Date | null>(null);
    const [value3, setValue3] = useState<Date | null>(null);
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
        <DatePicker
          id="small-datepicker"
          label="تاریخ کوچک"
          locale="fa"
          direction="rtl"
          size="sm"
          value={value1}
          onChange={setValue1}
        />
        <DatePicker
          id="medium-datepicker"
          label="تاریخ متوسط"
          locale="fa"
          direction="rtl"
          size="md"
          value={value2}
          onChange={setValue2}
        />
        <DatePicker
          id="large-datepicker"
          label="تاریخ بزرگ"
          locale="fa"
          direction="rtl"
          size="lg"
          value={value3}
          onChange={setValue3}
        />
      </div>
    );
  },
};

// Different Variants
export const Variants: Story = {
  render: () => {
    const [value1, setValue1] = useState<Date | null>(null);
    const [value2, setValue2] = useState<Date | null>(null);
    const [value3, setValue3] = useState<Date | null>(null);
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
        <DatePicker
          id="outlined-datepicker"
          label="Outlined"
          locale="en"
          direction="ltr"
          variant="outlined"
          value={value1}
          onChange={setValue1}
        />
        <DatePicker
          id="filled-datepicker"
          label="Filled"
          locale="en"
          direction="ltr"
          variant="filled"
          value={value2}
          onChange={setValue2}
        />
        <DatePicker
          id="standard-datepicker"
          label="Standard"
          locale="en"
          direction="ltr"
          variant="standard"
          value={value3}
          onChange={setValue3}
        />
      </div>
    );
  },
};

// With Messages
export const WithMessages: Story = {
  render: () => {
    const [value1, setValue1] = useState<Date | null>(null);
    const [value2, setValue2] = useState<Date | null>(null);
    const [value3, setValue3] = useState<Date | null>(null);
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
        <DatePicker
          id="guid-datepicker"
          label="تاریخ با راهنمایی"
          locale="fa"
          direction="rtl"
          guidMessage="لطفاً تاریخ معتبر انتخاب کنید"
          value={value1}
          onChange={setValue1}
        />
        <DatePicker
          id="success-datepicker"
          label="تاریخ موفق"
          locale="fa"
          direction="rtl"
          successMessage="تاریخ با موفقیت انتخاب شد"
          value={value2}
          onChange={setValue2}
        />
        <DatePicker
          id="error-datepicker"
          label="تاریخ خطا"
          locale="fa"
          direction="rtl"
          errorMessage="تاریخ انتخاب شده معتبر نیست"
          value={value3}
          onChange={setValue3}
        />
      </div>
    );
  },
};

// Disabled State
export const Disabled: Story = {
  args: {
    id: 'disabled-datepicker',
    label: 'تاریخ غیرفعال',
    placeholder: 'تاریخ را انتخاب کنید',
    locale: 'fa',
    direction: 'rtl',
    disabled: true,
    value: new Date(),
  },
  render: (args) => {
    return (
      <div style={{ width: '300px' }}>
        <DatePicker {...args} onChange={() => {}} />
      </div>
    );
  },
};

// With Date Restrictions
export const WithDateRestrictions: Story = {
  args: {
    id: 'restricted-datepicker',
    label: 'تاریخ با محدودیت',
    placeholder: 'تاریخ را انتخاب کنید',
    locale: 'fa',
    direction: 'rtl',
    minDate: new Date(2024, 0, 1),
    maxDate: new Date(2024, 11, 31),
  },
  render: (args) => {
    const [value, setValue] = useState<Date | null>(null);
    return (
      <div style={{ width: '300px' }}>
        <DatePicker
          {...args}
          value={value}
          onChange={setValue}
        />
      </div>
    );
  },
};

// Interactive Example
export const Interactive: Story = {
  render: () => {
    const [persianDate, setPersianDate] = useState<Date | null>(null);
    const [englishDate, setEnglishDate] = useState<Date | null>(null);
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '400px' }}>
        <div>
          <h3>DatePicker فارسی</h3>
          <DatePicker
            id="interactive-persian"
            label="تاریخ شروع"
            placeholder="تاریخ را انتخاب کنید"
            locale="fa"
            direction="rtl"
            value={persianDate}
            onChange={setPersianDate}
            firstIconSrc="/src/images/search.svg"
          />
          {persianDate && (
            <p style={{ marginTop: '8px', fontSize: '14px', color: '#666' }}>
              تاریخ انتخاب شده: {persianDate.toLocaleDateString('fa-IR')}
            </p>
          )}
        </div>
        
        <div>
          <h3>English DatePicker</h3>
          <DatePicker
            id="interactive-english"
            label="Start Date"
            placeholder="Select date"
            locale="en"
            direction="ltr"
            value={englishDate}
            onChange={setEnglishDate}
            firstIconSrc="/src/images/search.svg"
          />
          {englishDate && (
            <p style={{ marginTop: '8px', fontSize: '14px', color: '#666' }}>
              Selected date: {englishDate.toLocaleDateString('en-US')}
            </p>
          )}
        </div>
      </div>
    );
  },
};

