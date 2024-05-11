import React from "react";
import { render } from "@testing-library/react";
import Progressbar from "./Progressbar";

describe("Progressbar", () => {
  test("render the Progressbar component", () => {
    render(<Progressbar filled={10} />);
  });
});
