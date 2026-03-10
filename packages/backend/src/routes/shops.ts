import { Router } from "express";
import type { Response } from "express";
import multer from "multer";
import type { GeolocationQuery, ShopInput } from "@food-near-me/shared";
import {
  createShop,
  deleteShop,
  getShopById,
  getShops,
  updateShop
} from "../services/shops";
import { uploadShopImage } from "../services/storage";

const router = Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });

const parseNumber = (value: unknown, field: string): number => {
  if (typeof value === "number") {
    return value;
  }
  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value);
    if (!Number.isNaN(parsed)) {
      return parsed;
    }
  }
  throw new Error(`Invalid ${field}`);
};

const parseContact = (raw: unknown): ShopInput["contact"] => {
  if (!raw || typeof raw !== "object") {
    throw new Error("Invalid contact information");
  }
  const contact = raw as Record<string, unknown>;
  if (typeof contact.phoneNumber !== "string" || !contact.phoneNumber.trim()) {
    throw new Error("Contact phoneNumber is required");
  }
  return {
    phoneNumber: contact.phoneNumber.trim(),
    whatsappNumber:
      typeof contact.whatsappNumber === "string" && contact.whatsappNumber.trim()
        ? contact.whatsappNumber.trim()
        : undefined
  };
};

const parseLocation = (raw: unknown): ShopInput["location"] => {
  if (!raw || typeof raw !== "object") {
    throw new Error("Invalid location information");
  }
  const location = raw as Record<string, unknown>;
  if (typeof location.address !== "string" || !location.address.trim()) {
    throw new Error("Location address is required");
  }
  const distanceValue = location.distanceKm;
  const distanceKm =
    distanceValue === undefined || distanceValue === null
      ? undefined
      : parseNumber(distanceValue, "location.distanceKm");
  return {
    address: location.address.trim(),
    latitude: parseNumber(location.latitude, "location.latitude"),
    longitude: parseNumber(location.longitude, "location.longitude"),
    distanceKm
  };
};

const parseTags = (raw: unknown): string[] | undefined => {
  if (!raw) {
    return undefined;
  }
  if (Array.isArray(raw)) {
    return raw.map((value) => String(value));
  }
  if (typeof raw === "string") {
    return raw
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean);
  }
  return undefined;
};

const ensureCategory = (value: unknown): ShopInput["category"] => {
  if (typeof value === "string" && value.trim()) {
    return value.trim() as ShopInput["category"];
  }
  throw new Error("Category is required");
};

const parseShopInput = (raw: unknown): ShopInput => {
  if (!raw || typeof raw !== "object") {
    throw new Error("Invalid shop payload");
  }

  const body = raw as Record<string, unknown>;
  const defaultImage = "https://placehold.co/600x400/FF4E00/FFF?text=Food+Near+Me";

  return {
    id: typeof body.id === "string" && body.id.trim() ? body.id.trim() : undefined,
    name: typeof body.name === "string" ? body.name.trim() : "Untitled Shop",
    category: ensureCategory(body.category),
    rating: parseNumber(body.rating ?? 0, "rating"),
    description:
      typeof body.description === "string" && body.description.trim()
        ? body.description.trim()
        : undefined,
    imageUrl:
      typeof body.imageUrl === "string" && body.imageUrl.trim()
        ? body.imageUrl.trim()
        : defaultImage,
    storagePath:
      typeof body.storagePath === "string" && body.storagePath.trim()
        ? body.storagePath.trim()
        : undefined,
    contact: parseContact(body.contact),
    location: parseLocation(body.location),
    tags: parseTags(body.tags)
  };
};

const parseShopUpdate = (raw: unknown): Partial<ShopInput> => {
  if (!raw || typeof raw !== "object") {
    throw new Error("Invalid shop payload");
  }

  const body = raw as Record<string, unknown>;
  const payload: Partial<ShopInput> = {};

  if (typeof body.name === "string") {
    payload.name = body.name.trim();
  }
  if (typeof body.category === "string") {
    payload.category = body.category.trim() as ShopInput["category"];
  }
  if (body.rating !== undefined) {
    payload.rating = parseNumber(body.rating, "rating");
  }
  if (typeof body.description === "string") {
    payload.description = body.description.trim();
  }
  if (typeof body.imageUrl === "string") {
    payload.imageUrl = body.imageUrl.trim();
  }
  if (typeof body.storagePath === "string") {
    payload.storagePath = body.storagePath.trim();
  }
  if (body.tags !== undefined) {
    payload.tags = parseTags(body.tags);
  }
  if (body.contact) {
    payload.contact = parseContact(body.contact);
  }
  if (body.location) {
    payload.location = parseLocation(body.location);
  }

  return payload;
};

const handleServiceError = (error: unknown, res: Response): void => {
  const message = error instanceof Error ? error.message : "Unexpected error";
  const status =
    message.includes("not configured") || message.includes("Firestore") ? 503 :
    message.includes("not found") ? 404 : 500;
  res.status(status).json({ message });
};

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
    handleServiceError(error, res);
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
    handleServiceError(error, res);
  }
});

router.post("/", async (req, res) => {
  try {
    const payload = parseShopInput(req.body);
    const shop = await createShop(payload);
    res.status(201).json(shop);
  } catch (error) {
    console.error("Failed to create shop", error);
    handleServiceError(error, res);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const payload = parseShopUpdate(req.body);
    const shop = await updateShop(req.params.id, payload);
    res.json(shop);
  } catch (error) {
    console.error("Failed to update shop", error);
    handleServiceError(error, res);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await deleteShop(req.params.id);
    res.status(204).send();
  } catch (error) {
    console.error("Failed to delete shop", error);
    handleServiceError(error, res);
  }
});

router.post("/:id/image", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      res.status(400).json({ message: "Image file is required" });
      return;
    }

    const uploadResult = await uploadShopImage(req.file, req.params.id);
    const updated = await updateShop(req.params.id, {
      imageUrl: uploadResult.url,
      storagePath: uploadResult.path
    });

    res.json(updated);
  } catch (error) {
    console.error("Failed to upload shop image", error);
    handleServiceError(error, res);
  }
});

export default router;
