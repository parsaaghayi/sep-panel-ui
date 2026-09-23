import type { Meta, StoryObj } from "@storybook/react-webpack5";
import React from "react";
import Avatar from "./Avatar";

const meta: Meta<typeof Avatar> = {
  title: "Components/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const icon: Story = {
  render: () => <Avatar />,
};

export const pic: Story = {
  args: {
    picUrl:
      "https://www.safirstores.com/_next/image?url=https%3A%2F%2Fwww.safirstores.com%2Fimage%2Fnew%20banner%20toofan%2F430%20x%20360%20%20real-min3.jpg&w=640&q=75",
  },
};

export const customClass: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "center" }}>
      <Avatar className="extra-class" />
      <span style={{ fontSize: "12px", color: "#666" }}>className اضافی</span>
    </div>
  ),
};