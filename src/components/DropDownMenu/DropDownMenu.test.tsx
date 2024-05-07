import React, { useState } from "react";
import { render } from "@testing-library/react";
import DropDownMenu from "./DropDownMenu";

describe("DropDownMenu", () => {
  test("render the DropDownMenu component", () => {
    const [isOpenState, setisOpenState] = useState(false);
    render(
      <DropDownMenu
        label="عنوان دکمه"
        isOpen={isOpenState}
        setIsOpen={setisOpenState}
      >
        <ul>
          <li>avali</li>
          <li>dovomi</li>
          <li>avali</li>
          <li>dovomi</li>
          <li>avali</li>
          <li>dovomi</li>
          <li>avali</li>
          <li>dovomi</li>
          <li>avali</li>
          <li>dovomi</li>
          <li>avali</li>
          <li>dovomi</li>
          <li>avali</li>
          <li>dovomi</li>
          <li>avali</li>
          <li>dovomi</li>
          <li>avali</li>
          <li>dovomi</li>
        </ul>
      </DropDownMenu>
    );
  });
});
