import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react-native";
import ChatScreen from "@/app/(tabs)/chat";
import { chatFeature } from "@/features/chat";


describe("ChatScreen Component", () => {
  test("does not send message if message input is empty | 0 case", async () => {
    const { getByPlaceholderText, getByText } = render(<ChatScreen />);
    const messageInput = getByPlaceholderText("Enter your message");
    const sendButton = getByText("Send");

    fireEvent.changeText(messageInput, "Hello, world!");
    fireEvent.press(sendButton);

    expect(chatFeature.service.sendMessage).not.toHaveBeenCalled();
  });

  test("handles user input and sends message | 1 case", async () => {
    (chatFeature.service.startConnection as jest.Mock).mockResolvedValue({});
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
    (chatFeature.service.startConnection as jest.Mock).mockResolvedValue({});
    (chatFeature.service.onReceiveMessage as jest.Mock).mockImplementation((callback) => {
      callback(mockMessage.user, mockMessage.message);
    });

    const { getByText } = render(<ChatScreen />);

    await waitFor(() => {
      expect(getByText("testuser: Hello, world!")).toBeTruthy();
    });
  });
});
