import dotenv from "dotenv";
import express from "express";

const app = express();
const PORT = 3000;
dotenv.config();

app.use(express.json());

async function main() {
  //   if (!process.env.MONGO_URI) {
  //     throw new Error("MONGO_URL environment variable is not set.");
  //   }

  //   await mongoose.connect(process.env.MONGO_URI);
  //   console.log("Connected to Database");

  app.listen(PORT, () => {
    console.log("Server is running: http://localhost:3000");
  });
}

main().catch(console.error);
