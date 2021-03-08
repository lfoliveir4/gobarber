import React from "react";
import { wait } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import { useAuth } from "../../context/AuthContext";
import MockAdapter from "axios-mock-adapter";
import api from "../../services/ApiClient";

import { AuthProvider } from "../../context/AuthContext";

const apiMock = new MockAdapter(api);

describe("Auth Hook", () => {
  it("should be able to sign in", () => {
    apiMock.onPost("sessions").reply(200, {
      user: {
        id: "user",
        name: "jhon Doe",
        email: "jhondoe@example.com",
        password: "123456",
      },
      token: "token-123",
    });

    const setItemSpyOn = jest.spyOn(Storage.prototype, "setItem");

    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    const { signIn, user } = result.current;

    signIn({ email: "jhondoe@example.com", password: "123456" });

    wait(() => expect(setItemSpyOn).toHaveBeenCalledTimes(2));
    wait(() => expect(user.email).toEqual("jhondoe@example.com"));
  });

  it("should restore saved data from storage when auth inits", () => {
    jest.spyOn(Storage.prototype, "getItem").mockImplementation((key) => {
      switch (key) {
        case "@GoBarber:token":
          return "token-123";
        case "@GoBarber:user":
          return JSON.stringify({
            id: "user",
            name: "jhon Doe",
            email: "jhondoe@example.com",
          });

        default:
          return null;
      }
    });

    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    const { user } = result.current;

    expect(user.email).toEqual("jhondoe@example.com");
  });

  it("should be able to sign out", () => {
    jest.spyOn(Storage.prototype, "getItem").mockImplementation((key) => {
      switch (key) {
        case "@GoBarber:token":
          return "token-123";
        case "@GoBarber:user":
          return JSON.stringify({
            id: "user",
            name: "jhon Doe",
            email: "jhondoe@example.com",
          });

        default:
          return null;
      }
    });

    const removeItemSpy = jest.spyOn(Storage.prototype, "removeItem");

    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    const { user, signOut } = result.current;

    signOut();

    wait(() => expect(removeItemSpy).toHaveBeenCalledTimes(2));
    wait(() => expect(user).toBeUndefined());
  });

  it("should be able to update user data", () => {
    const setItemSpy = jest.spyOn(Storage.prototype, "setItem");

    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    const { updateUser, user } = result.current;

    const userMock = {
      id: "user",
      name: "jhon Doe",
      email: "jhondoe@example.com",
      avatar_url: "test-img.jpg",
    };

    updateUser(userMock);

    wait(() =>
      expect(setItemSpy).toHaveBeenCalledWith(
        "@GoBarber:user",
        JSON.stringify(user)
      )
    );

    wait(() => expect(user).toEqual(userMock));
  });
});
