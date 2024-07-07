import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { Provider } from "react-redux";
import HomePage from "../app/static/HomePage";
import { configureStore } from "@reduxjs/toolkit";
import { chatReducer } from "../app/core/redux/chatSlice";

jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

describe("HomePage Component", () => {
  it("adds a new chat", async () => {
    const mockState = {
      chat: {
        chats: [],
        isLoading: false,
        error: null,
      },
    };

    const store = configureStore({
      reducer: {
        chat: chatReducer,
      },
      preloadedState: mockState,
    });

    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <HomePage />
      </Provider>
    );

    await waitFor(() =>
      expect(getByPlaceholderText("Enter chat name")).toBeTruthy()
    );

    fireEvent.changeText(getByPlaceholderText("Enter chat name"), "New Chat");
    fireEvent.press(getByText("Add Chat"));

    await waitFor(() => expect(getByText("New Chat")).toBeTruthy(), {
      timeout: 10000,
    });
  });
});
