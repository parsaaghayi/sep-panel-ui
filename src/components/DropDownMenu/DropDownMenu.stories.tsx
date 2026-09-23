import type { Meta, StoryObj } from "@storybook/react-webpack5";
import React, { useState } from "react";
import DropDownMenu from "./DropDownMenu";

const meta: Meta<typeof DropDownMenu> = {
  title: "Components/DropDownMenu",
  component: DropDownMenu,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    openningDirection: {
      control: { type: "select" },
      options: ["start", "end"],
    },
    disabled: {
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const menuItems = (
  <ul style={{ listStyle: "none", margin: 0, padding: "8px", fontSize: "14px" }}>
    <li style={{ padding: "8px" }}>گزینه اول</li>
    <li style={{ padding: "8px" }}>گزینه دوم</li>
    <li style={{ padding: "8px" }}>گزینه سوم</li>
    <li style={{ padding: "8px" }}>گزینه چهارم</li>
    <li style={{ padding: "8px" }}>گزینه پنجم</li>
  </ul>
);

function Demo() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <DropDownMenu
      label="منوی کشویی"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      openningDirection="end"
    >
      {menuItems}
    </DropDownMenu>
  );
}

export const openToEnd: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true);
    return (
      <DropDownMenu label="title" isOpen={isOpen} setIsOpen={setIsOpen} openningDirection="end">
        {menuItems}
      </DropDownMenu>
    );
  },
};

export const openToStart: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true);
    return (
      <DropDownMenu label="title" isOpen={isOpen} setIsOpen={setIsOpen} openningDirection="start">
        {menuItems}
      </DropDownMenu>
    );
  },
};

export const disabled: Story = {
  args: {
    label: "title",
    isOpen: false,
    openningDirection: "end",
    disabled: true,
    children: menuItems,
    setIsOpen: () => {},
  },
};

export const interactive: Story = {
  render: () => <Demo />,
};