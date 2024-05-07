import type { Meta, StoryObj } from "@storybook/react";
import DropDownMenu from "./DropDownMenu";
import React from "react";

const meta = {
  title: "sep-panel-ui/DropDownMenu",
  component: DropDownMenu,
} satisfies Meta<typeof DropDownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const test: Story = {
  args: {
    label: "عنوان دکمه",
    isOpen: false,
    setIsOpen: () => console.log("hello"),
    children: (
      <ul>
        <li>avali</li>
        <li>dovomi</li>
        <li>avali</li>
        <li>dovomi</li>
        <li>avali</li>
        <li>dovomi</li>
        <li>avali</li>
        <li>dovomi</li>
        <li>avali</li>
        <li>dovomi</li>
        <li>avali</li>
        <li>dovomi</li>
        <li>avali</li>
        <li>dovomi</li>
        <li>avali</li>
        <li>dovomi</li>
        <li>avali</li>
        <li>dovomi</li>
      </ul>
    ),
  },
};
