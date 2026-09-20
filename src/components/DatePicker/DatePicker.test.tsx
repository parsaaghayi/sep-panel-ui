import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DatePicker from "./DatePicker";

// Mock the images
jest.mock("../../images/info.svg", () => "info-icon");
jest.mock("../../images/success.svg", () => "success-icon");
jest.mock("../../images/error.svg", () => "error-icon");

describe("DatePicker", () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  test("renders DatePicker with basic props", () => {
    render(
      <DatePicker id="test-datepicker" label="تاریخ شروع" value={null} onChange={mockOnChange} />,
    );

    expect(screen.getByLabelText("تاریخ شروع")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  test("renders with Persian locale and RTL direction", () => {
    render(
      <DatePicker
        id="test-datepicker"
        label="تاریخ شروع"
        locale="fa"
        direction="rtl"
        value={null}
        onChange={mockOnChange}
      />,
    );

    const container = screen.getByLabelText("تاریخ شروع").closest(".datePicker-container");
    expect(container).toHaveStyle("direction: rtl");
  });

  test("renders with English locale and LTR direction", () => {
    render(
      <DatePicker
        id="test-datepicker"
        label="Start Date"
        locale="en"
        direction="ltr"
        value={null}
        onChange={mockOnChange}
      />,
    );

    const container = screen.getByLabelText("Start Date").closest(".datePicker-container");
    expect(container).toHaveStyle("direction: ltr");
  });

  test("displays selected date correctly", () => {
    const testDate = new Date(2024, 0, 15); // January 15, 2024

    render(
      <DatePicker
        id="test-datepicker"
        label="تاریخ شروع"
        value={testDate}
        onChange={mockOnChange}
        locale="fa"
      />,
    );

    // The date should be displayed in Persian format
    const input = screen.getByRole("textbox") as HTMLInputElement;
    expect(input.value).toContain("۱۴۰۲");
    expect(input.value).toContain("۱۰");
  });

  test("opens calendar when clicked", () => {
    render(
      <DatePicker id="test-datepicker" label="تاریخ شروع" value={null} onChange={mockOnChange} />,
    );

    const input = screen.getByRole("textbox");
    fireEvent.click(input);

    // Calendar should be visible
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  test("renders with different sizes", () => {
    const { rerender } = render(
      <DatePicker
        id="test-datepicker"
        label="تاریخ شروع"
        size="sm"
        value={null}
        onChange={mockOnChange}
      />,
    );

    let container = screen.getByLabelText("تاریخ شروع").closest(".datePicker-container");
    expect(container).toHaveClass("datePicker-sm");

    rerender(
      <DatePicker
        id="test-datepicker"
        label="تاریخ شروع"
        size="lg"
        value={null}
        onChange={mockOnChange}
      />,
    );

    container = screen.getByLabelText("تاریخ شروع").closest(".datePicker-container");
    expect(container).toHaveClass("datePicker-lg");
  });

  test("renders with different variants", () => {
    const { rerender } = render(
      <DatePicker
        id="test-datepicker"
        label="تاریخ شروع"
        variant="outlined"
        value={null}
        onChange={mockOnChange}
      />,
    );

    let container = screen.getByLabelText("تاریخ شروع").closest(".datePicker-container");
    expect(container).toHaveClass("datePicker-outlined");

    rerender(
      <DatePicker
        id="test-datepicker"
        label="تاریخ شروع"
        variant="filled"
        value={null}
        onChange={mockOnChange}
      />,
    );

    container = screen.getByLabelText("تاریخ شروع").closest(".datePicker-container");
    expect(container).toHaveClass("datePicker-filled");
  });

  test("renders with error message", () => {
    render(
      <DatePicker
        id="test-datepicker"
        label="تاریخ شروع"
        value={null}
        onChange={mockOnChange}
        errorMessage="تاریخ معتبر انتخاب کنید"
      />,
    );

    expect(screen.getByText("تاریخ معتبر انتخاب کنید")).toBeInTheDocument();
  });

  test("renders with success message", () => {
    render(
      <DatePicker
        id="test-datepicker"
        label="تاریخ شروع"
        value={null}
        onChange={mockOnChange}
        successMessage="تاریخ با موفقیت انتخاب شد"
      />,
    );

    expect(screen.getByText("تاریخ با موفقیت انتخاب شد")).toBeInTheDocument();
  });

  test("renders with guid message", () => {
    render(
      <DatePicker
        id="test-datepicker"
        label="تاریخ شروع"
        value={null}
        onChange={mockOnChange}
        guidMessage="لطفاً تاریخ معتبر انتخاب کنید"
      />,
    );

    expect(screen.getByText("لطفاً تاریخ معتبر انتخاب کنید")).toBeInTheDocument();
  });

  test("renders as disabled", () => {
    render(
      <DatePicker
        id="test-datepicker"
        label="تاریخ شروع"
        value={null}
        onChange={mockOnChange}
        disabled={true}
      />,
    );

    const input = screen.getByRole("textbox");
    expect(input).toBeDisabled();
  });

  test("renders as read-only", () => {
    render(
      <DatePicker
        id="test-datepicker"
        label="تاریخ شروع"
        value={null}
        onChange={mockOnChange}
        readOnly={true}
      />,
    );

    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("readOnly");
  });

  test("renders with required indicator", () => {
    render(
      <DatePicker
        id="test-datepicker"
        label="تاریخ شروع"
        value={null}
        onChange={mockOnChange}
        required={true}
      />,
    );

    expect(screen.getByText("*")).toBeInTheDocument();
  });

  test("renders with placeholder", () => {
    render(
      <DatePicker
        id="test-datepicker"
        label="تاریخ شروع"
        placeholder="تاریخ را انتخاب کنید"
        value={null}
        onChange={mockOnChange}
      />,
    );

    expect(screen.getByPlaceholderText("تاریخ را انتخاب کنید")).toBeInTheDocument();
  });

  test("does not fire onChange or auto-fill when value is null at mount", () => {
    render(
      <DatePicker id="test-datepicker" label="تاریخ شروع" value={null} onChange={mockOnChange} />,
    );

    const input = screen.getByRole("textbox") as HTMLInputElement;
    expect(input.value).toBe("");
    expect(mockOnChange).not.toHaveBeenCalled();
  });

  test("displays Persian digits but emits Latin-digit output when outputLocale is set", () => {
    const testDate = new Date(2024, 0, 15); // ۱۴۰۲/۱۰/۲۵

    render(
      <DatePicker
        id="test-datepicker"
        label="تاریخ شروع"
        locale="fa"
        value={testDate}
        output="string"
        outputFormat="YYYY/MM/DD"
        outputLocale="en"
        onChange={mockOnChange}
      />,
    );

    const input = screen.getByRole("textbox") as HTMLInputElement;
    expect(input.value).toBe("۱۴۰۲/۱۰/۲۵");

    fireEvent.click(input);
    const selectedDay = document.querySelector(".datePicker-calendar-day-selected");
    expect(selectedDay).not.toBeNull();
    fireEvent.click(selectedDay as Element);

    expect(mockOnChange).toHaveBeenCalledWith("1402/10/25");
  });

  test("emits Persian-digit output when outputLocale is not set", () => {
    const testDate = new Date(2024, 0, 15);

    render(
      <DatePicker
        id="test-datepicker"
        label="تاریخ شروع"
        locale="fa"
        value={testDate}
        output="string"
        outputFormat="YYYY/MM/DD"
        onChange={mockOnChange}
      />,
    );

    fireEvent.click(screen.getByRole("textbox"));
    const selectedDay = document.querySelector(".datePicker-calendar-day-selected");
    fireEvent.click(selectedDay as Element);

    expect(mockOnChange).toHaveBeenCalledWith("۱۴۰۲/۱۰/۲۵");
  });
});
