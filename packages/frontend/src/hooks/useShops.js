import { useCallback, useEffect, useMemo, useState } from "react";
const defaultFilters = {
    category: "all",
    searchTerm: ""
};
const buildQuery = (filters, coords) => {
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
const useShops = ({ initialFilters } = {}) => {
    const [filters, setFilters] = useState(initialFilters ?? defaultFilters);
    const [coords, setCoords] = useState();
    const [shops, setShops] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const fetchShops = useCallback(async (activeFilters, activeCoords) => {
        setIsLoading(true);
        setError(null);
        try {
            const query = buildQuery(activeFilters, activeCoords);
            const response = await fetch(`/api/shops${query ? `?${query}` : ""}`);
            if (!response.ok) {
                throw new Error("Unable to fetch shops");
            }
            const payload = (await response.json());
            setShops(payload.shops);
        }
        catch (err) {
            setError(err instanceof Error ? err.message : "Unexpected error");
        }
        finally {
            setIsLoading(false);
        }
    }, []);
    const requestLocation = useCallback(() => {
        if (!("geolocation" in navigator)) {
            setError("Geolocation is not supported by this browser.");
            return;
        }
        navigator.geolocation.getCurrentPosition((position) => {
            setCoords(position.coords);
        }, (geoError) => {
            setError(geoError.message);
        });
    }, []);
    useEffect(() => {
        fetchShops(filters, coords);
    }, [coords, fetchShops, filters]);
    const setCategory = useCallback((category) => {
        setFilters((prev) => ({ ...prev, category }));
    }, []);
    const setSearchTerm = useCallback((searchTerm) => {
        setFilters((prev) => ({ ...prev, searchTerm }));
    }, []);
    const value = useMemo(() => ({
        shops,
        isLoading,
        error,
        filters,
        setCategory,
        setSearchTerm,
        requestLocation
    }), [error, filters, isLoading, requestLocation, setCategory, setSearchTerm, shops]);
    return value;
};
export default useShops;
