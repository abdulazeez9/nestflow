import { STORAGE_KEY } from "@/constants/chat";
import { askGemini, isTimeoutError } from "@/services/gemini";
import type { Msg } from "@/types/chat";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import { useEffect, useState } from "react";

function getErrorMessage(error: any): string {
  if (error?.status === 429) {
    return "Rate limit reached. Please wait a moment and try again.";
  }
  if (error?.status === 503) {
    return "I'm a bit busy right now. Please try again in a moment.";
  }
  if (isTimeoutError(error)) {
    return "This is taking too long. Please check your connection and try again.";
  }
  return "Sorry, I encountered an error. Please try again.";
}

export function useChat() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((stored) => {
      if (!stored) return;
      try {
        setMessages(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse stored chat history", e);
      }
    });
  }, []);

  const saveMessages = async (newMessages: Msg[]) => {
    setMessages(newMessages);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newMessages));
    } catch (err) {
      console.error("Failed to save message history", err);
    }
  };

  const send = async (text: string) => {
    const content = text.trim();
    if (!content || loading) return;

    const userMsg: Msg = { id: `u-${Date.now()}`, role: "user", content };
    const next = [...messages, userMsg];

    const netState = await NetInfo.fetch();
    if (!netState.isConnected) {
      await saveMessages([
        ...next,
        {
          id: `e-${Date.now()}`,
          role: "assistant",
          content:
            "You're currently offline. Please check your internet connection.",
        },
      ]);
      return;
    }

    await saveMessages(next);
    setLoading(true);

    try {
      const history = next.slice(0, -1).map((m) => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.content }],
      }));

      const reply = await askGemini(history, content);

      await saveMessages([
        ...next,
        { id: `a-${Date.now()}`, role: "assistant", content: reply },
      ]);
    } catch (error: any) {
      console.error(error);
      await saveMessages([
        ...next,
        {
          id: `e-${Date.now()}`,
          role: "assistant",
          content: getErrorMessage(error),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = async () => {
    await AsyncStorage.removeItem(STORAGE_KEY);
    setMessages([]);
  };

  return { messages, loading, send, clearChat };
}
