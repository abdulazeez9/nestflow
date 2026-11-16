import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function MapScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center bg-background px-8">
      <View className="h-28 w-28 items-center justify-center rounded-full bg-primary/10">
        <View className="h-20 w-20 items-center justify-center rounded-full bg-primary/20">
          <Ionicons name="map-outline" size={36} color="#F97316" />
        </View>
      </View>

      <Text className="mt-8 text-center text-2xl font-bold text-navy">
        The map lives in our mobile app
      </Text>

      <Text className="mt-3 max-w-sm text-center text-base leading-6 text-content-muted">
        We're sorry for the detour. Interactive maps work best on your phone,
        where you can explore neighbourhoods and see homes near you.
      </Text>

      <Pressable
        onPress={() => router.back()}
        className="mt-8 flex-row items-center rounded-full bg-primary px-6 py-3 active:opacity-90"
      >
        <Ionicons name="arrow-back" size={18} color="#fff" />
        <Text className="ml-2 text-base font-bold text-background">
          Back to listings
        </Text>
      </Pressable>
    </View>
  );
}
