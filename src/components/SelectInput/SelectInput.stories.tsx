import type { Meta, StoryObj } from "@storybook/react";
import SelectInput from "./SelectInput";

const meta = {
  title: "sep-panel-ui/SelectInput",
  component: SelectInput,
} satisfies Meta<typeof SelectInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const withTitleRequired: Story = {
  args: {
    title: "selectInput",
    name: "test",
    required: true,
    placeHolder: "choose an option",
    // disabled: true,
    menuItems: [
      { label: "menu Item 1", value: 1 },
      { label: "menu Item 2", value: 2 },
      { label: "menu Item 3", value: 3 },
      { label: "menu Item 4", value: 4 },
      { label: "menu Item 5", value: 5 },
      { label: "menu Item 6", value: 6 },
      { label: "menu Item 7", value: 7 },
      { label: "menu Item 8", value: 8 },
      { label: "menu Item 9", value: 9 },
      { label: "menu Item 10", value: 10 },
      { label: "menu Item 11", value: 11 },
    ],
    onChange: () => console.log("hello"),
  },
};
