import React from "react";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import { Slot, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";

import "react-native-reanimated";
import { SessionProvider } from "@/features/auth/services";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <>

      <SessionProvider>
        {/* <Slot /> */}
        <Stack>
          <Stack.Screen name="Login" options={{ headerShown: false }} />
          <Stack.Screen name="Register" />
          <Stack.Screen name="Home" />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </SessionProvider>

    </>
  );
}
