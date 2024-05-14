import React from "react";
import { render } from "@testing-library/react";
import Radio from "./RadioGroup";

describe("Radio", () => {
  test("render the Radio component", () => {
    render(
      <Radio
        checked={true}
        name="test"
        id="test"
        onChange={() => console.log("changed")}
      />
    );
  });
});
