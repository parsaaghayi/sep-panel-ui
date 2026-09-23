import type { Meta, StoryObj } from "@storybook/react-webpack5";
import React, { useState } from "react";
import SelectInput from "./SelectInput";

const meta: Meta<typeof SelectInput> = {
  title: "Components/SelectInput",
  component: SelectInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    dropdownPosition: {
      control: { type: "select" },
      options: ["auto", "bottom", "bottom-start", "bottom-end", "top", "top-start", "top-end"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const menuItems = [
  { label: "گزینه ۱", value: 1 },
  { label: "گزینه ۲", value: 2 },
  { label: "گزینه ۳", value: 3 },
  { label: "گزینه ۴", value: 4 },
  { label: "گزینه ۵", value: 5 },
];

export const basic: Story = {
  render: () => {
    const [selectedOption, setSelectedOption] = useState(null);
    return (
      <div style={{ width: "300px" }}>
        <SelectInput
          label="انتخاب"
          placeHolder="یک گزینه را انتخاب کنید"
          menuItems={menuItems}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          onChange={(option) => console.log("select", option)}
        />
      </div>
    );
  },
};

export const withLabel: Story = {
  render: () => {
    const [selectedOption, setSelectedOption] = useState(null);
    return (
      <div style={{ width: "300px" }}>
        <SelectInput
          label="دسته‌بندی"
          required
          placeHolder="انتخاب دسته‌بندی"
          menuItems={menuItems}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          onChange={(option) => console.log("select", option)}
        />
      </div>
    );
  },
};

export const withoutLabel: Story = {
  render: () => {
    const [selectedOption, setSelectedOption] = useState(null);
    return (
      <div style={{ width: "300px" }}>
        <SelectInput
          placeHolder="بدون برچسب"
          menuItems={menuItems}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          onChange={(option) => console.log("select", option)}
        />
      </div>
    );
  },
};

export const disabled: Story = {
  render: () => {
    const [selectedOption, setSelectedOption] = useState(null);
    return (
      <div style={{ width: "300px" }}>
        <SelectInput
          label="غیرفعال"
          disabled
          placeHolder="غیرقابل انتخاب"
          menuItems={menuItems}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          onChange={(option) => console.log("select", option)}
        />
      </div>
    );
  },
};

export const selectedValue: Story = {
  render: () => {
    const [selectedOption, setSelectedOption] = useState({ label: "گزینه ۲", value: 2 });
    return (
      <div style={{ width: "300px" }}>
        <SelectInput
          label="انتخاب شده"
          placeHolder="یک گزینه را انتخاب کنید"
          menuItems={menuItems}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          onChange={(option) => console.log("select", option)}
        />
      </div>
    );
  },
};

export const dropdownPositions: Story = {
  render: () => {
    const [selectedOption, setSelectedOption] = useState(null);
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "120px",
          width: "300px",
          padding: "60px 0",
        }}
      >
        <SelectInput
          label="بالای فیلد (top-start)"
          dropdownPosition="top-start"
          placeHolder="مکان منو"
          menuItems={menuItems}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          onChange={(option) => console.log("select", option)}
        />
        <SelectInput
          label="پایین فیلد (bottom-start)"
          dropdownPosition="bottom-start"
          placeHolder="مکان منو"
          menuItems={menuItems}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          onChange={(option) => console.log("select", option)}
        />
      </div>
    );
  },
};

export const withIcon: Story = {
  render: () => {
    const [selectedOption, setSelectedOption] = useState(null);
    return (
      <div style={{ width: "300px" }}>
        <SelectInput
          label="با آیکون"
          iconSrc="/src/images/search.svg"
          placeHolder="جستجو"
          menuItems={menuItems}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          onChange={(option) => console.log("select", option)}
        />
      </div>
    );
  },
};