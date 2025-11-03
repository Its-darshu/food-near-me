import type { Shop } from "@food-near-me/shared";

export const staticShops: Shop[] = [
  {
    id: "hotel-sunrise",
    name: "Hotel Sunrise",
    category: "hotel",
    rating: 4.4,
    description: "Family-friendly dining with regional specialties.",
    imageUrl: "https://placehold.co/600x400/orange/fff?text=Hotel+Sunrise",
    contact: {
      phoneNumber: "+911800100010",
      whatsappNumber: "+911800100010"
    },
    location: {
      address: "MG Road, Bengaluru",
      latitude: 12.9758,
      longitude: 77.6052
    },
    tags: ["family", "veg"]
  },
  {
    id: "cake-world",
    name: "Cake World Bakery",
    category: "bakery",
    rating: 4.9,
    description: "Artisan cakes, pastries, and fresh breads.",
    imageUrl: "https://placehold.co/600x400/pink/fff?text=Cake+World",
    contact: {
      phoneNumber: "+919980123456",
      whatsappNumber: "+919980123456"
    },
    location: {
      address: "Indiranagar, Bengaluru",
      latitude: 12.9711,
      longitude: 77.6413
    },
    tags: ["desserts", "fresh"]
  },
  {
    id: "gokart-foods",
    name: "Gokart Foods",
    category: "street-food",
    rating: 3.8,
    description: "Quick bites and fusion street food favourites.",
    imageUrl: "https://placehold.co/600x400/ff4e00/fff?text=Gokart+Foods",
    contact: {
      phoneNumber: "+918880112233",
      whatsappNumber: "+918880112233"
    },
    location: {
      address: "Mall Road, Bengaluru",
      latitude: 12.9694,
      longitude: 77.5913
    },
    tags: ["fusion", "quick"]
  }
];
