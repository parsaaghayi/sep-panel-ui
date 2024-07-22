import type { Meta, StoryObj } from "@storybook/react";
import TextField from "./TextField";

const meta = {
  title: "sep-panel-ui/TextField",
  component: TextField,
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const test: Story = {
  args: {
    type: "text",
    label: "label",
    id: "id",
    name: "name",
    value: "test",
    onChange: () => {
      console.log("test");
    },
    placeholder: "چیزی بنویسید...",
    // direction: "ltr",
    // firstIconSrc: "string",
    // lastIconSrc: "string",
    guidMessage: "پیغام راهنما",
    // successMessage: "پیغام موفقیت",
    // errorMessage: "پیغام خطا",
  },
};
