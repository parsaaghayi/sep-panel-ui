import React from "react";
import { render } from "@testing-library/react";
import Tabs from "./Tabs";

describe("Tabs", () => {
  test("render the Tabs component", () => {
    render(
      <Tabs
        tabTitles={["tab1", "tab2", "tab3", "tab4"]}
        selectedTab={2}
        setSelectedTab={(tabNumber: number) => console.log("hello")}
      />
    );
  });
});
