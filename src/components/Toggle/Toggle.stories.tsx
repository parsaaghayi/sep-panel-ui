import type { Meta, StoryObj } from "@storybook/react-webpack5";
import Toggle from "./Toggle";

const meta = {
  title: "sep-panel-ui/Toggle",
  component: Toggle,
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const test: Story = {
  args: {
    status: true,
    disabled: true,
    onChange: () => console.log("hello"),
  },
};
