import type { Meta, StoryObj } from "@storybook/react";
import Tabs from "./Tabs";

const meta = {
  title: "sep-panel-ui/Tabs",
  component: Tabs,
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const test: Story = {
  args: {
    tabTitles: ["tab1", "tab2", "tab3", "tab4"],
    selectedTab: 2,
    setSelectedTab: (tabNumber: number) => console.log("hello"),
  },
};
