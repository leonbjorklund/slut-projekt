import { Router } from "express";
import {
  checkAuth,
  createUser,
  getAllUsers,
  getUserById,
  loginUser,
  signoutUser,
  updateUserAdmin,
} from "../controllers/user-controller";

export const userRouter = Router();

userRouter.post("/api/users", createUser);
userRouter.post("/api/users/login", loginUser);
userRouter.post("/api/users/signout", signoutUser);
userRouter.put("/api/users/:id", updateUserAdmin);
userRouter.get("/api/users", getAllUsers);
userRouter.get("/api/users/:id", getUserById);
userRouter.get("/api/users/auth", checkAuth);

export default userRouter;
