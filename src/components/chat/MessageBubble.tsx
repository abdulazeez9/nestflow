import type { Msg } from "@/types/chat";
import { Text, View } from "react-native";

export default function MessageBubble({ message }: { message: Msg }) {
  const isUser = message.role === "user";

  return (
    <View
      className={`max-w-[80%] rounded-2xl px-4 py-3 ${
        isUser ? "self-end bg-blue-600" : "self-start bg-gray-100"
      }`}
    >
      <Text className={isUser ? "text-white" : "text-gray-900"}>
        {message.content}
      </Text>
    </View>
  );
}
