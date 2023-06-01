import express from "express";
import "express-async-errors";
import { cookieSessionMiddleware } from "./cookieSession";
import { errorHandler } from "./errorHandler";
import orderRouter from "./routes/order-routes";
import productRouter from "./routes/product-router";
import userRouter from "./routes/user-routes";
import fileRouter from "./routes/file-router";

export const app = express();

app.use(express.json());

app.use(cookieSessionMiddleware);

app.use(userRouter);
app.use(productRouter);
app.use(orderRouter);
app.use(fileRouter);

app.use(errorHandler);
