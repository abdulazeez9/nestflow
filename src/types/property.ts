
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
  latitude?: number;
  longitude?: number;
}

export interface Property {
  id: string;
  title: string;
  type: 'Rent' | 'Sale';
  category: string;
  price: number;
  currency: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  location: PropertyLocation;
  images: string[];
  features: string[];
  rating: number;
  reviewsCount: number;
  agent: Agent;
  description: string;
  isFeatured: boolean;
  isSaved?: boolean;
}