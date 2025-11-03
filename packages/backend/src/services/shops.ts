import type { GeolocationQuery, Shop } from "@food-near-me/shared";
import type { ShopLocation } from "@food-near-me/shared";
import { staticShops } from "../data/shops";
import { distanceInKm } from "../utils/geo";
import { getFirestoreClient, getShopsCollectionName } from "../config/firebase";

const DEFAULT_COORDINATES: Pick<ShopLocation, "latitude" | "longitude"> = {
  latitude: 12.9716,
  longitude: 77.5946
};

const matchesCategory = (shop: Shop, category?: string): boolean => {
  if (!category) {
    return true;
  }
  return shop.category === category;
};

const matchesSearch = (shop: Shop, searchTerm?: string): boolean => {
  if (!searchTerm) {
    return true;
  }
  const normalized = searchTerm.toLowerCase();
  return (
    shop.name.toLowerCase().includes(normalized) ||
    shop.tags?.some((tag) => tag.toLowerCase().includes(normalized)) ||
    shop.location.address.toLowerCase().includes(normalized)
  );
};

const enrichWithDistance = (shops: Shop[], reference: ShopLocation): Shop[] =>
  shops.map((shop) => {
    const distanceKm = distanceInKm(reference, shop.location);
    return {
      ...shop,
      location: {
        ...shop.location,
        distanceKm
      }
    };
  });

let hasLoggedCollectionReadError = false;
let hasLoggedDocumentReadError = false;

const loadShopsFromFirestore = async (): Promise<Shop[] | null> => {
  const firestore = getFirestoreClient();
  if (!firestore) {
    return null;
  }

  try {
    const snapshot = await firestore.collection(getShopsCollectionName()).get();
    if (snapshot.empty) {
      return [];
    }
    return snapshot.docs.map((doc) => doc.data() as Shop);
  } catch (error) {
    if (!hasLoggedCollectionReadError) {
      console.error("[firebase] Failed to fetch shops from Firestore", error);
      hasLoggedCollectionReadError = true;
    }
    return null;
  }
};

export const getShops = async (query: GeolocationQuery): Promise<Shop[]> => {
  const baseReference: ShopLocation = {
    address: "",
    latitude: query.latitude ?? DEFAULT_COORDINATES.latitude,
    longitude: query.longitude ?? DEFAULT_COORDINATES.longitude
  };

  const datastoreShops = await loadShopsFromFirestore();
  const dataset = datastoreShops ?? staticShops;

  return enrichWithDistance(dataset, baseReference)
    .filter((shop) => matchesCategory(shop, query.category))
    .filter((shop) => matchesSearch(shop, query.searchTerm))
    .filter((shop) => {
      if (!query.radiusKm) {
        return true;
      }
      return (shop.location.distanceKm ?? Number.POSITIVE_INFINITY) <= query.radiusKm;
    })
    .sort((a, b) => (a.location.distanceKm ?? 0) - (b.location.distanceKm ?? 0));
};

export const getShopById = async (id: string): Promise<Shop | undefined> => {
  const firestore = getFirestoreClient();
  if (firestore) {
    try {
      const snapshot = await firestore.collection(getShopsCollectionName()).doc(id).get();
      if (snapshot.exists) {
        return snapshot.data() as Shop;
      }
    } catch (error) {
      if (!hasLoggedDocumentReadError) {
        console.error("[firebase] Failed to fetch shop from Firestore", error);
        hasLoggedDocumentReadError = true;
      }
    }
  }

  return staticShops.find((shop) => shop.id === id);
};
