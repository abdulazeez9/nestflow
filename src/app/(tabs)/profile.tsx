import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("user_name");
      router.replace("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <View className=" p-4">
        <Text className="text-2xl text-navy">Profile</Text>
      </View>

      <View className="flex-1 justify-end p-6">
        <Pressable
          onPress={handleLogout}
          className="border border-red-500 rounded-xl p-4 items-center"
        >
          <Text className="text-red-500 font-semibold">Log Out</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
