import type { Meta, StoryObj } from "@storybook/react-webpack5";
import React from "react";
import Progressbar from "./Progressbar";

const meta: Meta<typeof Progressbar> = {
  title: "Components/Progressbar",
  component: Progressbar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    filled: {
      control: { type: "range", min: 0, max: 100 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const empty: Story = {
  args: {
    filled: 0,
  },
};

export const quarter: Story = {
  args: {
    filled: 25,
  },
};

export const half: Story = {
  args: {
    filled: 50,
  },
};

export const threeQuarter: Story = {
  args: {
    filled: 75,
  },
};

export const complete: Story = {
  args: {
    filled: 100,
  },
};