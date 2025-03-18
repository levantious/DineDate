import { FlatList, TouchableOpacity, Platform, StyleSheet, View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { chatData } from "@/fake-data";
import { Header, ScreenContainer } from "@/global-components";
import { Avatar, UserInfo } from "../../features/chat/ui";
import { Ionicons } from "@expo/vector-icons";

type RootStackParamList = {
  boostme: {
    id: number;
    chat: { sender: string; message: string; timestamp: string }[];
    imgUrl: string;
    name: string;
    age: number;
  };
};

type ChatData = {
  id: number;
  name: string;
  age: number;
  chat: string;
  imgUrl: string;
  lastMessage: string;
  timeSent: string;
  isOnline: boolean;
};
const android = Platform.OS === "android";

export default function Boostme() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        {
          paddingTop: android ? hp(3) : 0,
        },
      ]}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 16 }}>
        <Header title="Boost" />
        <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", marginLeft: 'auto' }}>
          <Ionicons name="rose" size={24} color="#FFFFFF" />
          <Text style={{ color: "#FFFFFF", marginRight: 8 }}>Roses (1)</Text>
        </TouchableOpacity>
      </View>

      <ScreenContainer>
        <FlatList
          data={chatData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.chatItem}
              onPress={() =>
                navigation.navigate("boostme", {
                  id: item.id,
                  chat: item.chat,
                  imgUrl: item.imgUrl,
                  name: item.name,
                  age: item.age,
                })
              }
            >
              <Avatar imgUrl={item.imgUrl.uri} />
              <UserInfo
                name={item.name}
                timeSent={item.timeSent}
                isOnline={item.isOnline}
              />
            </TouchableOpacity>
          )}
        />
      </ScreenContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#000", // Rose color
  },
  chatItem: {
    width: "100%",
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: "#FF007F", // Rose color
  },
});
