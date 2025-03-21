// import { connection } from "@/common/services";

import { HubConnection } from "@microsoft/signalr";

export function createChatService(SignalRConnection: HubConnection) {
  async function startConnection(): Promise<HubConnection> {
    if (!SignalRConnection) {
      throw new Error("SignalR connection is null");
    }

    // Check the connection state before starting
    if (SignalRConnection.state === "Connected") {
      console.log("SignalR is already connected.");
      return SignalRConnection; // Return the existing connection if it's already connected
    }

    try {
      await SignalRConnection.start();
      console.log("SignalR Connected");
    } catch (err) {
      console.error("Error starting SignalR connection:", err);
      throw err;
    }
    return SignalRConnection;
  }
  async function stopConnection(): Promise<void> {
    try {
      if (!SignalRConnection) {
        throw new Error("SignalR connection is null");
      }

      if (SignalRConnection.state === "Disconnected") {
        console.log("SignalR is already disconnected.");
        return;
      }

      await SignalRConnection.stop();
      console.log("SignalR Disconnected");
    } catch (err) {
      console.error("Error stopping SignalR connection:", err);
      throw err;
    }
  }
  async function sendMessage(user: string, message: string): Promise<void> {
    try {
      await SignalRConnection.invoke("SendMessage", user, message);
    } catch (err) {
      console.error("Error sending message:", err);
      throw err;
    }
  }
  function onReceiveMessage(
    callback: (user: string, message: string) => void
  ): void {
    SignalRConnection.on("ReceiveMessage", callback);
  }
  return {
    startConnection,
    stopConnection,
    sendMessage,
    onReceiveMessage,
  };
}
