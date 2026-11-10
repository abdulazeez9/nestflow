import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

type Props = {
  loading: boolean;
  onSend: (text: string) => void;
};

export default function ChatInput({ loading, onSend }: Props) {
  const [input, setInput] = useState("");

  const submit = () => {
    if (!input.trim() || loading) return;
    onSend(input);
    setInput("");
  };

  return (
    <View className="flex-row items-center gap-2 border-t border-gray-200 p-3">
      <TextInput
        className="flex-1 rounded-full bg-gray-100 px-4 py-3 text-gray-900"
        placeholder="Ask about a property..."
        value={input}
        onChangeText={setInput}
        onSubmitEditing={submit}
        returnKeyType="send"
        editable={!loading}
      />
      <Pressable
        onPress={submit}
        disabled={loading || !input.trim()}
        className="rounded-full bg-blue-600 px-4 py-3 disabled:opacity-40"
      >
        <Text className="font-semibold text-white">Send</Text>
      </Pressable>
    </View>
  );
}
