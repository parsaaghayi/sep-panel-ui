import React, { useState } from "react";
import { render } from "@testing-library/react";
import Checkbox from "./Checkbox";

const CheckboxHost = () => {
  const [checked, setChecked] = useState(false);
  return <Checkbox checked={checked} id="test" onChange={setChecked} />;
};

describe("Checkbox", () => {
  test("render the Checkbox component", () => {
    render(<CheckboxHost />);
  });

  test("toggles checked state on click", () => {
    const { container } = render(<CheckboxHost />);
    const input = container.querySelector("input[type='checkbox']");
    expect(input).not.toBeChecked();
    input?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
});
