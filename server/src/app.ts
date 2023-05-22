import express from "express";
import "express-async-errors";
import { cookieSessionMiddleware } from "./cookieSession";
import { errorHandler } from "./errorHandler";
import userRouter from "./routes/user-routes";

export const app = express();

app.use(express.json());

app.use(cookieSessionMiddleware);

app.use(userRouter);

app.use(errorHandler);
