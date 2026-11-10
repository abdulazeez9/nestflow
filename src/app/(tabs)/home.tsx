import PropertyCard from "@/components/Card";
import Search from "@/components/Search";
import Screen from "@/components/ui/Screen";
import { useHome } from "@/hooks/useHome";
import { Ionicons } from "@expo/vector-icons";
import {
  FlatList,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function HomeScreen() {
  const {
    userName,
    categories,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    refreshing,
    onRefresh,
    filteredProperties,
    handleFavoriteToggle,
    handlePropertyPress,
    openFilter,
  } = useHome();

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

        <Pressable className="rounded-full  p-3 dark:bg-slate-800">
          <Ionicons name="notifications-outline" size={22} color="#FFFFFF" />
        </Pressable>
      </View>

      <Search
        value={searchQuery}
        onChangeText={setSearchQuery}
        onFilterPress={openFilter}
        placeholder="Search for locations, properties, or agents etc."
      />

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
                    ? "bg-navy border-navy"
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
        ListHeaderComponent={renderHeader()}
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
