import AppLogo from "@/components/ui/Logo";
import Screen from "@/components/ui/Screen";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Modal, Pressable, Text, TextInput, View } from "react-native";

export default function SignIn() {
  const [name, setName] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const checkFirstVisit = async () => {
      try {
        // 1. Check if the demo modal has been shown before
        const hasSeenModal = await AsyncStorage.getItem("has_seen_demo_modal");
        if (!hasSeenModal) {
          setIsModalVisible(true);
          await AsyncStorage.setItem("has_seen_demo_modal", "true");
        }

        // 2. Pre-fill name if it was previously saved
        const savedName = await AsyncStorage.getItem("user_name");
        if (savedName) {
          setName(savedName);
        }
      } catch (error) {
        console.error("Error reading storage:", error);
      }
    };

    checkFirstVisit();
  }, []);

  const handleContinue = async () => {
    const guestName = name.trim() || "Guest";

    try {
      await AsyncStorage.setItem("user_name", guestName);
      console.log("Logged in as:", guestName);
      router.replace("/(tabs)/home");
    } catch (error) {
      console.error("Error saving user name:", error);
    }
  };

  return (
    <Screen>
      <View className="flex-1 justify-between p-6">
        {/* Info Icon Button (Top Right) */}
        <View className="items-end">
          <Pressable
            onPress={() => setIsModalVisible(true)}
            className="p-2 rounded-full bg-gray-100 dark:bg-slate-800"
            accessibilityLabel="Why name only?"
          >
            <Ionicons
              name="information-circle"
              size={22}
              className="text-primary"
            />
          </Pressable>
        </View>

        {/* Header & Logo */}
        <View className="items-center gap-4">
          <AppLogo textColor="text-navy" />
          <Text className="text-2xl font-bold text-navy text-center">
            Welcome to Nestflow
          </Text>
          <Text className="text-content-placeholder text-center text-sm px-4">
            Enter your name to personalize your tour experience.
          </Text>
        </View>

        {/* Input & Action */}
        <View className="gap-4 w-full">
          <View className="flex-row items-center border border-gray-300 rounded-xl px-4 py-3 bg-white">
            <Ionicons name="person" size={20} className="text-gray-400 mr-3" />
            <TextInput
              placeholder="Enter your full name"
              value={name}
              onChangeText={setName}
              className="flex-1 text-base text-navy"
              placeholderTextColor="#9CA3AF"
              autoCapitalize="words"
              returnKeyType="done"
              onSubmitEditing={handleContinue}
            />
          </View>

          <Pressable
            onPress={handleContinue}
            className="bg-primary rounded-xl p-4 items-center"
          >
            <Text className="text-white font-semibold text-base">
              Continue to App
            </Text>
          </Pressable>
        </View>

        {/* Informational Popup / Modal */}
        <Modal
          visible={isModalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View className="flex-1 justify-center items-center bg-black/50 px-6">
            <View className="bg-white rounded-2xl p-6 w-full max-w-sm gap-4 shadow-lg">
              <View className="flex-row items-center gap-2">
                <Ionicons
                  name="information-circle"
                  size={20}
                  className="text-primary"
                />
                <Text className="text-lg font-bold text-navy">
                  Portfolio Demo Notice
                </Text>
              </View>

              <Text className="text-sm text-gray-600 leading-relaxed">
                Nestflow is a portfolio demo, so real authentication is skipped
                on purpose. Your name is stored locally on this device and used
                only for the greeting on the home screen.
              </Text>

              <Pressable
                onPress={() => setIsModalVisible(false)}
                className="bg-primary rounded-xl py-3 items-center mt-2"
              >
                <Text className="text-white font-semibold">Got it</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </Screen>
  );
}
