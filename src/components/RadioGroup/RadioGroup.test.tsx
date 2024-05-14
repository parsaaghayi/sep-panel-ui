import React from "react";
import { render } from "@testing-library/react";
import RadioGroup from "./RadioGroup";

describe("RadioGroup", () => {
  test("render the RadioGroup component", () => {
    render(
      <RadioGroup
        title="test radio group"
        options={[
          {
            label: "label 1",
            value: "label1",
            id: "label1",
          },
          {
            label: "label 2",
            value: "label2",
            id: "label2",
            disabled: true,
          },
          {
            label: "label 3",
            value: 3,
            id: "label3",
          },
          {
            label: "label 4",
            value: 4,
            id: "label4",
          },
          {
            label: "label 5",
            value: 5,
            id: "label5",
          },
          {
            label: "label 6",
            value: 6,
            id: "label6",
          },
          {
            label: "label 7",
            value: 7,
            id: "label7",
          },
          {
            label: "label 8",
            value: 8,
            id: "label8",
          },
          {
            label: "label 9",
            value: 9,
            id: "label9",
          },
          {
            label: "label 10",
            value: 10,
            id: "label10",
          },
        ]}
        selectedOptionValue="label1"
        name="test"
        required={true}
        onChange={(value) => console.log(value)}
      />
    );
  });
});
