import type { Meta, StoryObj } from "@storybook/react-webpack5";
import React, { useState } from "react";
import Pagination from "./Pagination";

const meta: Meta<typeof Pagination> = {
  title: "Components/Pagination",
  component: Pagination,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    direction: {
      control: { type: "select" },
      options: ["rtl", "ltr"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Persian: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(3);
    return <Pagination currentPage={currentPage} totalPage={10} setPageNumber={setCurrentPage} direction="rtl" />;
  },
};

export const English: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);
    return <Pagination currentPage={currentPage} totalPage={8} setPageNumber={setCurrentPage} direction="ltr" />;
  },
};

export const firstPage: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);
    return <Pagination currentPage={currentPage} totalPage={20} setPageNumber={setCurrentPage} direction="rtl" />;
  },
};

export const lastPage: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(20);
    return <Pagination currentPage={currentPage} totalPage={20} setPageNumber={setCurrentPage} direction="rtl" />;
  },
};

export const middlePage: Story = {
  args: {
    currentPage: 10,
    totalPage: 20,
    direction: "rtl",
    setPageNumber: (page) => console.log("page", page),
  },
};

export const singlePage: Story = {
  args: {
    currentPage: 1,
    totalPage: 1,
    direction: "rtl",
    setPageNumber: (page) => console.log("page", page),
  },
};

export const manyPages: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(50);
    return <Pagination currentPage={currentPage} totalPage={100} setPageNumber={setCurrentPage} direction="ltr" />;
  },
};