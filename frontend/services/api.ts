import axios from "axios";
import { Apartment } from "../types/apartment";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchApartments = async (params?: {
  search?: string;
  unitName?: string;
  unitNumber?: string;
  project?: string;
  propertyType?: string;
  bedrooms?: string;
  priceMin?: string;
  priceMax?: string;
}): Promise<Apartment[]> => {
  const response = await api.get("/apartments", {
    params,
  });
  return response.data;
};

export const fetchApartmentById = async (id: number): Promise<Apartment> => {
  const response = await api.get(`/apartments/${id}`);
  return response.data;
};

export const createApartment = async (
  apartment: Omit<Apartment, "id" | "createdAt" | "updatedAt">,
): Promise<Apartment> => {
  const response = await api.post("/apartments", apartment);
  return response.data;
};

export default api;
