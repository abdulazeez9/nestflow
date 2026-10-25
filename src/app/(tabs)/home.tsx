import Screen from "@/components/ui/Screen";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";

export default function HomeScreen() {
  const [userName, setUserName] = useState("Guest");

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const savedName = await AsyncStorage.getItem("user_name");
        if (savedName) {
          setUserName(savedName);
        }
      } catch (error) {
        console.error("Error fetching user name:", error);
      }
    };

    fetchUserName();
  }, []);

  return (
    <Screen>
      <View className="gap-6">
        {/* Header / Greeting */}
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-sm font-medium text-content-placeholder">
              Welcome back 👋
            </Text>
            <Text className="text-2xl font-bold text-navy">{userName}</Text>
          </View>

          <Pressable className="p-3 rounded-full bg-gray-100 dark:bg-slate-800">
            <Ionicons
              name="notifications-outline"
              size={22}
              className="text-badkground"
            />
          </Pressable>
        </View>
      </View>
    </Screen>
  );
}
