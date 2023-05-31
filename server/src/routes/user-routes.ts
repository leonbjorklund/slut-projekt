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
import { isAdmin } from "../middlewares/isAdmin";
import { validateCreateUser } from "../validation/user-client-validation";

export const userRouter = Router();

userRouter.post("/api/users/create", validateCreateUser, createUser);
userRouter.post("/api/users/login", loginUser);
userRouter.get("/api/users/auth", checkAuth);
userRouter.post("/api/users/signout", signoutUser);
userRouter.put("/api/users/:id", updateUserAdmin);
userRouter.get("/api/users", isAdmin, getAllUsers);
userRouter.get("/api/users/:id", isAdmin, getUserById);

export default userRouter;
