import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import { errorHandler, notFound } from "./middleware/error.js";
import authRoute from "./routes/auth.route.js";
import productRoute from "./routes/product.route.js";
import bannerRoute from "./routes/banner.route.js";
import userRoute from "./routes/user.route.js";
import orderRoute from "./routes/order.route.js";
import paymentRoute from "./routes/payment.route.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Render proxy ke peeche cookies/secure ke liye zaroori
app.set("trust proxy", 1);

// cors
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "https://mbcosmetics-git-integration-bhavyasharma2712s-projects.vercel.app",
  "https://mb-cosmetics.vercel.app",
  /^https:\/\/mb-cosmetics.*\.vercel\.app$/, // Vercel preview URLs
];

const corsOptions = {
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions)); // preflight requests

// json body
app.use(express.json());

// cookie-parser
app.use(cookieParser());

// Serve uploaded images statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// health check (notFound se PEHLE hona chahiye)
app.get("/", (req, res) => {
  res.send("API is running");
});

// routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/products", productRoute);
app.use("/api/v1/banners", bannerRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/orders", orderRoute);
app.use("/api/v1/payment", paymentRoute);

// error middleware (hamesha sabse last)
app.use(notFound);
app.use(errorHandler);

export default app;