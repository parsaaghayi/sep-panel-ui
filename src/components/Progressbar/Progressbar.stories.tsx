import type { Meta, StoryObj } from "@storybook/react";
import Progressbar from "./Progressbar";

const meta = {
  title: "sep-panel-ui/Progressbar",
  component: Progressbar,
} satisfies Meta<typeof Progressbar>;

export default meta;
type Story = StoryObj<typeof meta>;
export const base: Story = {
  args: {
    filled: 37,
  },
};

export const success: Story = {
  args: {
    filled: 100,
  },
};
