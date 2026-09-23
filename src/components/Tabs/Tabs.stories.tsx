import type { Meta, StoryObj } from "@storybook/react-webpack5";
import React, { useState } from "react";
import Tabs from "./Tabs";

const meta: Meta<typeof Tabs> = {
  title: "Components/Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const basic: Story = {
  args: {
    tabTitles: ["تب یک", "تب دو", "تب سه"],
    selectedTab: 0,
    setSelectedTab: () => console.log("tab click"),
  },
};

export const Persian: Story = {
  render: () => {
    const [selectedTab, setSelectedTab] = useState(0);
    return (
      <div style={{ width: "500px" }}>
        <Tabs
          tabTitles={["عمومی", "جزئیات", "تنظیمات", "پیشرفته"]}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
        <div style={{ padding: "16px 0", fontSize: "14px", color: "#42526e" }}>
          تب فعال شماره {selectedTab + 1}
        </div>
      </div>
    );
  },
};

export const English: Story = {
  render: () => {
    const [selectedTab, setSelectedTab] = useState(0);
    return (
      <div style={{ width: "500px" }}>
        <Tabs
          tabTitles={["General", "Details", "Settings"]}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
        <div style={{ padding: "16px 0", fontSize: "14px", color: "#42526e" }}>
          Active tab: {selectedTab + 1}
        </div>
      </div>
    );
  },
};

export const lastTabSelected: Story = {
  render: () => {
    const [selectedTab, setSelectedTab] = useState(3);
    return (
      <div style={{ width: "500px" }}>
        <Tabs
          tabTitles={["عمومی", "جزئیات", "تنظیمات", "پیشرفته"]}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
      </div>
    );
  },
};