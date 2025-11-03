import { Router } from "express";
import type { GeolocationQuery } from "@food-near-me/shared";
import { getShopById, getShops } from "../services/shops";

const router = Router();

router.get("/", async (req, res) => {
  const { latitude, longitude, radiusKm, category, searchTerm } = req.query;

  const query: GeolocationQuery = {
    latitude: typeof latitude === "string" ? Number(latitude) : undefined,
    longitude: typeof longitude === "string" ? Number(longitude) : undefined,
    radiusKm: typeof radiusKm === "string" ? Number(radiusKm) : undefined,
    category: typeof category === "string" ? (category as GeolocationQuery["category"]) : undefined,
    searchTerm: typeof searchTerm === "string" ? searchTerm : undefined
  };

  try {
    const shops = await getShops(query);
    res.json({ shops, timestamp: new Date().toISOString() });
  } catch (error) {
    console.error("Failed to fetch shops", error);
    res.status(500).json({ message: "Unable to fetch shops" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const shop = await getShopById(req.params.id);
    if (!shop) {
      res.status(404).json({ message: "Shop not found" });
      return;
    }
    res.json(shop);
  } catch (error) {
    console.error("Failed to fetch shop", error);
    res.status(500).json({ message: "Unable to fetch shop details" });
  }
});

export default router;
