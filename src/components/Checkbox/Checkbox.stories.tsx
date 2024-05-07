import type { Meta, StoryObj } from "@storybook/react";
import Checkbox from "./Checkbox";

const meta = {
  title: "sep-panel-ui/Checkbox",
  component: Checkbox,
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const base: Story = {
  args: {
    id: "base",
    checked: true,
    label: "عنوان",
    required: true,
    onChange: () => console.log("changed"),
  },
};
export const disabled: Story = {
  args: {
    id: "disabled",
    disabled: true,
    label: "عنوان",
    checked: true,
    onChange: () => console.log("changed"),
  },
};
