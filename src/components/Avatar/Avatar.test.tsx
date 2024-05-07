import React from "react";
import { render } from "@testing-library/react";
import Avatar from "./Avatar";

describe("Avatar", () => {
  test("render the Avatar component", () => {
    render(<Avatar />);
  });
});
