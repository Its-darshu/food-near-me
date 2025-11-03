import "dotenv/config";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import shopsRouter from "./routes/shops";
import { isFirebaseConfigured } from "./config/firebase";

const app = express();
const port = Number(process.env.PORT) || 4000;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/shops", shopsRouter);

app.listen(port, () => {
  // Lightweight log for server start to confirm port binding.
  console.log(`Backend API listening on http://localhost:${port}`);
  if (!isFirebaseConfigured()) {
    console.warn("[firebase] Firestore is not configured. Serving static sample shops.");
  }
});
