import { randomUUID } from "crypto";
import type { Express } from "express";
import { getStorageBucketName, getStorageClient } from "../config/firebase";

export interface UploadResult {
  url: string;
  path: string;
}

export const deleteFileIfExists = async (path: string): Promise<void> => {
  const storage = getStorageClient();
  const bucketName = getStorageBucketName();

  if (!storage || !bucketName) {
    return;
  }

  const file = storage.bucket(bucketName).file(path);
  const [exists] = await file.exists();
  if (exists) {
    await file.delete();
  }
};

export const uploadShopImage = async (
  file: Express.Multer.File,
  shopId: string
): Promise<UploadResult> => {
  const storage = getStorageClient();
  const bucketName = getStorageBucketName();

  if (!storage || !bucketName) {
    throw new Error("Firebase Storage is not configured");
  }

  const bucket = storage.bucket(bucketName);
  const extension = file.originalname.split(".").pop();
  const filename = `${Date.now()}-${randomUUID()}${extension ? `.${extension}` : ""}`;
  const filePath = `shops/${shopId}/${filename}`;

  const downloadToken = randomUUID();

  const uploadedFile = bucket.file(filePath);
  await uploadedFile.save(file.buffer, {
    contentType: file.mimetype,
    metadata: {
      firebaseStorageDownloadTokens: downloadToken
    }
  });

  const encodedPath = encodeURIComponent(filePath);
  const url = `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${encodedPath}?alt=media&token=${downloadToken}`;

  return { url, path: filePath };
};