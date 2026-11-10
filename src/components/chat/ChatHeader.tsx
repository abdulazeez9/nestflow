import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

type Props = {
  userName: string;
  showClear: boolean;
  onBack: () => void;
  onClear: () => void;
};

export default function ChatHeader({
  userName,
  showClear,
  onBack,
  onClear,
}: Props) {
  return (
    <View className="flex-row items-center justify-between border-b border-gray-200 pb-3">
      <View className="flex-row items-center gap-3">
        <Pressable onPress={onBack} hitSlop={8} accessibilityLabel="Go back">
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </Pressable>

        <View className="h-10 w-10 items-center justify-center rounded-full bg-primary">
          <Text className="font-semibold text-white">
            {userName.charAt(0).toUpperCase()}
          </Text>
        </View>

        <View>
          <Text className="text-base font-semibold text-gray-900">
            {userName}
          </Text>
          <Text className="text-xs text-muted">Online</Text>
        </View>
      </View>

      {showClear && (
        <Pressable onPress={onClear} hitSlop={8}>
          <Ionicons name="trash-outline" size={20} color="#EF4444" />
        </Pressable>
      )}
    </View>
  );
}
