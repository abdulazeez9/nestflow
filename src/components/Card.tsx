import { useFavoritesStore } from "@/store/favoritesStore";
import { Property } from "@/types/property";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import {
  GestureResponderEvent,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface PropertyCardProps {
  property: Property;
  onPress?: (property: Property) => void;
  onFavoriteToggle?: (id: string, isSaved: boolean) => void;
}

export default function PropertyCard({
  property,
  onPress,
  onFavoriteToggle,
}: PropertyCardProps) {
  const router = useRouter();

  const formatPrice = (amount: number, currency: string) => {
    const symbol = currency === "NGN" ? "₦" : "$";
    return `${symbol}${amount.toLocaleString()}`;
  };

  const isSaved = useFavoritesStore((state) =>
    state.favorites.includes(property.id),
  );
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);

  const handleFavoritePress = (e: GestureResponderEvent) => {
    e.stopPropagation();
    toggleFavorite(property.id);
    onFavoriteToggle?.(property.id, !isSaved);
  };

  return (
    <Pressable
      onPress={() => onPress?.(property)}
      className="mb-4 overflow-hidden rounded-2xl border border-border bg-background shadow-sm active:opacity-95"
    >
      <View className="relative h-52 w-full bg-background-input">
        <Image
          source={property.images[0]}
          style={{ width: "100%", height: "100%" }}
          contentFit="cover"
          transition={250}
        />

        <View className="absolute left-3 right-3 top-3 flex-row items-center justify-between">
          <View className="flex-row items-center gap-1.5">
            {property.isFeatured ? (
              <View className="rounded-full bg-primary px-3 py-1 shadow-sm">
                <Text className="text-xs font-semibold uppercase tracking-wider text-background">
                  {"Featured"}
                </Text>
              </View>
            ) : null}
            <View className="rounded-full bg-navy/80 px-2.5 py-1 backdrop-blur-md">
              <Text className="text-xs font-medium text-background">
                {property.type}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={handleFavoritePress}
            activeOpacity={0.8}
            className="h-9 w-9 items-center justify-center rounded-full bg-background/90 shadow-sm"
          >
            <Ionicons
              name={isSaved ? "heart" : "heart-outline"}
              size={18}
              color={isSaved ? "#EF4444" : "#0F172A"}
            />
          </TouchableOpacity>
        </View>

        <View className="absolute bottom-3 left-3 flex-row items-center rounded-lg bg-navy/80 px-2 py-1">
          <Ionicons name="star" size={12} color="#F97316" />
          <Text className="ml-1 text-xs font-bold text-background">
            {String(property.rating)}
          </Text>
          <Text className="ml-0.5 text-[10px] text-content-placeholder">
            {`(${property.reviewsCount})`}
          </Text>
        </View>
      </View>

      <View className="p-4">
        <View className="flex-row items-start justify-between">
          <Text
            numberOfLines={1}
            className="flex-1 text-base font-bold text-content"
          >
            {property.title}
          </Text>
        </View>

        <View className="mt-1 flex-row items-center">
          <TouchableOpacity
            onPress={(e) => {
              e.stopPropagation();
              router.push("/map");
            }}
            activeOpacity={0.8}
            hitSlop={8}
            className="mt-1 flex-row items-center"
          >
            <Ionicons name="location-outline" size={14} color="#6B7280" />
            <Text
              numberOfLines={1}
              className="ml-1 flex-1 text-xs text-content-muted"
            >
              {property.location.address}
            </Text>
          </TouchableOpacity>
        </View>

        <View className="mt-3.5 flex-row items-center justify-between border-y border-border py-2.5">
          <View className="flex-row items-center">
            <Ionicons name="bed-outline" size={16} color="#6B7280" />
            <Text className="ml-1.5 text-xs font-medium text-content">
              {`${property.bedrooms} Beds`}
            </Text>
          </View>

          <View className="h-3 w-[1px] bg-border" />

          <View className="flex-row items-center">
            <Ionicons name="water-outline" size={16} color="#6B7280" />
            <Text className="ml-1.5 text-xs font-medium text-content">
              {`${property.bathrooms} Baths`}
            </Text>
          </View>

          <View className="h-3 w-[1px] bg-border" />

          <View className="flex-row items-center">
            <Ionicons name="scan-outline" size={16} color="#6B7280" />
            <Text className="ml-1.5 text-xs font-medium text-content">
              {`${property.area} m²`}
            </Text>
          </View>
        </View>

        <View className="mt-3.5 flex-row items-center justify-between">
          <View>
            <View className="flex-row items-baseline">
              <Text className="text-lg font-extrabold text-primary">
                {formatPrice(property.price, property.currency)}
              </Text>
              <Text className="ml-1 text-xs text-content-muted">
                {`/ ${property.pricePeriod.toLowerCase()}`}
              </Text>
            </View>
          </View>

          <View className="flex-row items-center">
            <Image
              source={property.agent.avatar}
              className="h-7 w-7 rounded-full bg-background-canvas"
              contentFit="cover"
            />
          </View>
        </View>
      </View>
    </Pressable>
  );
}
