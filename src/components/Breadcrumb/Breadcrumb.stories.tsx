import type { Meta, StoryObj } from "@storybook/react";
import Breadcrumb from "./Breadcrumb";
import React from "react";

const meta = {
  title: "sep-panel-ui/Breadcrumb",
  component: Breadcrumb,
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const test: Story = {
  args: {
    titles: [
      "avali",
      "dovomi",
      <a href="http:///google.com">akhari</a>,
      "chaharomi",
      <a href="#">panjomiam link gozashtam eshq koni</a>,
      "shishomi",
      "haftomi",
    ],
  },
};
