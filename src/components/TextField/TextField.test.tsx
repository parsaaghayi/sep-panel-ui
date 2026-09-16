import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TextField from "./TextField";

describe("TextField", () => {
  test("render the TextField component with basic props", () => {
    const testText = "";
    const setTestText = () => {};
    render(
      <TextField
        type="text"
        label="Test Label"
        id="test-id"
        name="test-name"
        value={testText}
        onChange={setTestText}
      />
    );
    
    expect(screen.getByLabelText("Test Label")).toBeInTheDocument();
  });

  test("render TextField with all new props", () => {
    const testText = "";
    const setTestText = () => {};
    const validationRules = [
      { rule: (value: string) => value.length > 3, message: "Must be longer than 3 characters" }
    ];

    render(
      <TextField
        type="text"
        label="Advanced TextField"
        id="advanced-id"
        name="advanced-name"
        value={testText}
        onChange={setTestText}
        placeholder="Enter text"
        required
        maxLength={50}
        minLength={2}
        pattern="[a-zA-Z]+"
        autoComplete="name"
        autoFocus
        size="lg"
        variant="filled"
        color="primary"
        fullWidth
        validateOnChange
        validateOnBlur
        validationRules={validationRules}
        allowOnlyNumbers={false}
        allowOnlyLetters={true}
        aria-label="Test input"
        onFocus={(e) => console.log("Focused")}
        onBlur={(e) => console.log("Blurred")}
        onKeyDown={(e) => console.log("Key down")}
        onKeyUp={(e) => console.log("Key up")}
        onPaste={(e) => console.log("Pasted")}
      />
    );
    
    expect(screen.getByText("Advanced TextField")).toBeInTheDocument();
    expect(screen.getByText("*")).toBeInTheDocument(); // Required indicator
  });

  test("handle input change with formatting", () => {
    const testText = "";
    const setTestText = () => {};
    const formatter = (value: string) => value.toUpperCase();
    
    render(
      <TextField
        type="text"
        id="formatted-id"
        value={testText}
        onChange={setTestText}
        formatter={formatter}
        allowOnlyLetters
      />
    );
    
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "hello123" } });
    
    // Should only contain letters and be uppercase
    expect(input).toHaveValue("HELLO");
  });

  test("handle validation", () => {
    const testText = "";
    const setTestText = () => {};
    const validationRules = [
      { rule: (value: string) => value.length >= 5, message: "Must be at least 5 characters" }
    ];
    
    render(
      <TextField
        type="text"
        id="validation-id"
        value={testText}
        onChange={setTestText}
        validationRules={validationRules}
        validateOnChange
      />
    );
    
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "hi" } });
    
    // Should show validation error
    expect(screen.getByText("Must be at least 5 characters")).toBeInTheDocument();
  });

  test("handle icon clicks", () => {
    const testText = "";
    const setTestText = () => {};
    const iconClick = jest.fn();
    const { rerender } = render(
      <TextField
        type="text"
        id="icon-id"
        value={testText}
        onChange={setTestText}
        startIcon={<span data-testid="start-icon">🔍</span>}
        iconPosition="start"
        iconClick={iconClick}
      />
    );

    fireEvent.click(screen.getByTestId("start-icon"));
    expect(iconClick).toHaveBeenCalledTimes(1);

    rerender(
      <TextField
        type="text"
        id="icon-id"
        value={testText}
        onChange={setTestText}
        endIcon={<span data-testid="end-icon">❌</span>}
        iconPosition="end"
        iconClick={iconClick}
      />
    );

    fireEvent.click(screen.getByTestId("end-icon"));
    expect(iconClick).toHaveBeenCalledTimes(2);
  });

  test("handle different sizes and variants", () => {
    const testText = "";
    const setTestText = () => {};
    
    const { rerender } = render(
      <TextField
        type="text"
        id="size-test"
        value={testText}
        onChange={setTestText}
        size="sm"
        variant="outlined"
      />
    );
    
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    
    rerender(
      <TextField
        type="text"
        id="size-test"
        value={testText}
        onChange={setTestText}
        size="lg"
        variant="filled"
        color="error"
      />
    );
    
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  test("handle disabled and readOnly states", () => {
    const testText = "";
    const setTestText = () => {};
    
    render(
      <TextField
        type="text"
        id="state-test"
        value={testText}
        onChange={setTestText}
        disabled
        readOnly
      />
    );
    
    const input = screen.getByRole("textbox");
    expect(input).toBeDisabled();
    expect(input).toHaveAttribute("readonly");
  });

  test("container click focuses input", () => {
    const testText = "";
    const setTestText = () => {};
    
    render(
      <TextField
        type="text"
        id="container-test"
        value={testText}
        onChange={setTestText}
        label="Test Input"
      />
    );
    
    const input = screen.getByRole("textbox");
    const container = input.closest('.textField-input');
    
    expect(container).toBeInTheDocument();
    
    // Click on container should focus input
    fireEvent.click(container!);
    expect(input).toHaveFocus();
  });
});
