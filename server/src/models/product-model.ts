import { InferSchemaType, Schema, Types, model } from "mongoose";

const productSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  height: { type: Number, required: true },
  image: { type: Types.ObjectId }, // Reference to file identifiers
  price: { type: Number, required: true },
  categories: { type: [String], enum: ["glass", "ceramic"], required: true },
  inStock: { type: Number, required: true },
});

export type Product = InferSchemaType<typeof productSchema>;

export const ProductModel = model("Product", productSchema);
