import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "mbcosmetics",
    });

    console.log("✅ MongoDB Connected Successfully");
    console.log("📦 DB:", mongoose.connection.name);

  } catch (error) {
    console.log("❌ MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};

export default dbConnection;   // ✅ THIS WAS MISSING