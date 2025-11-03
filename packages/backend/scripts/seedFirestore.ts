import "dotenv/config";
import { getFirestoreClient, getShopsCollectionName } from "../src/config/firebase";
import { staticShops } from "../src/data/shops";

const main = async () => {
  const firestore = getFirestoreClient();
  if (!firestore) {
    console.error("Firebase is not configured. Please set the required environment variables before seeding.");
    process.exit(1);
  }

  const collectionName = getShopsCollectionName();
  const collection = firestore.collection(collectionName);

  await Promise.all(
    staticShops.map(async (shop) => {
      await collection.doc(shop.id).set(shop, { merge: true });
    })
  );

  console.log(`Seeded ${staticShops.length} shops into Firestore collection "${collectionName}".`);
};

main().catch((error) => {
  console.error("Failed to seed Firestore", error);
  process.exit(1);
});
