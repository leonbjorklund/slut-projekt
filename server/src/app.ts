import cors from "cors";
import express from "express";
import { errorHandler } from "./errorHandler";
import userRouter from "./routes/user-routes";

export const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use(userRouter);

app.use(errorHandler);
