import { PropertyCategory } from "@/types/property";

export type FilterCategory = PropertyCategory | "All";

export interface PropertyFilters {
  propertyType: FilterCategory;
  minPrice: string;
  maxPrice: string;
  bedrooms: number;
  bathrooms: number;
}

export const DEFAULT_FILTERS: PropertyFilters = {
  propertyType: "All",
  minPrice: "",
  maxPrice: "",
  bedrooms: 0,
  bathrooms: 0,
};

export type FilterParams = {
  [K in keyof PropertyFilters]?: string;
};
