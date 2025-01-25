import { FlatList, TouchableOpacity, Platform, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { chatData } from "@/data";
import { Header, ScreenContainer } from "@/components/ui";
import { Avatar, UserInfo } from "../../features/chat/ui";

type RootStackParamList = {
  chats: {
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

export default function UsersMatchScreen() {
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
      <Header title="Matches" />
      <ScreenContainer>
        <Header title="CHAT" />
        <FlatList
          data={chatData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.chatItem}
              onPress={() =>
                navigation.navigate("chats", {
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
    backgroundColor: "#000",
  },
  chatItem: {
    width: "100%",
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: "#d1d1d1",
  },
});
