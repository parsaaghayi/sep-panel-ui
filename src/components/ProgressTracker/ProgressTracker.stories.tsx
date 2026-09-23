import type { Meta, StoryObj } from "@storybook/react-webpack5";
import React, { useState } from "react";
import ProgressTracker from "./ProgressTracker";

const meta: Meta<typeof ProgressTracker> = {
  title: "Components/ProgressTracker",
  component: ProgressTracker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    direction: {
      control: { type: "select" },
      options: ["rtl", "ltr"],
    },
    activeStep: {
      control: { type: "number" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const stepTitles = ["ثبت اطلاعات", "پرداخت", "تأیید نهایی", "اتمام"];

export const ltr: Story = {
  args: {
    direction: "ltr",
    stepTitles,
    activeStep: 0,
  },
};

export const rtl: Story = {
  args: {
    direction: "rtl",
    stepTitles,
    activeStep: 0,
  },
};

export const middleStep: Story = {
  args: {
    direction: "rtl",
    stepTitles,
    activeStep: 2,
  },
};

export const lastStep: Story = {
  args: {
    direction: "rtl",
    stepTitles,
    activeStep: 3,
  },
};

export const interactive: Story = {
  render: () => {
    const [activeStep, setActiveStep] = useState(1);
    return (
      <div style={{ width: "600px", display: "flex", flexDirection: "column", gap: "16px" }}>
        <ProgressTracker direction="rtl" stepTitles={stepTitles} activeStep={activeStep} />
        <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
          <button type="button" onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}>
            قبلی
          </button>
          <button
            type="button"
            onClick={() => setActiveStep((prev) => Math.min(stepTitles.length - 1, prev + 1))}
          >
            بعدی
          </button>
        </div>
      </div>
    );
  },
};