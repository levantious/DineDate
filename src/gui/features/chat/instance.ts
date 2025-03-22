import { createRepository } from "./repository";
import { createChatService } from "./service";
import { createConnection } from "../../common/services/singalr-service";

function craeteFeature() {
  const repository = createRepository();
  const connection = createConnection();
  const service = createChatService(connection);
  return {
    service,
  };
}

export const chatFeature = craeteFeature();
