import { InferSchemaType, model, Schema } from "mongoose";
import { addressSchema } from "./address-schema";
import { orderItemSchema } from "./orderItem-schema";

const orderSchema = new Schema({
  // Id
  orderItems: { type: [orderItemSchema], required: true },
  deliveryAddress: { type: addressSchema, required: true },
  isShipped: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export type Order = InferSchemaType<typeof orderSchema>;

export const OrderModel = model<Order>("Order", orderSchema);
