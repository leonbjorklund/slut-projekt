import { InferSchemaType, model, Schema } from "mongoose";

const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  height: { type: Number, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  categories: { type: [String], enum: ["glass", "ceramic"], required: true },
  inStock: { type: Number, required: true },
});

export type Product = InferSchemaType<typeof productSchema>;

export const ProductModel = model("Product", productSchema);
