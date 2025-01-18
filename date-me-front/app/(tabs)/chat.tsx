import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from "react-native";
import {
  startSignalRConnection,
  sendMessage,
  onReceiveMessage,
} from "../singalr/singlet";

export default function ChatScreen() {
  const [messages, setMessages] = useState<{ user: string; message: string }[]>(
    []
  );
  const [currentMessage, setCurrentMessage] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const setupSignalR = async () => {
      const connection = await startSignalRConnection();

      onReceiveMessage((user, message) => {
        setMessages((prev) => [...prev, { user, message }]);
      });
    };

    setupSignalR();
  }, []);

  const handleSend = async () => {
    if (username && currentMessage) {
      await sendMessage(username, currentMessage);
      setCurrentMessage("");
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={styles.message}>
            <Text style={styles.user}>{item.user}:</Text> {item.message}
          </Text>
        )}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your message"
        value={currentMessage}
        onChangeText={setCurrentMessage}
      />
      <Button title="Send" onPress={handleSend} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  message: { marginVertical: 5 },
  user: { fontWeight: "bold" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
  },
});
