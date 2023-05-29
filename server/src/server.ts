import dotenv from "dotenv";
import mongoose from "mongoose";
import { app } from "./app";

const PORT = 3000;
dotenv.config();

async function main() {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI environment variable is not set.");
  }

  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to Database");

  app.listen(PORT, () => {
    console.log(`Server is running: http://localhost:${PORT}`);
  });
}

main().catch(console.error);
