export interface Location {
  latitude: number;
  longitude: number;
  address: string;
}

export interface Apartment {
  id: number;
  unitName: string;
  unitNumber: string;
  project: string;
  description: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  amenities: string[];
  featured: boolean;
  images: string[];
  location?: Location;
  propertyType: string;
  createdAt: string;
  updatedAt: string;
}
