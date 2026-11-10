import Screen from "@/components/ui/Screen";
import { properties } from "@/constants/data";
import { useFavoritesStore } from "@/store/favoritesStore";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

export default function PropertyDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { width } = useWindowDimensions();

  const property = properties.find((p) => p.id === id);

  const [activeIndex, setActiveIndex] = useState(0);
  const isSaved = useFavoritesStore((s) => s.favorites.includes(id));
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);

  if (!property) {
    return (
      <Screen>
        <View className="flex-1 items-center justify-center p-4">
          <Text className="font-semibold text-content">Property not found</Text>
          <Pressable
            onPress={() => router.back()}
            className="mt-4 rounded-full bg-primary px-6 py-3"
          >
            <Text className="font-bold text-background">Go Back</Text>
          </Pressable>
        </View>
      </Screen>
    );
  }

  const formatPrice = (amount: number, currency: string) => {
    const symbol = currency === "NGN" ? "₦" : "$";
    return `${symbol}${amount.toLocaleString()}`;
  };

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / width);
    setActiveIndex(index);
  };

  const handleContactAgent = () => {
    // TODO: hook up to call / message / email the agent
  };

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* Image gallery */}
        <View className="relative h-80 w-full bg-background-input">
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
          >
            {property.images.map((uri, index) => (
              <Image
                key={`${uri}-${index}`}
                source={typeof uri === "number" ? uri : { uri }}
                style={{ width, height: "100%" }}
                contentFit="cover"
                transition={250}
              />
            ))}
          </ScrollView>

          {/* Top actions */}
          <View className="absolute left-4 right-4 top-10 flex-row items-center justify-between">
            <Pressable
              onPress={() => router.back()}
              className="h-10 w-10 items-center justify-center rounded-full bg-background/90 shadow-sm"
            >
              <Ionicons name="chevron-back" size={20} color="#0F172A" />
            </Pressable>

            <Pressable
              onPress={() => toggleFavorite(property.id)}
              className="h-10 w-10 items-center justify-center rounded-full bg-background/90 shadow-sm"
            >
              <Ionicons
                name={isSaved ? "heart" : "heart-outline"}
                size={20}
                color={isSaved ? "#EF4444" : "#0F172A"}
              />
            </Pressable>
          </View>

          {/* Image counter */}
          {property.images.length > 1 ? (
            <View className="absolute bottom-3 right-3 rounded-full bg-navy/80 px-2.5 py-1">
              <Text className="text-xs font-medium text-background">
                {`${activeIndex + 1} / ${property.images.length}`}
              </Text>
            </View>
          ) : null}

          {/* Dots */}
          {property.images.length > 1 ? (
            <View className="absolute bottom-3 left-0 right-0 flex-row items-center justify-center gap-1.5">
              {property.images.map((_, index) => (
                <View
                  key={index}
                  className={`h-1.5 rounded-full ${
                    index === activeIndex
                      ? "w-5 bg-background"
                      : "w-1.5 bg-background/50"
                  }`}
                />
              ))}
            </View>
          ) : null}
        </View>

        {/* Details */}
        <View className="gap-5 p-4">
          {/* Badges */}
          <View className="flex-row items-center gap-2">
            {property.isFeatured ? (
              <View className="rounded-full bg-primary px-3 py-1">
                <Text className="text-xs font-semibold uppercase tracking-wider text-background">
                  Featured
                </Text>
              </View>
            ) : null}
            <View className="rounded-full bg-navy/80 px-2.5 py-1">
              <Text className="text-xs font-medium text-background">
                {property.type}
              </Text>
            </View>
          </View>

          {/* Title, location, rating */}
          <View className="gap-2">
            <Text className="text-2xl font-bold text-navy">
              {property.title}
            </Text>

            <View className="flex-row items-center">
              <TouchableOpacity
                onPress={(e) => {
                  e.stopPropagation();
                  router.push("/map");
                }}
                activeOpacity={0.8}
              >
                <Ionicons name="location-outline" size={16} color="#6B7280" />
              </TouchableOpacity>
              <Text
                numberOfLines={1}
                className="ml-1 flex-1 text-sm text-content-muted"
              >
                {property.location.address}
              </Text>
            </View>
            <View className="flex-row items-center">
              <Ionicons name="star" size={14} color="#F97316" />
              <Text className="ml-1 text-sm font-bold text-content">
                {String(property.rating)}
              </Text>
              <Text className="ml-1 text-sm text-content-muted">
                {`(${property.reviewsCount} reviews)`}
              </Text>
            </View>
          </View>

          {/* Price */}
          <View className="flex-row items-baseline">
            <Text className="text-2xl font-extrabold text-primary">
              {formatPrice(property.price, property.currency)}
            </Text>
            <Text className="ml-1 text-sm text-content-muted">
              {`/ ${property.pricePeriod.toLowerCase()}`}
            </Text>
          </View>

          {/* Key stats */}
          <View className="flex-row rounded-2xl border border-border py-4">
            <View className="flex-1 items-center gap-1">
              <Ionicons name="bed-outline" size={22} color="#6B7280" />
              <Text className="text-sm font-semibold text-content">
                {property.bedrooms}
              </Text>
              <Text className="text-xs text-content-muted">Beds</Text>
            </View>

            <View className="w-[1px] bg-border" />

            <View className="flex-1 items-center gap-1">
              <Ionicons name="water-outline" size={22} color="#6B7280" />
              <Text className="text-sm font-semibold text-content">
                {property.bathrooms}
              </Text>
              <Text className="text-xs text-content-muted">Baths</Text>
            </View>

            <View className="w-[1px] bg-border" />

            <View className="flex-1 items-center gap-1">
              <Ionicons name="scan-outline" size={22} color="#6B7280" />
              <Text className="text-sm font-semibold text-content">
                {`${property.area} m²`}
              </Text>
              <Text className="text-xs text-content-muted">Area</Text>
            </View>
          </View>

          {/* Description */}
          <View className="gap-2">
            <Text className="text-lg font-bold text-content">Description</Text>
            <Text className="text-sm leading-6 text-content-muted">
              {property.description}
            </Text>
          </View>

          {/* Agent */}
          <View className="gap-3">
            <Text className="text-lg font-bold text-content">Listed by</Text>
            <View className="flex-row items-center rounded-2xl border border-border p-3">
              <Image
                source={{ uri: property.agent.avatar }}
                className="h-12 w-12 rounded-full bg-background-canvas"
                contentFit="cover"
              />
              <View className="ml-3 flex-1">
                <Text className="text-base font-semibold text-content">
                  {property.agent.name}
                </Text>
                <Text className="text-xs text-content-muted">
                  Property Agent
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Fixed bottom button */}
      <View className="absolute bottom-0 left-0 right-0 border-t border-border bg-background px-4 pb-6 pt-3">
        <Pressable
          onPress={handleContactAgent}
          className="flex-row items-center justify-center rounded-full bg-primary py-4 active:opacity-90"
        >
          <Ionicons name="chatbubble-ellipses-outline" size={18} color="#fff" />
          <Text className="ml-2 text-base font-bold text-background">
            Contact Agent
          </Text>
        </Pressable>
      </View>
    </>
  );
}
