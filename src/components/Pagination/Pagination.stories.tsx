import type { Meta, StoryObj } from "@storybook/react";
import Button from "./Pagination";

const meta = {
  title: "sep-panel-ui/Pagination",
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const test: Story = {
  args: {
    currentPage: 1,
    totalPage: 27,
    setPageNumber: (pageNumber: number) => console.log("hello"),
  },
};
