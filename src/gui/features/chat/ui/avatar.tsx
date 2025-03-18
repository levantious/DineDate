import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

type AvatarProps = {
  imgUrl: any;
};

export function Avatar({ imgUrl }: AvatarProps) {
  return (
    <View
      style={[
        styles.avatarContainer,
        {
          width: hp(7),
          height: hp(7),
        },
      ]}
    >
      <Image source={{ uri: imgUrl }} style={styles.avatarImage} />
    </View>
  );
}

const styles = StyleSheet.create({
  avatarContainer: {
    justifyContent: "center",
  },
  avatarImage: {
    width: "90%",
    height: "90%",
    borderRadius: 50,
  },
});
