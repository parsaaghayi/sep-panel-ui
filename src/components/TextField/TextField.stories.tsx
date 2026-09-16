import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import TextField from "./TextField";

const meta = {
  title: "sep-panel-ui/TextField",
  component: TextField,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["text", "email", "password", "tel", "url", "number"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    variant: {
      control: { type: "select" },
      options: ["outlined", "filled", "standard"],
    },
    color: {
      control: { type: "select" },
      options: ["primary", "secondary", "error", "warning", "success"],
    },
    direction: {
      control: { type: "select" },
      options: ["rtl", "ltr"],
    },
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic TextField
export const Basic: Story = {
  args: {
    type: "text",
    label: "نام کاربری",
    id: "username",
    name: "username",
    placeholder: "نام کاربری خود را وارد کنید",
    value: "",
    onChange: () => {},
  },
};

// TextField with all new features
export const Advanced: Story = {
  args: {
    type: "text",
    label: "نام کامل",
    id: "fullname",
    name: "fullname",
    placeholder: "نام کامل خود را وارد کنید",
    required: true,
    maxLength: 50,
    minLength: 2,
    size: "lg",
    variant: "outlined",
    color: "primary",
    fullWidth: true,
    validateOnChange: true,
    validateOnBlur: true,
    allowOnlyLetters: true,
    "aria-label": "نام کامل",
    value: "",
    onChange: () => {},
  },
  render: (args) => {
    const [value, setValue] = useState("");
    const validationRules = [
      { rule: (val: string) => val.length >= 3, message: "حداقل ۳ کاراکتر وارد کنید" },
      {
        rule: (val: string) => /^[a-zA-Z\u0600-\u06FF\s]+$/.test(val),
        message: "فقط حروف مجاز است",
      },
    ];

    return (
      <div style={{ width: "400px" }}>
        <TextField
          {...args}
          value={value}
          onChange={setValue}
          validationRules={validationRules}
          onFocus={() => console.log("Focused")}
          onBlur={() => console.log("Blurred")}
          startIcon={<span>👤</span>}
          endIcon={<span>✓</span>}
          iconClick={() => console.log("Icon clicked")}
        />
      </div>
    );
  },
};

// Different sizes
export const Sizes: Story = {
  args: {
    type: "text",
    label: "اندازه",
    id: "size-demo",
    placeholder: "اندازه مختلف",
    value: "",
    onChange: () => {},
  },
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px", width: "300px" }}>
      <TextField {...args} label="کوچک" id="small" size="sm" placeholder="اندازه کوچک" />
      <TextField {...args} label="متوسط" id="medium" size="md" placeholder="اندازه متوسط" />
      <TextField {...args} label="بزرگ" id="large" size="lg" placeholder="اندازه بزرگ" />
    </div>
  ),
};

// Different variants
export const Variants: Story = {
  args: {
    type: "text",
    label: "نوع نمایش",
    id: "variant-demo",
    placeholder: "نوع نمایش مختلف",
    value: "",
    onChange: () => {},
  },
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px", width: "300px" }}>
      <TextField
        {...args}
        label="Outlined"
        id="outlined"
        variant="outlined"
        placeholder="Outlined variant"
      />
      <TextField
        {...args}
        label="Filled"
        id="filled"
        variant="filled"
        placeholder="Filled variant"
      />
      <TextField
        {...args}
        label="Standard"
        id="standard"
        variant="standard"
        placeholder="Standard variant"
      />
    </div>
  ),
};

// Different colors
export const Colors: Story = {
  args: {
    type: "text",
    label: "رنگ",
    id: "color-demo",
    placeholder: "رنگ‌های مختلف",
    value: "",
    onChange: () => {},
  },
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px", width: "300px" }}>
      <TextField
        {...args}
        label="Primary"
        id="primary"
        color="primary"
        placeholder="Primary color"
      />
      <TextField
        {...args}
        label="Secondary"
        id="secondary"
        color="secondary"
        placeholder="Secondary color"
      />
      <TextField
        {...args}
        label="Error"
        id="error"
        color="error"
        placeholder="Error color"
        errorMessage="این فیلد اجباری است"
      />
      <TextField
        {...args}
        label="Warning"
        id="warning"
        color="warning"
        placeholder="Warning color"
      />
      <TextField
        {...args}
        label="Success"
        id="success"
        color="success"
        placeholder="Success color"
        successMessage="موفقیت‌آمیز"
      />
    </div>
  ),
};

// With validation
export const WithValidation: Story = {
  args: {
    type: "text",
    label: "کد ملی",
    id: "national-id",
    placeholder: "کد ملی خود را وارد کنید",
    required: true,
    maxLength: 10,
    minLength: 10,
    pattern: "[0-9]{10}",
    validateOnChange: true,
    allowOnlyNumbers: true,
    value: "",
    onChange: () => {},
  },
  render: (args) => {
    const [value, setValue] = useState("");
    const validationRules = [
      { rule: (val: string) => val.length >= 5, message: "حداقل ۵ کاراکتر" },
      { rule: (val: string) => /^[a-zA-Z0-9]+$/.test(val), message: "فقط حروف و اعداد" },
    ];

    return (
      <div style={{ width: "400px" }}>
        <TextField
          {...args}
          value={value}
          onChange={setValue}
          validationRules={validationRules}
          errorMessage={value.length > 0 && value.length < 10 ? "کد ملی باید ۱۰ رقم باشد" : ""}
        />
      </div>
    );
  },
};

// With formatting
export const WithFormatting: Story = {
  args: {
    type: "tel",
    label: "شماره تلفن",
    id: "phone",
    placeholder: "شماره تلفن خود را وارد کنید",
    allowOnlyNumbers: true,
    value: "",
    onChange: () => {},
  },
  render: (args) => {
    const [value, setValue] = useState("");

    const formatter = (val: string) => {
      // Format as phone number
      const cleaned = val.replace(/\D/g, "");
      const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
      if (match) {
        return [match[1], match[2], match[3]].filter(Boolean).join("-");
      }
      return cleaned;
    };

    return (
      <div style={{ width: "400px" }}>
        <TextField
          {...args}
          value={value}
          onChange={setValue}
          formatter={formatter}
          startIcon={<span>📞</span>}
        />
      </div>
    );
  },
};

// States
export const States: Story = {
  args: {
    type: "text",
    label: "حالت",
    id: "state-demo",
    placeholder: "حالت‌های مختلف",
    value: "",
    onChange: () => {},
  },
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px", width: "300px" }}>
      <TextField {...args} label="عادی" id="normal" value="مقدار عادی" placeholder="حالت عادی" />
      <TextField
        {...args}
        label="غیرفعال"
        id="disabled"
        value="مقدار غیرفعال"
        disabled
        placeholder="حالت غیرفعال"
      />
      <TextField
        {...args}
        label="فقط خواندنی"
        id="readonly"
        value="مقدار فقط خواندنی"
        readOnly
        placeholder="حالت فقط خواندنی"
      />
      <TextField
        {...args}
        label="اجباری"
        id="required"
        value=""
        required
        placeholder="فیلد اجباری"
      />
    </div>
  ),
};
