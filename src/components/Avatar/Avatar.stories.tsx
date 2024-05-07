import type { Meta, StoryObj } from "@storybook/react";
import Avatar from "./Avatar";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "sep-panel-ui/Avatar",
  component: Avatar,
  //   parameters: {
  //     // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
  //     layout: 'centered',
  //   },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

function onClickFunction() {
  console.log("this is Avatar onClick function");
}

export const icon: Story = {
  args: {
  },
};

export const pic: Story = {
  args: {
    picUrl: "https://www.safirstores.com/_next/image?url=https%3A%2F%2Fwww.safirstores.com%2Fimage%2Fnew%20banner%20toofan%2F430%20x%20360%20%20real-min3.jpg&w=640&q=75",
  },
};
