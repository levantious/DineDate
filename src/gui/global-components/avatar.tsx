import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

type AvatarProps = {
  imgUrl: any;
};

export function Avatar({ imgUrl }: AvatarProps) {
  return (
    <View style={styles.imageContainer}>
      <Image source={{ uri: imgUrl }} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: "center",
    width: hp(7),
    height: hp(7),
  },
  image: {
    width: "90%",
    height: "90%",
    borderRadius: 50,
  },
});