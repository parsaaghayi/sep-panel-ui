import React from "react";
import { render } from "@testing-library/react";
import Button from "./Button";

describe("Button", () => {
  test("render the Button component", () => {
    render(<Button label="This is a test button" colorType="base" />);
  });
});
