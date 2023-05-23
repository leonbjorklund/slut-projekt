import { Router } from "express";
import {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/product-controller";

const productRouter = Router();

productRouter.post("/api/products", addProduct);
productRouter.get("/api/products", getAllProducts);
productRouter.get("/api/products/:id", getProductById);
productRouter.put("/api/products/:id", updateProduct);
productRouter.delete("/api/products/:id", deleteProduct);

export default productRouter;
