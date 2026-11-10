export interface Agent {
  id: string;
  name: string;
  phone: string;
  email?: string;
  avatar: string;
  rating?: number;
}

export interface PropertyLocation {
  address: string;
  city: string;
  state: string;
  latitude: number;
  longitude: number;
}

export type PropertyType =
  "Rent" | "Sale" | "Lease" | "Shortlet" | "Lease-to-Own";

export type PropertyCategory =
  | "Apartment"
  | "Duplex"
  | "Detached House"
  | "Terraced House"
  | "Bungalow"
  | "Mansion"
  | "Mini Flat"
  | "Cottage"
  | "Shophouse"
  | "Penthouse"
  | "Semi-Detached House"
  | "Villa"
  | "Studio Apartment"
  | "Land"
  | "Commercial Property"
  | "Office Space"
  | "Warehouse";

export type PricePeriod = "Daily" | "Weekly" | "Monthly" | "Yearly" | "Total";

export interface Property {
  id: string;
  title: string;
  type: PropertyType;
  category: PropertyCategory;
  price: number;
  currency: string;
  pricePeriod: PricePeriod;
  bedrooms: number;
  bathrooms: number;
  area: number;
  location: PropertyLocation;
  images: number[];
  features: string[];
  rating: number;
  reviewsCount: number;
  agent: Agent;
  description: string;
  isFeatured: boolean;
  isSaved?: boolean;
}
