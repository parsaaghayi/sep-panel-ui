import type { Meta, StoryObj } from "@storybook/react";
import Avatar from "./Avatar";

const meta = {
  title: "sep-panel-ui/Avatar",
  component: Avatar,
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const icon: Story = {
  args: {
  },
};

export const pic: Story = {
  args: {
    picUrl: "https://www.safirstores.com/_next/image?url=https%3A%2F%2Fwww.safirstores.com%2Fimage%2Fnew%20banner%20toofan%2F430%20x%20360%20%20real-min3.jpg&w=640&q=75",
  },
};
