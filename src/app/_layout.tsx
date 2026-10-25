import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import "../global.css";

export default function RootLayout() {
  return (
    <View className="flex-1 items-center bg-navy">
      <View className="flex-1 w-full max-w-md overflow-hidden">
        <StatusBar style="auto" />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="onboarding" />
          <Stack.Screen name="sign-in" />
          <Stack.Screen name="(tabs)" />
        </Stack>
      </View>
    </View>
  );
}
