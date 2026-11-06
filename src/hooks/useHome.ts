import { properties as initialProperties } from "@/constants/data";
import { useFilters } from "@/hooks/useFilters";
import { FilterCategory } from "@/types/filters";
import { Property, PropertyCategory } from "@/types/property";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useFilteredProperties } from "./useFilteredProperties";

export function useHome() {
  const router = useRouter();
  const filters = useFilters();

  const [userName, setUserName] = useState("Guest");
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [selectedCategory, setSelectedCategory] =
    useState<FilterCategory>("All");
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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

  const openFilter = () => router.push("/filter");

  const filteredProperties = useFilteredProperties(
    properties,
    selectedCategory,
    searchQuery,
    filters,
  );

  return {
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
  };
}
