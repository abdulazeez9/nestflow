import PropertyCard from "@/components/Card";
import Screen from "@/components/ui/Screen";
import { properties as initialProperties } from "@/constants/data";
import { Property, PropertyCategory } from "@/types/property";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  FlatList,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";

type FilterCategory = PropertyCategory | "All";

export default function HomeScreen() {
  const router = useRouter();

  const [userName, setUserName] = useState("Guest");
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [selectedCategory, setSelectedCategory] =
    useState<FilterCategory>("All");
  const [refreshing, setRefreshing] = useState(false);

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(properties.map((p) => p.category)),
    ) as PropertyCategory[];
    return ["All", ...uniqueCategories] as FilterCategory[];
  }, [properties]);

  const fetchUserData = async () => {
    try {
      const savedName = await AsyncStorage.getItem("user_name");
      if (savedName) {
        setUserName(savedName);
      }
    } catch (error) {
      console.error("Error fetching user name:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([
      fetchUserData(),
      new Promise((resolve) => setTimeout(resolve, 1200)),
    ]);
    setRefreshing(false);
  }, []);

  const handleFavoriteToggle = (id: string, isSaved: boolean) => {
    setProperties((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isSaved } : item)),
    );
  };

  const handlePropertyPress = (property: Property) => {
    router.push({
      pathname: "/property/[id]",
      params: { id: property.id },
    });
  };

  const filteredProperties = useMemo(() => {
    if (selectedCategory === "All") return properties;
    return properties.filter((p) => p.category === selectedCategory);
  }, [properties, selectedCategory]);

  const renderHeader = () => (
    <View className="mb-4 gap-6">
      {/* Header / Greeting */}
      <View className="flex-row items-center justify-between">
        <View>
          <Text className="text-sm font-medium text-content-placeholder">
            Welcome back 👋
          </Text>
          <Text className="text-2xl font-bold text-navy">{userName}</Text>
        </View>

        <Pressable className="rounded-full bg-gray-100 p-3 dark:bg-slate-800">
          <Ionicons name="notifications-outline" size={22} color="#0F172A" />
        </Pressable>
      </View>

      {/* Dynamic Category Filter Chips */}
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 8 }}
        >
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <Pressable
                key={cat}
                onPress={() => setSelectedCategory(cat)}
                className={`rounded-full px-4 py-2 border ${
                  isActive
                    ? "bg-primary border-primary"
                    : "bg-background border-border"
                }`}
              >
                <Text
                  className={`text-xs font-semibold ${
                    isActive ? "text-background" : "text-content"
                  }`}
                >
                  {cat}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      {/* Featured Properties Section Header */}
      <View className="flex-row items-center justify-between">
        <Text className="text-lg font-bold text-navy">
          {selectedCategory === "All"
            ? "Featured Properties"
            : `${selectedCategory}s`}
        </Text>
        <Pressable>
          <Text className="text-sm font-semibold text-primary">See All</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <Screen>
      <FlatList
        data={filteredProperties}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PropertyCard
            property={item}
            onPress={handlePropertyPress}
            onFavoriteToggle={handleFavoriteToggle}
          />
        )}
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#F97316"
            colors={["#F97316"]}
          />
        }
        ListEmptyComponent={
          <View className="items-center justify-center py-12">
            <Ionicons name="search-outline" size={40} color="#9CA3AF" />
            <Text className="mt-2 text-sm font-medium text-content-muted">
              No properties found in this category.
            </Text>
          </View>
        }
      />
    </Screen>
  );
}
