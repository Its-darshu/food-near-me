import type { ShopLocation } from "@food-near-me/shared";

const EARTH_RADIUS_KM = 6371;

const toRadians = (value: number): number => (value * Math.PI) / 180;

export const distanceInKm = (a: ShopLocation, b: ShopLocation): number => {
  const latDiff = toRadians(b.latitude - a.latitude);
  const lonDiff = toRadians(b.longitude - a.longitude);

  const haversine =
    Math.sin(latDiff / 2) ** 2 +
    Math.cos(toRadians(a.latitude)) *
      Math.cos(toRadians(b.latitude)) *
      Math.sin(lonDiff / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));
  return Number((EARTH_RADIUS_KM * c).toFixed(2));
};
