import {
  HubConnectionBuilder,
  LogLevel,
  HubConnection,
} from "@microsoft/signalr";

export function createConnection() {
  let connection: HubConnection | null = null;
  const hubUrl = process.env.EXPO_PUBLIC_HUB_URL;
  if (!hubUrl) {
    throw new Error("HUB_URL is not defined");
  }
  connection = new HubConnectionBuilder()
    .withUrl(hubUrl)
    .withAutomaticReconnect()
    .configureLogging(LogLevel.Debug)
    .build();
  return connection;
}
