import { Router } from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  loginUser,
  updateUser,
} from "../controllers/user-controller";

export const userRouter = Router();

userRouter.post("/api/users", createUser);
userRouter.post("/api/users/login", loginUser);
userRouter.get("/api/users", getAllUsers);
userRouter.get("/api/users/:id", getUserById);
userRouter.put("/api/users/:id", updateUser);

export default userRouter;
