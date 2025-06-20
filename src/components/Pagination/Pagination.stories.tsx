import type { Meta, StoryObj } from "@storybook/react";
import Paginatin from "./Pagination";

const meta = {
  title: "sep-panel-ui/Pagination",
  component: Paginatin,
} satisfies Meta<typeof Paginatin>;

export default meta;
type Story = StoryObj<typeof meta>;

export const test: Story = {
  args: {
    currentPage: 177,
    totalPage: 270,
    setPageNumber: (pageNumber: number) => console.log("hello"),
    direction: "rtl"
  },
};
