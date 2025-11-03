import { Router } from "express";
import type { GeolocationQuery } from "@food-near-me/shared";
import { getShopById, getShops } from "../data/shops";

const router = Router();

router.get("/", (req, res) => {
  const { latitude, longitude, radiusKm, category, searchTerm } = req.query;

  const query: GeolocationQuery = {
    latitude: typeof latitude === "string" ? Number(latitude) : undefined,
    longitude: typeof longitude === "string" ? Number(longitude) : undefined,
    radiusKm: typeof radiusKm === "string" ? Number(radiusKm) : undefined,
    category: typeof category === "string" ? (category as GeolocationQuery["category"]) : undefined,
    searchTerm: typeof searchTerm === "string" ? searchTerm : undefined
  };

  const shops = getShops(query);
  res.json({ shops, timestamp: new Date().toISOString() });
});

router.get("/:id", (req, res) => {
  const shop = getShopById(req.params.id);
  if (!shop) {
    res.status(404).json({ message: "Shop not found" });
    return;
  }
  res.json(shop);
});

export default router;
