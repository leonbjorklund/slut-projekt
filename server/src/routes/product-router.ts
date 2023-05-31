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
  validateBody,
} from "../validation/product-client-validation";

const productRouter = Router();

productRouter.post(
  "/api/products",
  validateBody(productCreateSchema),
  addProduct
);
productRouter.get("/api/products", getAllProducts);
productRouter.get("/api/products/:id", getProductById);
// productRouter.put("/api/products/:id", validateBody(productEditSchema), updateProduct);
productRouter.put("/api/products/:id", updateProduct);
productRouter.delete("/api/products/:id", deleteProduct);

export default productRouter;
