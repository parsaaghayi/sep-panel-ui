import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import RangePicker from "./RangePicker";
import { addDays, addMonths, startOfDay } from "./calendarUtils";

jest.mock("../../images/info.svg", () => "info-icon");
jest.mock("../../images/success.svg", () => "success-icon");
jest.mock("../../images/error.svg", () => "error-icon");

describe("RangePicker", () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  test("renders RangePicker with basic props", () => {
    render(
      <RangePicker id="test-range" label="بازه تاریخ" value={null} onChange={mockOnChange} />,
    );

    expect(screen.getByLabelText("بازه تاریخ")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  test("opens calendar when clicked", () => {
    render(
      <RangePicker id="test-range" label="بازه تاریخ" value={null} onChange={mockOnChange} />,
    );

    fireEvent.click(screen.getByRole("textbox"));

    expect(document.querySelector(".datePicker-calendar")).not.toBeNull();
  });

  test("shows preset buttons beside the calendar when rangePresets given", () => {
    render(
      <RangePicker
        id="test-range"
        label="بازه تاریخ"
        value={null}
        onChange={mockOnChange}
        rangePresets={[
          { label: "هفته اخیر", amount: 1, unit: "week" },
          { label: "ماه اخیر", amount: 1, unit: "month" },
        ]}
      />,
    );

    fireEvent.click(screen.getByRole("textbox"));

    expect(document.querySelector(".datePicker-dropdownRow")).not.toBeNull();
    expect(document.querySelector(".datePicker-presets")).not.toBeNull();
    expect(screen.getByRole("group", { name: "range presets" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "ماه اخیر" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "هفته اخیر" })).toBeInTheDocument();
  });

  test("does not render preset column when rangePresets is empty", () => {
    render(
      <RangePicker id="test-range" label="بازه تاریخ" value={null} onChange={mockOnChange} />,
    );

    fireEvent.click(screen.getByRole("textbox"));

    expect(document.querySelector(".datePicker-dropdownRow")).toBeNull();
    expect(document.querySelector(".datePicker-presets")).toBeNull();
  });

  test("applies presetsPosition variant class to the dropdown row", () => {
    const presets = [{ label: "ماه اخیر", amount: 1, unit: "month" as const }];
    render(
      <RangePicker
        id="test-range"
        label="بازه تاریخ"
        value={null}
        onChange={mockOnChange}
        rangePresets={presets}
        presetsPosition="bottom"
      />,
    );

    fireEvent.click(screen.getByRole("textbox"));

    const row = document.querySelector(".datePicker-dropdownRow");
    expect(row).toHaveClass("datePicker-dropdownRow-bottom");
  });

  test("uses logical start/end classes for side positions", () => {
    const presets = [{ label: "ماه اخیر", amount: 1, unit: "month" as const }];

    const { rerender } = render(
      <RangePicker
        id="test-range"
        label="بازه تاریخ"
        value={null}
        onChange={mockOnChange}
        rangePresets={presets}
        presetsPosition="start"
      />,
    );

    fireEvent.click(screen.getByRole("textbox"));
    let row = document.querySelector(".datePicker-dropdownRow");
    expect(row).toHaveClass("datePicker-dropdownRow-start");

    rerender(
      <RangePicker
        id="test-range"
        label="بازه تاریخ"
        value={null}
        onChange={mockOnChange}
        rangePresets={presets}
        presetsPosition="end"
      />,
    );

    row = document.querySelector(".datePicker-dropdownRow");
    expect(row).toHaveClass("datePicker-dropdownRow-end");
  });

  test("clicking a week preset emits today → today-minus-7-days range", () => {
    render(
      <RangePicker
        id="test-range"
        label="بازه تاریخ"
        value={null}
        onChange={mockOnChange}
        rangePresets={[{ label: "هفته اخیر", amount: 1, unit: "week" }]}
      />,
    );

    fireEvent.click(screen.getByRole("textbox"));
    const today = startOfDay(new Date());
    fireEvent.click(screen.getByRole("button", { name: "هفته اخیر" }));

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    const range = mockOnChange.mock.calls[0][0];
    expect(range.start).toBeInstanceOf(Date);
    expect(range.end).toBeInstanceOf(Date);
    expect(range.start.getTime()).toBe(addDays(today, -7).getTime());
    expect(range.end.getTime()).toBe(today.getTime());
  });

  test("clicking a month preset uses real calendar-month arithmetic", () => {
    render(
      <RangePicker
        id="test-range"
        label="بازه تاریخ"
        value={null}
        onChange={mockOnChange}
        calendar="jalali"
        locale="fa"
        direction="rtl"
        rangePresets={[{ label: "ماه اخیر", amount: 1, unit: "month" }]}
      />,
    );

    fireEvent.click(screen.getByRole("textbox"));
    const today = startOfDay(new Date());
    fireEvent.click(screen.getByRole("button", { name: "ماه اخیر" }));

    const range = mockOnChange.mock.calls[0][0];
    expect(range.start.getTime()).toBe(addMonths(today, -1, "jalali").getTime());
    expect(range.end.getTime()).toBe(today.getTime());
  });

  test("preset button is disabled when computed start is before minDate", () => {
    const farFuture = new Date(2099, 0, 1);
    const minDate = addDays(startOfDay(farFuture), -3);

    render(
      <RangePicker
        id="test-range"
        label="بازه تاریخ"
        value={null}
        onChange={mockOnChange}
        minDate={minDate}
        rangePresets={[{ label: "هفته اخیر", amount: 4, unit: "week" }]}
      />,
    );

    fireEvent.click(screen.getByRole("textbox"));
    const button = screen.getByRole("button", { name: "هفته اخیر" });
    expect(button).toBeDisabled();
  });
});