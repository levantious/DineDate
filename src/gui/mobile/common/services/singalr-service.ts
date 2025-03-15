// services/signalrService.ts
import * as SignalR from "@microsoft/signalr";
let connection: SignalR.HubConnection | null = null;

export async function startConnection(): Promise<SignalR.HubConnection> {
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
}

export async function sendMessage(
  user: string,
  message: string
): Promise<void> {
  if (connection) {
    try {
      await connection.invoke("SendMessage", user, message);
    } catch (err) {
      console.error("Error sending message:", err);
    }
  } else {
    console.warn("SignalR connection not established");
  }
}

export function onReceiveMessage(
  callback: (user: string, message: string) => void
): void {
  if (connection) {
    connection.on("ReceiveMessage", (user: string, message: string) => {
      callback(user, message);
    });
  } else {
    console.warn("SignalR connection not established");
  }
}

export async function stopConnection(): Promise<void> {
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
}
