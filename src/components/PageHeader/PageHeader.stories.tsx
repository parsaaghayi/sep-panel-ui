import type { Meta, StoryObj } from "@storybook/react-webpack5";
import React from "react";
import PageHeader from "./PageHeader";
import Button from "../Button";

const meta: Meta<typeof PageHeader> = {
  title: "Components/PageHeader",
  component: PageHeader,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const basic: Story = {
  render: () => (
    <div style={{ width: "800px", padding: "16px" }}>
      <PageHeader
        breadcrumbTitles={["خانه", "گزارش‌ها", "گزارش فروش"]}
        title="گزارش فروش"
        buttons={[
          <Button key="1" colorType="primary" label="افزودن" />,
          <Button key="2" label="خروجی اکسل" />,
        ]}
      >
        <p style={{ fontSize: "14px", color: "#5e6c84" }}>محل فیلترهای صفحه</p>
      </PageHeader>
    </div>
  ),
};

export const withoutButtons: Story = {
  render: () => (
    <div style={{ width: "800px", padding: "16px" }}>
      <PageHeader breadcrumbTitles={["خانه", "تنظیمات"]} title="تنظیمات حساب" />
    </div>
  ),
};

export const withManyActions: Story = {
  render: () => (
    <div style={{ width: "800px", padding: "16px" }}>
      <PageHeader
        breadcrumbTitles={["مدیریت", "کاربران"]}
        title="کاربران"
        buttons={[
          <Button key="1" colorType="primary" label="کاربر جدید" />,
          <Button key="2" colorType="danger" label="غیرفعال‌سازی" />,
          <Button key="3" colorType="subtle" label="تنظیمات" />,
          <Button key="4" label="" hasMore />,
        ]}
      >
        <div style={{ display: "flex", gap: "8px" }}>
          <Button label="فیلتر پیشرفته" colorType="secondary" />
        </div>
      </PageHeader>
    </div>
  ),
};