import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  LayoutAnimation,
  Platform,
  Pressable,
  Text,
  UIManager,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type Section = {
  id: string;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  content: string;
};

const SECTIONS: Section[] = [
  {
    id: "help",
    title: "Help & Support",
    icon: "help-circle-outline",
    content:
      "Need a hand? Try the NestFlow AI assistant in Messages for questions about listings. For anything else, reach out to the developer through the contact details on the portfolio.",
  },
  {
    id: "privacy",
    title: "Privacy & Policy",
    icon: "shield-checkmark-outline",
    content:
      "Your name and chat history are stored only on this device. Messages you send to the assistant are processed by Google's Gemini API to generate replies. You can clear your chat history at any time from the Messages screen.",
  },
  {
    id: "about",
    title: "About App",
    icon: "information-circle-outline",
    content:
      "NestFlow is a real estate portfolio app built by Abdulazeez Muritador with React Native, TypeScript and Expo.",
  },
];

export default function Profile() {
  const [userName, setUserName] = useState("Guest");
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    AsyncStorage.getItem("user_name").then((n) => {
      if (n) setUserName(n);
    });
  }, []);

  const toggle = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpenId((prev) => (prev === id ? null : id));
  };

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
      <View className="p-4">
        <Text className="text-2xl text-navy">Profile</Text>
      </View>

      <View className="items-center gap-3 py-6">
        <View className="h-24 w-24 items-center justify-center rounded-full bg-primary">
          <Text className="text-4xl font-semibold text-white">
            {userName.charAt(0).toUpperCase()}
          </Text>
        </View>
        <Text className="text-xl font-semibold text-gray-900">{userName}</Text>
      </View>

      <View className="mx-4 overflow-hidden rounded-2xl border border-gray-200">
        {SECTIONS.map((section, index) => {
          const isOpen = openId === section.id;
          return (
            <View
              key={section.id}
              className={index > 0 ? "border-t border-gray-200" : ""}
            >
              <Pressable
                onPress={() => toggle(section.id)}
                className="flex-row items-center justify-between p-4 active:bg-gray-50"
                accessibilityRole="button"
                accessibilityState={{ expanded: isOpen }}
              >
                <View className="flex-row items-center gap-3">
                  <Ionicons name={section.icon} size={22} color="#111827" />
                  <Text className="text-base font-medium text-gray-900">
                    {section.title}
                  </Text>
                </View>
                <Ionicons
                  name={isOpen ? "chevron-up" : "chevron-down"}
                  size={20}
                  color="#6B7280"
                />
              </Pressable>

              {isOpen && (
                <View className="px-4 pb-4">
                  <Text className="text-sm leading-5 text-gray-600">
                    {section.content}
                  </Text>
                </View>
              )}
            </View>
          );
        })}
      </View>

      <View className="flex-1 justify-end p-6">
        <Pressable
          onPress={handleLogout}
          className="items-center rounded-xl border border-red-500 p-4"
        >
          <Text className="font-semibold text-red-500">Log Out</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
