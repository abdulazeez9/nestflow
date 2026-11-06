import { FilterCategory, PropertyFilters } from "@/types/filters";
import { Property } from "@/types/property";
import { useMemo } from "react";

export function useFilteredProperties(
  properties: Property[],
  selectedCategory: FilterCategory,
  searchQuery: string,
  filters: PropertyFilters,
) {
  return useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const min = filters.minPrice ? Number(filters.minPrice) : 0;
    const max = filters.maxPrice ? Number(filters.maxPrice) : Infinity;

    return properties.filter((p) => {
      const matchesCategory =
        selectedCategory === "All" || p.category === selectedCategory;

      const matchesSearch =
        query === "" ||
        p.title.toLowerCase().includes(query) ||
        p.location.address.toLowerCase().includes(query) ||
        p.location.city.toLowerCase().includes(query) ||
        p.location.state.toLowerCase().includes(query);

      const matchesType =
        filters.propertyType === "All" || p.category === filters.propertyType;

      return (
        matchesCategory &&
        matchesSearch &&
        matchesType &&
        p.price >= min &&
        p.price <= max &&
        p.bedrooms >= filters.bedrooms &&
        p.bathrooms >= filters.bathrooms
      );
    });
  }, [
    properties,
    selectedCategory,
    searchQuery,
    filters.propertyType,
    filters.minPrice,
    filters.maxPrice,
    filters.bedrooms,
    filters.bathrooms,
  ]);
}
