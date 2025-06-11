import React from "react";
import { render } from "@testing-library/react";
import ProgressTracker from "./ProgressTracker";

describe("ProgressTracker", () => {
  test("render the ProgressTracker component", () => {
    render(
      <ProgressTracker
        direction="ltr"
        stepTitles={["step 1", "step 2", "step 3", "step 4", "step 5"]}
        activeStep={1}
      />
    );
  });
});
