import React, { useState } from "react";
import { render } from "@testing-library/react";
import DropDownMenu from "./DropDownMenu";

const DropDownMenuHost = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <DropDownMenu
      label="عنوان دکمه"
      isOpen={isOpen}
      openningDirection="right"
      setIsOpen={setIsOpen}
    >
      <ul>
        <li>avali</li>
        <li>dovomi</li>
        <li>sevvomi</li>
      </ul>
    </DropDownMenu>
  );
};

describe("DropDownMenu", () => {
  test("render the DropDownMenu component", () => {
    render(<DropDownMenuHost />);
  });
});