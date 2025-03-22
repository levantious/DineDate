import React from "react";
import { View, Image } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

type AvatarProps = {
  imgUrl: any;
};

export function Avatar({ imgUrl }: AvatarProps) {
  return (
    <View
      style={{
        justifyContent: "center",
        width: hp(7),
        height: hp(7),
      }}
    >
      <Image
        source={{ uri: imgUrl }}
        style={{
          width: "90%",
          height: "90%",
          borderRadius: 50,
        }}
      />
    </View>
  );
}