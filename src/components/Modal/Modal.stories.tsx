import type { Meta, StoryObj } from "@storybook/react";
import Button from "./Modal";
import React from "react";

const meta = {
  title: "sep-panel-ui/Modal",
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

function onSubmitFunction() {
  console.log("this is modal onSubmit function");
}

export const base: Story = {
  args: {
    title: "base modal",
    children: <p>base modal description</p>,
    submitButtonLabel: "submit",
    cancelButtonLabel: "cancel",
    showModal: true,
    onSubmit: onSubmitFunction,
  },
};
export const warning: Story = {
  args: {
    title: "warning modal",
    type: "warning",
    children: <p>warning modal description</p>,
    submitButtonLabel: "submit",
    onClickOutClose: false,
    showModal: true,
    onSubmit: onSubmitFunction,
  },
};
export const danger: Story = {
  args: {
    title: "danger modal",
    type: "danger",
    children: <p>danger modal description</p>,
    // submitButtonLabel: "submit",
    // cancelButtonLabel: "بستن",
    // onClickOutClose: false,
    showModal: true,
    // onSubmit: onSubmitFunction,
  },
};
