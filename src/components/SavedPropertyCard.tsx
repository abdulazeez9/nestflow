// components/SavedPropertyCard.tsx
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

interface SavedPropertyCardProps {
  property: Property;
  onPress?: (property: Property) => void;
  onRemove?: (id: string) => void;
}

export default function SavedPropertyCard({
  property,
  onPress,
  onRemove,
}: SavedPropertyCardProps) {
  const router = useRouter();

  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);

  const formatPrice = (amount: number, currency: string) => {
    const symbol = currency === "NGN" ? "₦" : "$";
    return `${symbol}${amount.toLocaleString()}`;
  };

  const handleRemove = (e: GestureResponderEvent) => {
    e.stopPropagation();
    toggleFavorite(property.id);
    onRemove?.(property.id);
  };

  return (
    <Pressable
      onPress={() => onPress?.(property)}
      className="mb-3 flex-row overflow-hidden rounded-2xl border border-border bg-background shadow-sm active:opacity-95"
    >
      {/* Left: image */}
      <View className="relative h-32 w-32 bg-background-input">
        <Image
          source={{ uri: property.images[0] }}
          className="h-full w-full"
          contentFit="cover"
          transition={250}
        />
        {property.isFeatured ? (
          <View className="absolute left-2 top-2 rounded-full bg-primary px-2 py-0.5">
            <Text className="text-[10px] font-semibold uppercase text-background">
              Featured
            </Text>
          </View>
        ) : null}
      </View>

      {/* Right: details */}
      <View className="flex-1 justify-between px-3 py-3">
        {/* Row 1: price + heart */}
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-baseline">
            <Text className="text-base font-extrabold text-dark">
              {formatPrice(property.price, property.currency)}
            </Text>
            <Text className="ml-1 text-[10px] text-content-muted">
              {`/ ${property.pricePeriod.toLowerCase()}`}
            </Text>
          </View>

          <TouchableOpacity
            onPress={handleRemove}
            activeOpacity={0.8}
            hitSlop={8}
          >
            <Ionicons name="heart" size={20} color="#EF4444" />
          </TouchableOpacity>
        </View>

        {/* Row 2: stats */}
        <View className="flex-row items-center gap-4">
          <View className="flex-row items-center">
            <Ionicons name="bed-outline" size={14} color="#6B7280" />
            <Text className="ml-1 text-xs text-content">
              {property.bedrooms}
            </Text>
          </View>
          <View className="flex-row items-center">
            <Ionicons name="water-outline" size={14} color="#6B7280" />
            <Text className="ml-1 text-xs text-content">
              {property.bathrooms}
            </Text>
          </View>
          <View className="flex-row items-center">
            <Ionicons name="scan-outline" size={14} color="#6B7280" />
            <Text className="ml-1 text-xs text-content">{`${property.area} m²`}</Text>
          </View>
        </View>

        {/* Row 3: address */}
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
      </View>
    </Pressable>
  );
}
