import { Router } from "express";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../controllers/product-controller";

import {
  productCreateSchema,
  productEditSchema,
  validateBody,
} from "../validation/product-client-validation";

import { isAdmin } from "../middlewares/isAdmin";

const productRouter = Router();

productRouter.post(
  "/api/products",
  isAdmin,
  validateBody(productCreateSchema),
  addProduct
);
productRouter.get("/api/products", getAllProducts);
productRouter.get("/api/products/:id", getProductById);
productRouter.put(
  "/api/products/:id",
  isAdmin,
  validateBody(productEditSchema),
  updateProduct
);
productRouter.delete("/api/products/:id", isAdmin, deleteProduct);

export default productRouter;
