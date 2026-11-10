import Screen from "@/components/ui/Screen";
import { properties } from "@/constants/data";
import { useFilters } from "@/hooks/useFilters";
import {
  DEFAULT_FILTERS,
  FilterCategory,
  PropertyFilters,
} from "@/types/filters";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";

const PROPERTY_TYPES: FilterCategory[] = [
  "All",
  ...Array.from(new Set(properties.map((p) => p.category))),
];

const BEDROOMS = [
  { label: "Any", value: 0 },
  { label: "1+", value: 1 },
  { label: "2+", value: 2 },
  { label: "3+", value: 3 },
];

const BATHROOMS = [
  { label: "Any", value: 0 },
  { label: "1+", value: 1 },
  { label: "2+", value: 2 },
  { label: "3+", value: 3 },
];

function Chip({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className={`rounded-full border px-4 py-2 ${
        selected ? "border-navy bg-navy" : "border-border bg-background"
      }`}
    >
      <Text
        className={`text-sm font-medium ${
          selected ? "text-background" : "text-content"
        }`}
      >
        {label}
      </Text>
    </Pressable>
  );
}

export default function FilterScreen() {
  const router = useRouter();
  const initial = useFilters();
  const [filters, setFilters] = useState<PropertyFilters>(initial);

  const update = <K extends keyof PropertyFilters>(
    key: K,
    value: PropertyFilters[K],
  ) => setFilters((prev) => ({ ...prev, [key]: value }));

  return (
    <Screen>
      {/* Header */}
      <View className="flex-row items-center justify-between border-b border-border px-4 py-3">
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <Ionicons name="arrow-back" size={22} color="#0F172A" />
        </Pressable>
        <Text className="text-lg font-bold text-content">Filters</Text>
        <View className="w-[22px]" />
      </View>

      <ScrollView
        className="flex-1"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ padding: 16, gap: 24 }}
      >
        <View className="gap-3">
          <Text className="text-base font-bold text-content">
            Property Type
          </Text>
          <View className="flex-row flex-wrap gap-2">
            {PROPERTY_TYPES.map((type) => (
              <Chip
                key={type}
                label={type}
                selected={filters.propertyType === type}
                onPress={() => update("propertyType", type)}
              />
            ))}
          </View>
        </View>

        <View className="gap-3">
          <Text className="text-base font-bold text-content">Price Range</Text>
          <View className="flex-row items-center gap-3">
            <TextInput
              value={filters.minPrice}
              onChangeText={(t) => update("minPrice", t.replace(/[^0-9]/g, ""))}
              placeholder="Min"
              placeholderTextColor="#9CA3AF"
              keyboardType="number-pad"
              className="h-12 flex-1 rounded-xl border border-border bg-background-input px-3 text-sm text-content"
            />
            <Text className="text-content-muted">-</Text>
            <TextInput
              value={filters.maxPrice}
              onChangeText={(t) => update("maxPrice", t.replace(/[^0-9]/g, ""))}
              placeholder="Max"
              placeholderTextColor="#9CA3AF"
              keyboardType="number-pad"
              className="h-12 flex-1 rounded-xl border border-border bg-background-input px-3 text-sm text-content"
            />
          </View>
        </View>

        <View className="gap-3">
          <Text className="text-base font-bold text-content">Bedrooms</Text>
          <View className="flex-row flex-wrap gap-2">
            {BEDROOMS.map((o) => (
              <Chip
                key={o.label}
                label={o.label}
                selected={filters.bedrooms === o.value}
                onPress={() => update("bedrooms", o.value)}
              />
            ))}
          </View>
        </View>

        <View className="gap-3">
          <Text className="text-base font-bold text-content">Bathrooms</Text>
          <View className="flex-row flex-wrap gap-2">
            {BATHROOMS.map((o) => (
              <Chip
                key={o.label}
                label={o.label}
                selected={filters.bathrooms === o.value}
                onPress={() => update("bathrooms", o.value)}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <View className="flex-row gap-3 border-t border-border bg-background px-4 pb-6 pt-3">
        <Pressable
          onPress={() => setFilters(DEFAULT_FILTERS)}
          className="flex-1 items-center rounded-full border border-border py-4"
        >
          <Text className="text-base font-bold text-content">Reset</Text>
        </Pressable>
        <Pressable
          onPress={() =>
            router.navigate({
              pathname: "/home",
              params: { ...filters },
            })
          }
          className="flex-1 items-center rounded-full bg-primary py-4"
        >
          <Text className="text-base font-bold text-background">Apply</Text>
        </Pressable>
      </View>
    </Screen>
  );
}
