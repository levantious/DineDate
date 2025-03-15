import { onReceiveMessage, sendMessage, startConnection, stopConnection } from "@/features/chat/services";



jest.setTimeout(10000);

describe("SignalR System Test", () => {
    let connection;
    let receivedMessage: string | null = null;

    beforeAll(async () => {
        connection = await startConnection();
        console.log("Connected to SignalR server");
    });

    afterAll(async () => {
        await stopConnection();
        console.log("Disconnected from SignalR server");
    });

    test("Should send and receive a message", async () => {
        const testUser = "TestUser";
        const testMessage = "Hello, SignalR!";

        // Listen for messages from the server
        onReceiveMessage((user, message) => {
            if (user === testUser) {
                receivedMessage = message;
            }
        });

        // Send a message
        await sendMessage(testUser, testMessage);

        // Wait for message to be received
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Assertion to check if message was received
        expect(receivedMessage).toBe(testMessage);
    });
});