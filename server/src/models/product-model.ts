import { InferSchemaType, model, Schema } from "mongoose";

export const cats = ["glass", "ceramic"] as const;

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    height: { type: Number, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    categories: { type: [String], enum: cats, required: true },
    inStock: { type: Number, required: true },
  },
  { toJSON: { virtuals: true } }
);

productSchema.virtual("imageUrl").get(function () {
  return `/api/file/${this.image}`;
});

export type Product = InferSchemaType<typeof productSchema>;

export const ProductModel = model("Product", productSchema);
