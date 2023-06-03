import { Router } from "express";
import {
  deleteFileById,
  getFileById,
  uploadFile,
} from "../controllers/file-controller";
import { isAdmin } from "../middlewares/isAdmin";

const fileRouter = Router();

fileRouter.get("/api/file/:id", getFileById);
fileRouter.post("/api/file", isAdmin, uploadFile);
fileRouter.delete("/api/file/:id", isAdmin, deleteFileById);

export default fileRouter;
