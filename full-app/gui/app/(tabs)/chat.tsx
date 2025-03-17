import { ChatContainer } from "@/features/chat/ui/messages";
import React from "react";
import {
  View,
  StyleSheet,
} from "react-native";


export default function ChatScreen() {
  return (
    <View style={styles.container}>
      <ChatContainer />
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
