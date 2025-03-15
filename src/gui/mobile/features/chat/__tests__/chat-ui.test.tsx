import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react-native";
import { startConnection, sendMessage, onReceiveMessage } from "../services";
import ChatScreen from "@/app/(tabs)/chat";

jest.mock("../services", () => ({
  startConnection: jest.fn(),
  sendMessage: jest.fn(),
  onReceiveMessage: jest.fn(),
}));

describe("ChatScreen Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("does not send message if message input is empty | 0 case", async () => {
    const { getByPlaceholderText, getByText } = render(<ChatScreen />);
    const messageInput = getByPlaceholderText("Enter your message");
    const sendButton = getByText("Send");

    fireEvent.changeText(messageInput, "Hello, world!");
    fireEvent.press(sendButton);

    expect(sendMessage).not.toHaveBeenCalled();
  });

  test("handles user input and sends message | 1 case", async () => {
    (startConnection as jest.Mock).mockResolvedValue({});
    const { getByPlaceholderText, getByText } = render(<ChatScreen />);
    const usernameInput = getByPlaceholderText("Enter your username");
    const messageInput = getByPlaceholderText("Enter your message");
    const sendButton = getByText("Send");

    fireEvent.changeText(usernameInput, "testuser");
    fireEvent.changeText(messageInput, "Hello, world!");

    await act(async () => {
      fireEvent.press(sendButton);
    });
  });
  test("renders input fields and send button", () => {
    const { getByPlaceholderText, getByText } = render(<ChatScreen />);

    const messageInput = getByPlaceholderText("Enter your message");
    const sendButton = getByText("Send");

    expect(messageInput).toBeTruthy();
    expect(sendButton).toBeTruthy();
  });

  test("receives and displays messages", async () => {
    const mockMessage = { user: "testuser", message: "Hello, world!" };
    (startConnection as jest.Mock).mockResolvedValue({});
    (onReceiveMessage as jest.Mock).mockImplementation((callback) => {
      callback(mockMessage.user, mockMessage.message);
    });

    const { getByText } = render(<ChatScreen />);

    await waitFor(() => {
      expect(getByText("testuser: Hello, world!")).toBeTruthy();
    });
  });
});
