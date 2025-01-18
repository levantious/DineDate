import { ReactNode } from "react";
import { View, StyleSheet } from "react-native";
export function ScreenContainer({ children }: { children: ReactNode }) {
  return <View style={styles.chatContainer}>{children}</View>;
}

const styles = StyleSheet.create({
  chatContainer: {
    paddingHorizontal: 16,
  },
});
