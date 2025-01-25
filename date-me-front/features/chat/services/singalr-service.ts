// services/signalrService.ts
import * as SignalR from "@microsoft/signalr";
let connection: SignalR.HubConnection | null = null;

/**
 * Starts a SignalR connection.
 * @returns The SignalR connection instance.
 */
export const startConnection = async (): Promise<SignalR.HubConnection> => {
  connection = new SignalR.HubConnectionBuilder()
    .withUrl("http://localhost:5211/chat") // Replace with your backend URL
    .withAutomaticReconnect()
    .build();

  try {
    await connection.start();
    console.log("SignalR Connected");
  } catch (err) {
    console.error("Error starting SignalR connection:", err);
    throw err;
  }

  return connection;
};

/**
 * Sends a message to the SignalR server.
 * @param user The name of the user sending the message.
 * @param message The message content.
 */
export const sendMessage = async (
  user: string,
  message: string
): Promise<void> => {
  if (connection) {
    try {
      await connection.invoke("SendMessage", user, message);
    } catch (err) {
      console.error("Error sending message:", err);
    }
  } else {
    console.warn("SignalR connection not established");
  }
};

/**
 * Registers a callback for receiving messages from the SignalR server.
 * @param callback The function to execute when a message is received.
 */
export const onReceiveMessage = (
  callback: (user: string, message: string) => void
): void => {
  if (connection) {
    connection.on("ReceiveMessage", (user: string, message: string) => {
      callback(user, message);
    });
  } else {
    console.warn("SignalR connection not established");
  }
};

/**
 * Stops the SignalR connection.
 */
export const stopConnection = async (): Promise<void> => {
  if (connection) {
    try {
      await connection.stop();
      console.log("SignalR Disconnected");
    } catch (err) {
      console.error("Error stopping SignalR connection:", err);
    }
  } else {
    console.warn("SignalR connection not established");
  }
};
