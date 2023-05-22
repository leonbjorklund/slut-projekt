import cookieSession from "cookie-session";
import express from "express";
import { errorHandler } from "./errorHandler";
import userRouter from "./routes/user-routes";

export const app = express();

app.use(express.json());

app.use(
  cookieSession({
    name: "session",
    secret: "asdkhl847sglkj374hj39sglk5j7",
    maxAge: 1 * 60 * 60 * 1000, // 1 hour
    secure: false,
    httpOnly: true,
  })
);

app.use(userRouter);

app.use(errorHandler);
