import { cert, getApp, getApps, initializeApp } from "firebase-admin/app";
import type { Firestore } from "firebase-admin/firestore";
import { getFirestore } from "firebase-admin/firestore";
import type { Storage } from "firebase-admin/storage";
import { getStorage } from "firebase-admin/storage";

const REQUIRED_ENV_VARS = [
  "FIREBASE_PROJECT_ID",
  "FIREBASE_CLIENT_EMAIL",
  "FIREBASE_PRIVATE_KEY"
] as const;

let firestoreClient: Firestore | null = null;
let storageClient: Storage | null = null;
let hasWarnedMissingCredentials = false;
let hasWarnedMissingStorageBucket = false;
let hasLoggedInitializationError = false;
let hasLoggedStorageInitializationError = false;

export const isFirebaseConfigured = (): boolean =>
  REQUIRED_ENV_VARS.every((key) => Boolean(process.env[key]));

export const getShopsCollectionName = (): string =>
  process.env.FIREBASE_SHOPS_COLLECTION ?? "shops";

export const getStorageBucketName = (): string | undefined =>
  process.env.FIREBASE_STORAGE_BUCKET;

export const getFirestoreClient = (): Firestore | null => {
  if (firestoreClient) {
    return firestoreClient;
  }

  if (!isFirebaseConfigured()) {
    if (!hasWarnedMissingCredentials) {
      console.warn("[firebase] Missing credentials; falling back to static shop data.");
      hasWarnedMissingCredentials = true;
    }
    return null;
  }

  const projectId = process.env.FIREBASE_PROJECT_ID as string;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL as string;
  const privateKeyRaw = process.env.FIREBASE_PRIVATE_KEY as string;
  const privateKey = privateKeyRaw.replace(/\\n/g, "\n");
  const databaseURL = process.env.FIREBASE_DATABASE_URL;
  const storageBucket = getStorageBucketName();

  try {
    const app = getApps().length
      ? getApp()
      : initializeApp({
          credential: cert({
            projectId,
            clientEmail,
            privateKey
          }),
          databaseURL,
          storageBucket
        });

    firestoreClient = getFirestore(app);
    return firestoreClient;
  } catch (error) {
    if (!hasLoggedInitializationError) {
      console.error("[firebase] Failed to initialize Firebase Admin SDK", error);
      hasLoggedInitializationError = true;
    }
    return null;
  }
};

export const getStorageClient = (): Storage | null => {
  if (storageClient) {
    return storageClient;
  }

  const firestore = getFirestoreClient();
  if (!firestore) {
    return null;
  }

  const bucketName = getStorageBucketName();
  if (!bucketName && !hasWarnedMissingStorageBucket) {
    console.warn("[firebase] FIREBASE_STORAGE_BUCKET is not set; image uploads are disabled.");
    hasWarnedMissingStorageBucket = true;
    return null;
  }

  try {
    storageClient = getStorage();
    return storageClient;
  } catch (error) {
    if (!hasLoggedStorageInitializationError) {
      console.error("[firebase] Failed to initialize Firebase Storage", error);
      hasLoggedStorageInitializationError = true;
    }
    return null;
  }
};
