import { createRepository } from "./repository";
import { createChatService } from "./service";
import { createConnection } from "../../common/services/singalr-service";

export const chatFeature = createChatService(createConnection());
