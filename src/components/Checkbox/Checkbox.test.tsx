import React from "react";
import { render } from "@testing-library/react";
import Checkbox from "./Checkbox";

describe("Checkbox", () => {
  test("render the Checkbox component", () => {
    render(
      <Checkbox
        checked={true}
        id="test"
        onChange={() => console.log("changed")}
      />
    );
  });
});
