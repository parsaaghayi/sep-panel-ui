import type { Meta, StoryObj } from "@storybook/react-webpack5";
import React, { useState } from "react";
import Toggle from "./Toggle";

const meta: Meta<typeof Toggle> = {
  title: "Components/Toggle",
  component: Toggle,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    status: {
      control: { type: "boolean" },
      description: "وضعیت روشن/خاموش سوییچ",
    },
    disabled: {
      control: { type: "boolean" },
      description: "غیرفعال کردن سوییچ",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const off: Story = {
  render: () => <Toggle status={false} onChange={() => {}} />,
};

export const on: Story = {
  args: {
    status: true,
    onChange: () => console.log("toggle"),
  },
};

export const disabledOff: Story = {
  args: {
    status: false,
    disabled: true,
    onChange: () => console.log("toggle"),
  },
};

export const disabledOn: Story = {
  args: {
    status: true,
    disabled: true,
    onChange: () => console.log("toggle"),
  },
};

export const interactive: Story = {
  render: () => {
    const [status, setStatus] = useState(false);
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "center" }}>
        <Toggle status={status} onChange={() => setStatus((prev) => !prev)} />
        <span style={{ fontSize: "14px" }}>{status ? "روشن" : "خاموش"}</span>
      </div>
    );
  },
};