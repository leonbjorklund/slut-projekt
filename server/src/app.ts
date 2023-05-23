import express from "express";
import "express-async-errors";
import { cookieSessionMiddleware } from "./cookieSession";
import { errorHandler } from "./errorHandler";
import userRouter from "./routes/user-routes";
import productRouter from "./routes/product-router";

export const app = express();

app.use(express.json());

app.use(cookieSessionMiddleware);

app.use(userRouter);
app.use(productRouter);

app.use(errorHandler);
