import type { Meta, StoryObj } from "@storybook/react";
import Button from "./Modal";
import React from "react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "sep-panel-ui/Modal",
  component: Button,
  //   parameters: {
  //     // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
  //     layout: 'centered',
  //   },
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
    cancelButtonLabel: "بستن",
    showModal: true,
    // onSubmit: onSubmitFunction,
  },
};
