import ChatHeader from "@/components/chat/ChatHeader";
import ChatInput from "@/components/chat/ChatInput";
import MessageBubble from "@/components/chat/MessageBubble";
import SuggestionChips from "@/components/chat/SuggestionChips";
import TypingIndicator from "@/components/chat/TypingIndicator";
import Screen from "@/components/ui/Screen";
import { useChat } from "@/hooks/useChat";
import type { Msg } from "@/types/chat";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
} from "react-native";

export default function Messages() {
  const router = useRouter();
  const { messages, loading, send, clearChat } = useChat();
  const [userName, setUserName] = useState("Guest");
  const listRef = useRef<FlatList<Msg>>(null);

  useEffect(() => {
    AsyncStorage.getItem("user_name").then((n) => {
      if (n) setUserName(n);
    });
  }, []);

  return (
    <Screen>
      <ChatHeader
        userName={userName}
        showClear={messages.length > 0}
        onBack={() =>
          router.canGoBack() ? router.back() : router.replace("/(tabs)/home")
        }
        onClear={clearChat}
      />

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={(m) => m.id}
          contentContainerClassName="p-4 gap-3 flex-grow"
          onContentSizeChange={() =>
            listRef.current?.scrollToEnd({ animated: true })
          }
          ListEmptyComponent={
            <View className="flex-1 items-center justify-center gap-4 py-16">
              <Text className="text-lg font-semibold text-gray-900">
                Ask me about our properties
              </Text>
            </View>
          }
          renderItem={({ item }) => <MessageBubble message={item} />}
          ListFooterComponent={
            loading ? (
              <View className="py-2">
                <TypingIndicator />
              </View>
            ) : undefined
          }
        />

        <SuggestionChips disabled={loading} onSelect={send} />
        <ChatInput loading={loading} onSend={send} />
      </KeyboardAvoidingView>
    </Screen>
  );
}
