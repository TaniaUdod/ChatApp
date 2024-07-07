import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import App from "../App";

describe("App Navigation", () => {
  it("renders HomePage initially", async () => {
    const { getByText } = render(<App />);
    await waitFor(() => {
      expect(getByText("Home")).toBeTruthy();
    });
  });

  it("navigates to ChatPage", async () => {
    const { findByText } = render(<App />);

    await waitFor(() => {
      expect(findByText("Chat")).toBeTruthy();
    });
  });
});
