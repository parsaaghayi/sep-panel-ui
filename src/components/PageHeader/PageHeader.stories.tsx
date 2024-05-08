import type { Meta, StoryObj } from "@storybook/react";
import PageHeader from "./PageHeader";
import React from "react";
import Button from "../Button";

const meta = {
  title: "sep-panel-ui/PageHeader",
  component: PageHeader,
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const test: Story = {
  args: {
    breadcrumbTitles: [
      "avali",
      "dovomi",
      <a href="http:///google.com">akhari</a>,
      "chaharomi",
      <a href="#">panjomiam link gozashtam eshq koni</a>,
      "shishomi",
      "haftomi",
    ],
    title: "عنوان صفحه",
    buttons: [
      <Button type="primary" label={"عنوان دکمه اول"} />,
      <Button label={"عنوان دکمه دوم"} />,
      <Button label="" hasMore={true} />,
    ],
    children: <p>filterha</p>,
  },
};
