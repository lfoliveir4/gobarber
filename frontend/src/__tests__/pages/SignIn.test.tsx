import React, { ReactNode } from "react";
import { render, fireEvent, wait } from "@testing-library/react";
import SignIn from "../../pages/SignIn";

const mockedHistoryPush = jest.fn();
const mockedSignIn = jest.fn();
const mockedAddToast = jest.fn();

jest.mock("react-router-dom", () => {
  return {
    useHistory: () => ({ push: mockedHistoryPush }),
    Link: ({ children }: { children: ReactNode }) => children,
  };
});

jest.mock("../../context/AuthContext", () => {
  return { useAuth: () => ({ signIn: mockedSignIn }) };
});

jest.mock("../../context/ToastContext", () => {
  return {
    useToast: () => ({ addToast: mockedAddToast }),
  };
});

describe("SignIn Page", () => {
  beforeEach(() => mockedHistoryPush.mockClear());

  it("should be able to sign in", () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />);

    const emailField = getByPlaceholderText("email");
    const passwordField = getByPlaceholderText("senha");

    fireEvent.change(emailField, { target: "jhondoe@example.com" });
    fireEvent.change(passwordField, { target: "123456" });

    const buttonElement = getByText("Entrar");

    fireEvent.click(buttonElement);

    wait(() => expect(mockedHistoryPush).toHaveBeenCalledWith("/dashboard"));
  });

  it("should be able to sign in with invalid credentials", () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />);

    const emailField = getByPlaceholderText("email");
    const passwordField = getByPlaceholderText("senha");

    fireEvent.change(emailField, { target: "not-valid-email" });
    fireEvent.change(passwordField, { target: "123456" });

    const buttonElement = getByText("Entrar");

    fireEvent.click(buttonElement);

    wait(() => expect(mockedHistoryPush).not.toHaveBeenCalled());
  });

  it("should display an error if login fails", () => {
    mockedSignIn.mockImplementation(() => {
      throw new Error();
    });

    const { getByPlaceholderText, getByText } = render(<SignIn />);

    const emailField = getByPlaceholderText("email");
    const passwordField = getByPlaceholderText("senha");

    fireEvent.change(emailField, { target: "jhondoe@example.com" });
    fireEvent.change(passwordField, { target: "123456" });

    const buttonElement = getByText("Entrar");

    fireEvent.click(buttonElement);

    wait(() =>
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({ type: "error" })
      )
    );
  });
});
