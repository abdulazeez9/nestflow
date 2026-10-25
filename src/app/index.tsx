import AppLogo from "@/components/ui/Logo";
import Screen from "@/components/ui/Screen";
import { router } from "expo-router";
import { ImageBackground, Pressable, Text, View } from "react-native";

export default function LandingScreen() {
  return (
    <ImageBackground
      source={require("@/assets/images/homescreen.webp")}
      resizeMode="cover"
      style={{ flex: 1, width: "100%", height: "100%" }}
      imageStyle={{ width: "100%", height: "100%" }}
    >
      <Screen>
        <View className="flex-1 justify-between pt-12">
          <View className="justify-center items-center gap-2">
            <AppLogo textColor="text-background" />
            <Text className="text-background word-spacing line-height">
              Find your perfect home
            </Text>
          </View>
          <View className="gap-4">
            <Pressable
              onPress={() => router.push("/onboarding")}
              className="bg-primary rounded-xl p-4 justify-center items-center"
            >
              <Text className="text-white">Get Started</Text>
            </Pressable>
            <Pressable
              onPress={() => router.push("/sign-in")}
              className="border border-white rounded-xl p-4 justify-center items-center"
            >
              <Text className="text-background font-medium">Sign In</Text>
            </Pressable>
          </View>
        </View>
      </Screen>
    </ImageBackground>
  );
}
