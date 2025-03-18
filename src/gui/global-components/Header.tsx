import { View, Text, StyleSheet } from "react-native";
export function Header({ title }: { title: string }) {
  return (
    <View style={[styles.headerContainer]}>
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 16,
  },
  headerText: {
    textTransform: "uppercase",
    fontWeight: "600",
    color: "#ffffff",
    letterSpacing: 1.5,
  },
});
