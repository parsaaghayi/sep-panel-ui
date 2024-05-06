import React from "react";
import { render } from "@testing-library/react";
import Button from "./Modal";

describe("Button", () => {
  test("render the Button component", () => {
    render(<Button label="This is a test button" type="base" />);
  });
});
