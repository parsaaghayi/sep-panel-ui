import React, { useState } from "react";
import { render } from "@testing-library/react";
import Checkbox from "./Checkbox";
const [checkboxState, setcheckboxState] = useState(false);

describe("Checkbox", () => {
  test("render the Checkbox component", () => {
    render(
      <Checkbox checked={checkboxState} id="test" onChange={setcheckboxState} />
    );
  });
});
