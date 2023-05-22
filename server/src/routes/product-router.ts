import { Router } from "express";
import {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../controllers/product-controller";
import { deleteModel } from "mongoose";

const productRouter = Router();

productRouter.post("/api/products", addProduct);
productRouter.get("/api/products", getAllProducts);
productRouter.get("/api/products/:id", getProductById);
productRouter.put("/api/products/:id", updateProduct);
productRouter.put("/api/products/:id", deleteModel);

export default productRouter;
