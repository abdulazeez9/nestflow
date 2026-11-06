import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, TextInput, View } from "react-native";

interface SearchProps {
  value: string;
  onChangeText: (text: string) => void;
  onFilterPress?: () => void;
  activeFilterCount?: number;
  placeholder?: string;
}

export default function Search({
  value,
  onChangeText,
  onFilterPress,
  activeFilterCount = 0,
  placeholder = "Search by title or location",
}: SearchProps) {
  return (
    <View className="flex-row items-center gap-3">
      <View className="h-12 flex-1 flex-row items-center rounded-2xl border border-border bg-background-input px-3">
        <Ionicons name="search-outline" size={20} color="#6B7280" />

        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          returnKeyType="search"
          autoCorrect={false}
          className="ml-2 flex-1 text-sm text-content"
        />

        {value.length > 0 ? (
          <Pressable
            onPress={() => onChangeText("")}
            hitSlop={8}
            className="h-6 w-6 items-center justify-center"
          >
            <Ionicons name="close-circle" size={18} color="#9CA3AF" />
          </Pressable>
        ) : null}
      </View>

      {onFilterPress ? (
        <Pressable
          onPress={onFilterPress}
          className="relative h-12 w-12 items-center justify-center rounded-2xl bg-primary active:opacity-90"
        >
          <Ionicons name="options-outline" size={22} color="#fff" />

          {activeFilterCount > 0 ? (
            <View className="absolute -right-1 -top-1 h-5 min-w-[20px] items-center justify-center rounded-full bg-navy px-1">
              <Text className="text-[10px] font-bold text-background">
                {activeFilterCount}
              </Text>
            </View>
          ) : null}
        </Pressable>
      ) : null}
    </View>
  );
}
