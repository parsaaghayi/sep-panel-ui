import React from "react";
import { render } from "@testing-library/react";
import Breadcrumb from "./Breadcrumb";

describe("Breadcrumb", () => {
  test("render the Breadcrumb component", () => {
    render(<Breadcrumb titles={["1", <p>salam</p>]} />);
  });
});
