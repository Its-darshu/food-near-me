import { useCallback, useEffect, useMemo, useState } from "react";
import type { Category, Shop } from "@food-near-me/shared";

export type CategoryFilter = Category | "all";

export interface ShopFilters {
  category: CategoryFilter;
  searchTerm: string;
  radiusKm?: number;
}

interface UseShopsOptions {
  initialFilters?: ShopFilters;
}

const defaultFilters: ShopFilters = {
  category: "all",
  searchTerm: ""
};

const buildQuery = (filters: ShopFilters, coords?: GeolocationCoordinates) => {
  const params = new URLSearchParams();
  if (coords) {
    params.set("latitude", coords.latitude.toString());
    params.set("longitude", coords.longitude.toString());
  }
  if (filters.radiusKm) {
    params.set("radiusKm", filters.radiusKm.toString());
  }
  if (filters.category !== "all") {
    params.set("category", filters.category);
  }
  if (filters.searchTerm.trim()) {
    params.set("searchTerm", filters.searchTerm.trim());
  }
  return params.toString();
};

const useShops = ({ initialFilters }: UseShopsOptions = {}) => {
  const [filters, setFilters] = useState<ShopFilters>(initialFilters ?? defaultFilters);
  const [coords, setCoords] = useState<GeolocationCoordinates>();
  const [shops, setShops] = useState<Shop[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchShops = useCallback(
    async (activeFilters: ShopFilters, activeCoords?: GeolocationCoordinates) => {
      setIsLoading(true);
      setError(null);
      try {
        const query = buildQuery(activeFilters, activeCoords);
        const response = await fetch(`/api/shops${query ? `?${query}` : ""}`);
        if (!response.ok) {
          throw new Error("Unable to fetch shops");
        }
        const payload = (await response.json()) as { shops: Shop[] };
        setShops(payload.shops);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unexpected error");
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const requestLocation = useCallback(() => {
    if (!("geolocation" in navigator)) {
      setError("Geolocation is not supported by this browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords(position.coords);
      },
      (geoError) => {
        setError(geoError.message);
      }
    );
  }, []);

  useEffect(() => {
    fetchShops(filters, coords);
  }, [coords, fetchShops, filters]);

  const setCategory = useCallback((category: CategoryFilter) => {
    setFilters((prev) => ({ ...prev, category }));
  }, []);

  const setSearchTerm = useCallback((searchTerm: string) => {
    setFilters((prev) => ({ ...prev, searchTerm }));
  }, []);

  const value = useMemo(
    () => ({
      shops,
      isLoading,
      error,
      filters,
      setCategory,
      setSearchTerm,
      requestLocation
    }),
    [error, filters, isLoading, requestLocation, setCategory, setSearchTerm, shops]
  );

  return value;
};

export default useShops;
