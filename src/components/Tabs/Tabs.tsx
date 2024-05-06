import React from "react";
import "./style.css";

type TabsPropsType = {
  tabTitles: string[];
  selectedTab: number;
  setSelectedTab: (tabNumber: number) => void;
};

const Tabs: React.FC<TabsPropsType> = ({
  tabTitles,
  selectedTab,
  setSelectedTab,
}) => {
  return (
    <div className="tabs-container">
      <div className="tabs-body">
        {tabTitles.map((tab: string, index: number) => (
          <p
            className={`tab ${selectedTab === index ? "active" : ""}`}
            key={index}
            onClick={() => setSelectedTab(index)}
          >
            {tab}
          </p>
        ))}
      </div>
      <div className="tabs-border"></div>
    </div>
  );
};

export default Tabs;
