import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

export const SignalRConnection = new HubConnectionBuilder()
  .withUrl("http://192.168.1.68:5211/chat")
  .withAutomaticReconnect()
  .configureLogging(LogLevel.Debug)
  .build();
