import React from "react";
import { render } from "@testing-library/react-native";
import LoadingSpinner from "../app/shared/LoadingSpinner";

test("renders LoadingSpinner correctly", () => {
  const { getByTestId } = render(<LoadingSpinner />);
  const spinner = getByTestId("loading-spinner");
  expect(spinner).toBeTruthy();
});
