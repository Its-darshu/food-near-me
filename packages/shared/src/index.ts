export type Category = "hotel" | "bakery" | "street-food" | "other";

export interface ShopLocation {
  address: string;
  latitude: number;
  longitude: number;
  distanceKm?: number;
}

export interface ContactInfo {
  phoneNumber: string;
  whatsappNumber?: string;
}

export interface Shop {
  id: string;
  name: string;
  category: Category;
  rating: number;
  description?: string;
  imageUrl: string;
  contact: ContactInfo;
  location: ShopLocation;
  tags?: string[];
}

export interface ShopsResponse {
  shops: Shop[];
  timestamp: string;
}

export interface GeolocationQuery {
  latitude?: number;
  longitude?: number;
  radiusKm?: number;
  category?: Category;
  searchTerm?: string;
}
