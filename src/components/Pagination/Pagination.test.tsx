import React from "react";
import { render } from "@testing-library/react";
import Pagination from "./Pagination";

describe("Pagination", () => {
  test("render the Pagination component", () => {
    render(
      <Pagination
        currentPage={1}
        totalPage={27}
        setPageNumber={(pageNumber: number) => console.log("hello")}
      />
    );
  });
});
