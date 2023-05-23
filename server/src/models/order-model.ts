import { InferSchemaType, model, Schema, SchemaTypes } from "mongoose";
import { addressSchema } from "./address-schema";
import { orderItemSchema } from "./orderItem-schema";

const orderSchema = new Schema({
  // userid?
  userId: { type: SchemaTypes.ObjectId, ref: "User", required: true },
  orderItems: { type: [orderItemSchema], required: true },
  deliveryAddress: { type: addressSchema, required: true },
  isShipped: { type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now },
});

export type Order = InferSchemaType<typeof orderSchema>;

export const OrderModel = model<Order>("Order", orderSchema);
