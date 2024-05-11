import React from "react";
import { render } from "@testing-library/react";
import TextField from "./TextField";

describe("TextField", () => {
  test("render the TextField component", () => {
    render(<TextField type="text" label="label" id="id" name="name" />);
  });
});
