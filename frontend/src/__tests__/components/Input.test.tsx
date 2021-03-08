import React, { ReactNode } from "react";
import { render, fireEvent, wait } from "@testing-library/react";
import Input from "../../components/Input";

jest.mock("@unform/core", () => {
  return {
    useField() {
      return {
        fieldName: "email",
        defaultValue: "",
        error: "",
        registerField: jest.fn(),
      };
    },
  };
});

describe("Input Component", () => {
  it("should be able to render an input", () => {
    const { getByPlaceholderText } = render(
      <Input name="email" placeholder="E-mail" />
    );

    expect(getByPlaceholderText("E-mail")).toBeTruthy();
  });

  it("should render highlight on input focus", () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Input name="email" placeholder="E-mail" />
    );

    const inputElement = getByPlaceholderText("E-mail");
    const containerElement = getByTestId("input-container");

    fireEvent.focus(inputElement);

    wait(() => expect(containerElement).toHaveStyle("border-color: #ff9000"));
    wait(() => expect(containerElement).toHaveStyle("color: #ff9000"));

    fireEvent.blur(inputElement);

    wait(() =>
      expect(containerElement).not.toHaveStyle("border-color: #ff9000")
    );
    wait(() => expect(containerElement).not.toHaveStyle("color: #ff9000"));
  });

  it("should keep input border hightlight when input filled", () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Input name="email" placeholder="E-mail" />
    );

    const inputElement = getByPlaceholderText("E-mail");
    const containerElement = getByTestId("input-container");

    fireEvent.change(inputElement, { target: { value: "jhon@example.com" } });

    fireEvent.blur(inputElement);

    wait(() => expect(containerElement).toHaveStyle("color: #ff9000"));
  });
});
