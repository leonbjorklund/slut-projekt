import { Router } from "express";
import { validateCreateUser } from "../controllers/user-client-validation";
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

userRouter.post("/api/users/create", validateCreateUser, createUser);
userRouter.post("/api/users/login", loginUser);
userRouter.get("/api/users/auth", checkAuth);
userRouter.post("/api/users/signout", signoutUser);
userRouter.put("/api/users/:id", updateUserAdmin);
userRouter.get("/api/users", getAllUsers);
userRouter.get("/api/users/:id", getUserById);

export default userRouter;
