import "dotenv/config";
import { connectDB } from "./db";
import { startServer } from "./server";

connectDB();
startServer();
