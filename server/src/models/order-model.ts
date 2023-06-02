import { InferSchemaType, model, Schema, SchemaTypes } from "mongoose";

const addressSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String, default: false },
  zipCode: { type: String, default: false },
  city: { type: String, default: false },
  phoneNumber: { type: String, default: false },
});

const orderItemSchema = new Schema({
  product: { type: SchemaTypes.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true },
});

const orderSchema = new Schema({
  userId: { type: SchemaTypes.ObjectId, ref: "User", required: true },
  orderItems: { type: [orderItemSchema], required: true },
  deliveryAddress: { type: addressSchema, required: true },
  isShipped: { type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now },
});

export type Order = InferSchemaType<typeof orderSchema>;

export const OrderModel = model("Order", orderSchema);
