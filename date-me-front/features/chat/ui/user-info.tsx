import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
type Props = {
  name: string;
  timeSent: string;
  isOnline: boolean;
};

export function UserInfo({ name, timeSent, isOnline }: Props) {
  return (
    <View
      style={[
        styles.infoContainer,
        {
          height: hp(6),
        },
      ]}
    >
      <View style={styles.infoHeader}>
        <View style={styles.infoNameContainer}>
          <View style={styles.nameRow}>
            <Text style={styles.nameText}>{name}</Text>
          </View>
          <View style={styles.onlineIndicatorContainer}>
            {!isOnline && <View style={styles.onlineIndicator}></View>}
          </View>
        </View>
        <Text style={styles.timeText}>{timeSent}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  onlineIndicatorContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  onlineIndicator: {
    width: 8,
    height: 8,
    backgroundColor: "#F26322",
    borderRadius: 50,
    marginLeft: 4,
  },
  infoContainer: {
    width: "82%",
  },
  infoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoNameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  nameRow: {
    flexDirection: "row",
  },
  nameText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },
  timeText: {
    fontSize: 14,
    letterSpacing: -0.5,
  },
});
