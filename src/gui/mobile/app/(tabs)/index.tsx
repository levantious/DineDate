import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { homepage } from "@/assets/images";
import React from "react";
export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image source={homepage} style={styles.avatarImage} />
      </View>
      <Text style={styles.subtitle}>Let's meet new people around you!</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Start Exploring</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  avatarContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e3e3e3",
    width: wp("60%"),
    height: wp("60%"),
    borderRadius: wp("40%"),
    overflow: "hidden",
    marginBottom: 20,
  },
  avatarImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  subtitle: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
