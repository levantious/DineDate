import { SignalRConnection } from "@/common/services/singalr-service";
import { createRepository } from "./repository";
import { createChatService } from "./service";
import { HubConnection } from "@microsoft/signalr";

function createChatFeature(SignalRConnection: HubConnection) {
  const repository = createRepository();
  const service = createChatService(SignalRConnection);
  return {
    service,
  };
}

export const chatFeature = createChatFeature(SignalRConnection);
