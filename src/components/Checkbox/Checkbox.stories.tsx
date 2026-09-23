import type { Meta, StoryObj } from "@storybook/react-webpack5";
import React, { useState } from "react";
import Checkbox from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    checked: {
      control: { type: "boolean" },
    },
    disabled: {
      control: { type: "boolean" },
    },
    required: {
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const unchecked: Story = {
  args: {
    id: "checkbox-1",
    label: "موافقم",
    checked: false,
    onChange: () => console.log("change"),
  },
};

export const checked: Story = {
  args: {
    id: "checkbox-2",
    label: "توافق نامه خوانده شده",
    checked: true,
    onChange: () => console.log("change"),
  },
};

export const required: Story = {
  args: {
    id: "checkbox-3",
    label: "شرایط را می‌پذیرم",
    checked: false,
    required: true,
    onChange: () => console.log("change"),
  },
};

export const disabled: Story = {
  args: {
    id: "checkbox-4",
    label: "غیرفعال",
    checked: true,
    disabled: true,
    onChange: () => console.log("change"),
  },
};

export const interactive: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <Checkbox id="checkbox-interactive" label="کلیک کنید" checked={checked} onChange={setChecked} />
    );
  },
};