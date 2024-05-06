import React from "react";
import { render } from "@testing-library/react";
import Toggle from "./Toggle";

describe("Toggle", () => {
  test("render the Toggle component", () => {
    render(
      <Toggle
        status={true}
        disabled={true}
        onChange={() => console.log("hello")}
      />
    );
  });
});
