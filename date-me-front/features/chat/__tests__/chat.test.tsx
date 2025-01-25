import React from "react";
import { render } from "@testing-library/react-native";
import { UserInfo } from "../ui";

test("renders the name prop correctly", () => {
  const testName = "John Doe";

  const { getByText } = render(
    <UserInfo name={testName} isOnline={true} timeSent="10:00 AM" />
  );

  expect(getByText(testName)).toBeTruthy();
});
