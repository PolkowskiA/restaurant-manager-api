import mongoose from "mongoose";
import config from "./app.env";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.MONGO_URI);
    console.log("MongoDB connected", conn.version);
  } catch (err: any) {
    console.error(err.message);
    process.exit(1);
  }
};
