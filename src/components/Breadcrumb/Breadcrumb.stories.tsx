import type { Meta, StoryObj } from "@storybook/react-webpack5";
import React from "react";
import Breadcrumb from "./Breadcrumb";

const meta: Meta<typeof Breadcrumb> = {
  title: "Components/Breadcrumb",
  component: Breadcrumb,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const basic: Story = {
  render: () => <Breadcrumb titles={["خانه", "محصولات", "دسته‌بندی"]} />,
};

export const withLinks: Story = {
  render: () => (
    <Breadcrumb
      titles={[
        "خانه",
        <a href="#" key="products">محصولات</a>,
        <a href="#" key="category">دسته‌بندی</a>,
        "جزئیات",
      ]}
    />
  ),
};

export const singleItem: Story = {
  render: () => <Breadcrumb titles={["صفحه اصلی"]} />,
};

export const manyItems: Story = {
  render: () => (
    <Breadcrumb
      titles={["خانه", "فروشگاه", "موبایل", "گوشی", "سامسونگ", "Galaxy S24"]}
    />
  ),
};

export const customClass: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Breadcrumb titles={["خانه", "محصولات"]} className="custom-extra-class" />
      <p style={{ fontSize: "12px", color: "#666" }}>className اضافی به container اضافه می‌شود</p>
    </div>
  ),
};