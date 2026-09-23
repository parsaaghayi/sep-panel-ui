import type { Meta, StoryObj } from "@storybook/react-webpack5";
import React, { useState } from "react";
import RadioGroup from "./RadioGroup";

const meta: Meta<typeof RadioGroup> = {
  title: "Components/RadioGroup",
  component: RadioGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    flexDirection: {
      control: { type: "select" },
      options: ["column", "row"],
    },
    required: {
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const columnPersian: Story = {
  render: () => {
    const [value, setValue] = useState("option1");
    return (
      <RadioGroup
        title="روش پرداخت"
        flexDirection="column"
        name="payment"
        selectedOptionValue={value}
        onChange={setValue}
        options={[
          { label: "درگاه پرداخت", value: "option1", id: "radio-1" },
          { label: "کارت به کارت", value: "option2", id: "radio-2" },
          { label: "پرداخت در محل", value: "option3", id: "radio-3", disabled: true },
        ]}
      />
    );
  },
};

export const rowEnglish: Story = {
  render: () => {
    const [value, setValue] = useState("a");
    return (
      <RadioGroup
        flexDirection="row"
        name="size"
        selectedOptionValue={value}
        onChange={setValue}
        options={[
          { label: "Small", value: "a", id: "row-a" },
          { label: "Medium", value: "b", id: "row-b" },
          { label: "Large", value: "c", id: "row-c", disabled: true },
        ]}
      />
    );
  },
};

export const required: Story = {
  render: () => {
    const [value, setValue] = useState("x");
    return (
      <RadioGroup
        title="سؤال اجباری"
        required
        flexDirection="column"
        name="required-radio"
        selectedOptionValue={value}
        onChange={setValue}
        options={[
          { label: "بله", value: "x", id: "req-1" },
          { label: "خیر", value: "y", id: "req-2" },
        ]}
      />
    );
  },
};

export const withoutTitle: Story = {
  args: {
    flexDirection: "column",
    name: "plain",
    selectedOptionValue: "1",
    options: [
      { label: "گزینه اول", value: "1", id: "plain-1" },
      { label: "گزینه دوم", value: "2", id: "plain-2" },
    ],
    onChange: (value) => console.log(value),
  },
};