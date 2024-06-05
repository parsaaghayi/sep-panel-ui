import React, { useState } from "react";
import { render } from "@testing-library/react";
import TextField from "./TextField";
const [testText, settestText] = useState("");

describe("TextField", () => {
  test("render the TextField component", () => {
    render(
      <TextField
        type="text"
        label="label"
        id="id"
        name="name"
        value={testText}
        onChange={settestText}
      />
    );
  });
});
