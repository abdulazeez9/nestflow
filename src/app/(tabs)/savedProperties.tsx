import SavedPropertyCard from "@/components/SavedPropertyCard";
import Screen from "@/components/ui/Screen";
import { properties } from "@/constants/data";
import { useFavoritesStore } from "@/store/favoritesStore";
import { useRouter } from "expo-router";
import { FlatList, Text, View } from "react-native";

export default function SavedProperties() {
  const favorites = useFavoritesStore((s) => s.favorites);
  const saved = properties.filter((p) => favorites.includes(p.id));
  const router = useRouter();

  return (
    <Screen>
      <View className=" pb-2">
        <Text className="text-2xl font-bold text-content">
          Saved Properties
        </Text>
      </View>
      <FlatList
        data={saved}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SavedPropertyCard
            property={item}
            onPress={(p) => router.push(`/property/${p.id}`)}
          />
        )}
        ListEmptyComponent={<Text>No saved properties yet</Text>}
        contentContainerStyle={{ padding: 3 }}
      />
    </Screen>
  );
}
