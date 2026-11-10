import { SUGGESTIONS } from "@/constants/chat";
import { FlatList, Pressable, Text, View } from "react-native";

type Props = {
  disabled: boolean;
  onSelect: (text: string) => void;
};

export default function SuggestionChips({ disabled, onSelect }: Props) {
  return (
    <View className="border-t border-gray-100 bg-white px-3 py-2">
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={SUGGESTIONS}
        keyExtractor={(item) => item}
        contentContainerStyle={{ gap: 8 }}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => onSelect(item)}
            disabled={disabled}
            className="rounded-full border border-gray-200 bg-gray-50 px-4 py-2 active:bg-gray-100"
          >
            <Text className="text-xs font-medium text-gray-700">{item}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}
