import { FilterCategory, FilterParams, PropertyFilters } from "@/types/filters";
import { useLocalSearchParams } from "expo-router";

export function useFilters(): PropertyFilters {
  const params = useLocalSearchParams<FilterParams>();

  return {
    propertyType: (params.propertyType as FilterCategory) ?? "All",
    minPrice: params.minPrice ?? "",
    maxPrice: params.maxPrice ?? "",
    bedrooms: Number(params.bedrooms ?? 0),
    bathrooms: Number(params.bathrooms ?? 0),
  };
}
